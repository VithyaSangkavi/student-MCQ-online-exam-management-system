const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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
    type: DataTypes.STRING(255)
  },
  userType: {
    type: DataTypes.STRING
  },
}, {
  tableName: 'user',
  timestamps: false,

  classMethods: {
    async login(email, password) {
      const user = await User.findOne({ where: { userEmail: email } });

      if (!user) {
        throw new Error('User not found');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      // Generate and return a JWT token
      const token = jwt.sign({ id: user.userID, email: user.userEmail }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
      return token;
    }
  }
});

module.exports = User;