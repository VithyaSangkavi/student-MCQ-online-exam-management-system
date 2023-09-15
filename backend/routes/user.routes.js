const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller.js');
const authenticate = require('../middleware/authenticate.js')

router.post('/login', userController.loginUser)

router.get('/userinfo', authenticate, (req, res) => {
  const userInfo = req.user.userID;
  res.json(userInfo);
});

router.post('/', authenticate, userController.createUser);
router.get('/', authenticate, userController.getAllUsers);
router.get('/:id', authenticate, userController.getUserById);
router.put('/:id', authenticate, userController.updateUserById);
router.delete('/:id', authenticate, userController.deleteUserById);
router.post('/logout', userController.logoutUser);

module.exports = router;
