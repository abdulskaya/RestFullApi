const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class User extends Model {}
User.init({
  email: {
    allowNull: false,
    type: Sequelize.STRING
  },
  username: {
    allowNull: false,
    type: Sequelize.STRING
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING
  },
  role: {
    allowNull: false,
    type: Sequelize.STRING
  },
  is_active: {
    defaultValue: 1,
    type: Sequelize.BOOLEAN,
  },
  is_deleted: {
    defaultValue: 0,
    type: Sequelize.BOOLEAN,
  },
  password: {
    allowNull: false,
    type: Sequelize.STRING
  }
}, {
  // Other model options 
  sequelize, // pass the connection instance
  modelName: 'User' // choose the model name
});

module.exports = User
