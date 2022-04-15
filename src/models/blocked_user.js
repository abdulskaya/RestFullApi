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
  }
}, {
  // Other model options 
  sequelize, // pass the connection instance
  modelName: 'BlockedUser', // choose the model name
  tableName: 'blocked_users'
});

module.exports = BlockedUser
