const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Message extends Model {}
Message.init({
  conversation_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'conversations',
      key: 'id',
    }
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    }
  },
  text: {
    allowNull: false,
    type: Sequelize.TEXT
  }, 
  is_deleted: {
    defaultValue: 0,
    type: Sequelize.BOOLEAN,
  },
}, {
  // Other model options 
  sequelize, // pass the connection instance
  modelName: 'Message' // choose the model name
});

module.exports = Message

