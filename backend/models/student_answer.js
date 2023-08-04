const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');
const Question = require('./question');
const Answer = require('./answer');
const Results = require('./results');

const StudentAnswer = sequelize.define('student_answer', {
  studentAnswerID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  questionID: {
    type: DataTypes.INTEGER,
    references: {
      model: Question,
      key: 'questionID',
    },
  },
  answerID: {
    type: DataTypes.INTEGER,
    references: {
      model: Answer,
      key: 'answerID',
    },
  },
  resultsID: {
    type: DataTypes.INTEGER,
    references: {
      model: Results,
      key: 'resultsID',
    },
  },
},{
    tableName: 'student_answer',
    timestamps: false
});

// Relationship with Question
StudentAnswer.belongsTo(Question, {
  foreignKey: 'questionID'
});

// Relationship with Answer
StudentAnswer.belongsTo(Answer, {
  foreignKey: 'answerID'
});

// Relationship with Result
StudentAnswer.belongsTo(Results, {
  foreignKey: 'resultsID'
});

module.exports = StudentAnswer;
