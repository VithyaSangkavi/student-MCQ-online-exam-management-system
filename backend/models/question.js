const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');
const Exam = require('./exam');

const Question = sequelize.define('question', {
  questionID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  questionNo: {
    type: DataTypes.INTEGER,
  },
  questionText: {
    type: DataTypes.TEXT,
  },
  examID: {
    type: DataTypes.INTEGER,
    references: {
      model: Exam,
      key: 'examID',
    },
  },
}, {
  tableName: 'question',
  timestamps: false
});

// 1:N - exam-question
Exam.hasMany(Question, {
  foreignKey: 'examID', 
});
Question.belongsTo(Exam, {
  foreignKey: 'examID', 
});

module.exports = Question;