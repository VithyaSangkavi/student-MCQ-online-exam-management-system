// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');
const user = require('./user');

const Exam = sequelize.define('exam', {
  examID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  examName: {
    type: DataTypes.STRING
  },
  startDateAndTime: {
    type: DataTypes.DATE,
  },
  duration: {
    type: DataTypes.INTEGER
  },
  examStatus: {
    type: DataTypes.STRING
  },
  totalMarks: {
    type: DataTypes.FLOAT
  },
  userID: {
    type: DataTypes.INTEGER,
    references: {
      model: user,
      key: 'userID',
    },
  },
}, {
  tableName: 'exam',
  timestamps: false
});

module.exports = Exam;
