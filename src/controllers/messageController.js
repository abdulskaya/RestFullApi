const User = require('../models/user');
const Conversation = require('../models/conversation');
const Message = require('../models/message');
const Participant = require('../models/participants');
const BlockedUser = require('../models/blocked_user');
const { Op } = require("sequelize");
const connection = require('../config/db');

const messages = async (req, res) => {
    
    const conversations = await Conversation.findAll({
        where: {
            is_deleted: 0
        },
        include: {
            model: User,
            where: {
                id: req.user.id
            }
        }
    });
    
    let active_conversation_ids = [];
    conversations.forEach(element => {
        active_conversation_ids.push(element.id);
    });
    
    const active_conversations = await Conversation.findAll({
        where: {
            id: {
                [Op.in]: active_conversation_ids
            },
            is_deleted: 0
        },
        include: {
            model: User
        },
        include: {
            model: Message
        },
        order: [
            ['updatedAt', 'DESC'],
        ],
    });
    
    // let active_conversation_users = [];
    // active_conversations.forEach(element => {
    //     element.Users.forEach(element => {
    //         if(element.username !== req.user.username){
    //             active_conversation_users.push(element.username)
    //         }
    //     });
    // });
    res.json(active_conversations)
}

const messages_with = async (req, res) => {
    
    // target user
    const target_user = await User.findOne({
        where: {
            username: req.params.username,
            is_deleted: 0
        }
    });
    
    const [results, metadata] = await connection.query(`SELECT messages.conversation_id FROM messages INNER JOIN participants ON messages.conversation_id = participants.conversation_id WHERE (messages.user_id = ${req.user.id} AND participants.user_id = ${target_user.id}) 
    or (messages.user_id = ${target_user.id} AND participants.user_id = ${req.user.id});`);
    
    if (results.length > 0){
        conversation = await Conversation.findAll({
            where: {
                id: results[0].conversation_id
            },
            include:{
                model: Message,
                where: {
                    conversation_id: results[0].conversation_id
                }
            },
        });
        
        // conversation = await Message.findAll({
        //     where: {
        //         conversation_id: results[0].conversation_id
        //     }
        // });
        // console.log(conversation);
        // res.json(conversation.Messages)
        
        res.json(conversation);
        
    } else{
        res.json("Kullanıcı ile aranızda bir konuşma yok.")
    }
}

const send_message = async (req, res) => {
    
    if(req.body.text == null){
        res.status(400).send("Mesaj içeriği gereklidir.");
    }
    
    // target user
    const target_user = await User.findOne({
        where: {
            username: req.params.username,
            is_deleted: 0
        }
    });
    
    if (target_user == null)  res.status(404).send("Kullanıcı bulunamadı");
    else {
        
        const is_blocked = await BlockedUser.findOne({
            where: {
                [Op.or]:
                [
                    {
                        user_id: req.user.id ,
                        target_user_id: target_user.id 
                    },
                    {
                        user_id: target_user.id,
                        target_user_id: req.user.id
                    }
                ]
            }
        });
        
        if (is_blocked){
            res.status(403).send("Bu kullanıcıyı engellediniz veya bu kullanıcı tarafından engellendiniz.");
        } else{
            
            const [results, metadata] = await connection.query(`SELECT messages.conversation_id FROM messages INNER JOIN participants ON messages.conversation_id = participants.conversation_id WHERE (messages.user_id = ${req.user.id} AND participants.user_id = ${target_user.id}) 
            or (messages.user_id = ${target_user.id} AND participants.user_id = ${req.user.id});`);
            
            let conversation;
            
            if (results.length > 0){
                conversation = await Conversation.findOne({
                    where: {
                        id: results[0].conversation_id
                    }
                });
                
            } else{
                
                // if isn't there, create new conversation
                conversation = await Conversation.create({});
                
                // sender user (participant)
                const participant1 = await Participant.create({
                    "user_id": req.user.id,
                    "conversation_id": conversation.id
                });
                
                // target participant
                const participant2 = await Participant.create({
                    "user_id": target_user.id,
                    "conversation_id": conversation.id
                });
            }
            
            // set updated to conversation
            conversation.update({
                updatedAt: new Date()
            });
            
            const message = await Message.create({
                "conversation_id": conversation.id,
                "user_id": req.user.id,
                "text": req.body.text
            });
            
            res.status(201).send({
                is_success: true,
                target_username: target_user.username,
                message: req.body.text,
                time: message.createdAt.toLocaleDateString() + ' - ' + message.createdAt.toLocaleTimeString() 
            });
        }
    }
    
}

const delete_message = async (req, res) => {
    
    const message = await Message.findOne({
        where: {
            id : req.params.message_id
        }
    });
    
    if (message) {
        const conversation_id = message.dataValues.conversation_id;
        
        await Message.destroy({
            where: {
                id : req.params.message_id
            }
        });
        
        const checkMessages = await Message.findOne({
            where: {
                conversation_id : conversation_id
            }
        });
        
        if (!checkMessages) {
            
            Participant.destroy({
                where : {
                    conversation_id : conversation_id
                }
            });
            
            Conversation.destroy({
                where : {
                    id : conversation_id
                }
            });
        }    
        
        res.status(200).send();
        
    } else {
        res.status(404).send("Mesaj bulunamadı");
    }
    
}

module.exports = {
    messages,
    send_message,
    messages_with,
    delete_message
}