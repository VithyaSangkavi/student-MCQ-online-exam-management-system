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
    type: DataTypes.ENUM('Published', 'Draft'),
    defaultValue: 'Draft',
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

// 1:N - teacher-exam
user.hasMany(Exam, {
  foreignKey: 'userID'
});
Exam.belongsTo(user, {
  foreignKey: 'userID'
});

// M:N - student-exam
user.belongsToMany(Exam, {
  through: 'UserExam', 
  foreignKey: 'userID', 
  timestamps: false
});
Exam.belongsToMany(user, {
  through: 'UserExam', 
  foreignKey: 'examID', 
  timestamps: false,
});

module.exports = Exam;
