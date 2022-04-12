const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Conversation extends Model {}
Conversation.init({
  is_deleted: {
    defaultValue: 0,
    type: Sequelize.BOOLEAN,
  },
}, {
  // Other model options 
  sequelize, // pass the connection instance
  modelName: 'Conversation' // choose the model name
});

module.exports = Conversation

