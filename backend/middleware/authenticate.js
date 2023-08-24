const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user.js');

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  try {
    const tokenWithoutBearer = token.replace('Bearer ', ''); // Remove "Bearer " prefix
    const decoded = await jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET_KEY);
    const user = await User.findByPk(decoded.id); 

    if (!user) {
      return res.status(401).json({ message: 'Invalid user' });
    }

    req.user = {
      id: user.id,
      userType: user.userType,
    };

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticate;
