const User = require('../models/user');
const { Op } = require("sequelize");
const BlockedUser = require('../models/blocked_user');


const block_user = async (req, res) => {
    // target user
    const target_user = await User.findOne({
        where: {
            username: req.params.username,
            is_deleted: 0
        }
    });
    console.log("req.user.id");
    console.log(req.user.id);
    console.log("target_user.id");
    console.log(target_user.id);
    
    const is_blocked_before = await BlockedUser.findOne({
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
    
    if(is_blocked_before){
        res.json({
            response: false,
            message: "Kullanıcı zaten bloklandı.",
            target: req.params.username
        });
    }else{
        const blocked_user = await BlockedUser.create({
            user_id: req.user.id,
            target_user_id: target_user.id,
        });
        res.json({
            response: true,
            message: "Bloklama işlemi başarılı.",
            target: req.params.username
        });
    }
}

const is_blocked = async (req, res) => {
    // target user
    // NOT: This function don't check to other user block to this user!

    const target_user = await User.findOne({
        where: {
            username: req.params.username,
            is_deleted: 0
        }
    });
    
    const is_blocked_before = await BlockedUser.findOne({
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
    
    if (is_blocked_before){
        res.json({
            response: false,
            message: "Kullanıcı bloklanmadı",
            target: req.params.username
        });
        
    } else{
        res.json({
            response: true,
            message: "Kullanıcı blok durumda",
            target: req.params.username
        });
    }
}

const unblock_user = async (req, res) => {
    // target user
    const target_user = await User.findOne({
        where: {
            username: req.params.username,
            is_deleted: 0
        }
    });
    
    const is_blocked_before = await BlockedUser.findOne({
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
    
    if (is_blocked_before){
        is_blocked_before.destroy();
        res.json({
            response: true,
            message: "Kullanıcı engeli kaldırıldı.",
            target: req.params.username
        });
        
    } else{
        res.json({
            response: false,
            message: "Kullanıcı henüz engellenmemiş",
            target: req.params.username
        });
        
    }
}

const blocked_list = async (req, res) => {
    
    const is_blocked_before = await BlockedUser.findOne({
        where: {
            user_id: req.user.id
        },
        include: {
            model: User,
        }
    });
    
    res.json(is_blocked_before);
}

module.exports = {
    block_user,
    is_blocked,
    unblock_user,
    blocked_list
}