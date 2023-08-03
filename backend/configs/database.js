const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('exam_management', 'root', 'Vithya24', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
