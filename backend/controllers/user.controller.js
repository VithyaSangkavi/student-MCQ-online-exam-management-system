const User  = require('../models/user.js'); 

const createUser = async (req, res) => {
  try {
    const { userID, userName, userEmail, password, userType} = req.body;
    const newUser = await User.create({ userID, userName, userEmail, password, userType });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createUser
};
