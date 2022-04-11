const { Sequelize, DataTypes } = require('sequelize');

const Participant = sequelize.define('Participant', {
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    }
  },
  conversation_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'conversations',
      key: 'id',
    }
  },
  is_deleted: {
    defaultValue: 0,
    type: Sequelize.BOOLEAN,
  },
}, {
  // Other model options 
  sequelize, // pass the connection instance
  modelName: 'Participant' // choose the model name
});

module.exports = Participant