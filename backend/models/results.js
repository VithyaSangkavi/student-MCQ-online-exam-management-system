const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');
const User = require('./user');
const Exam = require('./exam');

const Result = sequelize.define('result', {
  resultsID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  marks: {
    type: DataTypes.FLOAT,
  },
  examStatusStudent: {
    type: DataTypes.ENUM('Completed', 'Not Completed'),
    defaultValue: 'Not Completed',
  },
  examID: {
    type: DataTypes.INTEGER,
    references: {
      model: Exam,
      key: 'examID',
    },
  },
  userID: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'userID',
    },
  },
},{
    tableName: 'results',
    timestamps: false
});

// M:N - student-results
User.belongsToMany(Result, {
  through: 'UserResult', 
  foreignKey: 'userID', 
  timestamps: false,
});
Result.belongsToMany(User, {
  through: 'UserResult', 
  foreignKey: 'resultsID', 
  timestamps: false,
});

// M:N - exam-results
Exam.belongsToMany(Result, {
  through: 'ExamResult', 
  foreignKey: 'examID', 
  timestamps: false,
});
Result.belongsToMany(Exam, {
  through: 'ExamResult', 
  foreignKey: 'resultsID', 
  timestamps: false,
});

module.exports = Result;
