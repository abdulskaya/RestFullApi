const BlockedUser = require("./blocked_user");
const Conversation = require("./conversation");
const Message = require("./message");
const Participant = require("./participants");
const User = require("./user");

function run(){
    Message.belongsTo(User, { foreignKey: 'user_id' });
    User.hasMany(Message, { foreignKey: 'user_id' });
    
    User.hasMany(BlockedUser, { foreignKey: 'id' });
    BlockedUser.belongsTo(User, { foreignKey: 'user_id' });
    
    User.hasMany(BlockedUser, { foreignKey: 'id' });
    BlockedUser.belongsTo(User, { foreignKey: 'target_user_id' });
    
    Message.belongsTo(Conversation, { foreignKey: 'id' });
    Conversation.hasMany(Message, {foreignKey: 'conversation_id'});
    
    Conversation.belongsToMany(User, { through: Participant, foreignKey: 'conversation_id' });
    User.belongsToMany(Conversation, { through: Participant, foreignKey: 'user_id' });
    
    User.hasMany(BlockedUser, { foreignKey: 'user_id' });
    User.hasMany(BlockedUser, { foreignKey: 'target_user_id' });
    
    Participant.hasMany(Conversation, { foreignKey: "id"});
    Conversation.hasMany(Participant, { foreignKey: "conversation_id"});
}

run()