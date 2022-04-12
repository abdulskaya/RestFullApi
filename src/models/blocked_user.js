const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class BlockedUser extends Model {}
BlockedUser.init({
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    }
  },
  target_user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    }
  },
  is_deleted: {
    defaultValue: 0,
    type: Sequelize.BOOLEAN,
  }
}, {
  // Other model options 
  sequelize, // pass the connection instance
  modelName: 'BlockedUser' // choose the model name
});

module.exports = BlockedUser
