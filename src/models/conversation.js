const { Sequelize, DataTypes } = require('sequelize');

const Conversation = sequelize.define('Conversation', {
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