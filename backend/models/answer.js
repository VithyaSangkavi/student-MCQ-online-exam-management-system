const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');
const Question = require('./question');

const Answer = sequelize.define('answer', {
  answerID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  answerValue: {
    type: DataTypes.STRING,
  },
  correctAnswer: {
    type: DataTypes.TINYINT,
  },
  questionID: {
    type: DataTypes.INTEGER,
    references: {
      model: Question,
      key: 'questionID',
    },
  },
},{
    tableName: 'answer',
    timestamps: false
});

// 1:N - question-answer
Question.hasMany(Answer, {
  foreignKey: 'questionID',
});
Answer.belongsTo(Question, {
  foreignKey: 'questionID', 
});

module.exports = Answer;
