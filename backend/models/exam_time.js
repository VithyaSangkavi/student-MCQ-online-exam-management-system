const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');
const user = require('./user');
const exam = require('./exam')

const ExamTime = sequelize.define('exam_time', {
  timeID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  examStartTime: {
    type: DataTypes.DATE
  },
  examEndTime: {
    type: DataTypes.DATE,
  },
  userID: {
    type: DataTypes.INTEGER,
    references: {
      model: user,
      key: 'userID',
    },
  },
  examID: {
    type: DataTypes.INTEGER,
    references: {
      model: exam,
      key: 'examID',
    },
  },
}, {
  tableName: 'exam_time',
  timestamps: false
});

module.exports = ExamTime;
