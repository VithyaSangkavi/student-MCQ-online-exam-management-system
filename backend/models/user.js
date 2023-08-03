// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const User = sequelize.define('user', {
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  userName: {
    type: DataTypes.STRING
  },
  userEmail: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  userType: {
    type: DataTypes.STRING
  },
}, {
  tableName: 'user',
  timestamps: false
});

module.exports = User;
