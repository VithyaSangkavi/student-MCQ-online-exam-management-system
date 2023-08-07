const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller.js');
const authenticate = require('../middleware/authenticate.js')

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);

router.post('/login', userController.loginUser)

router.get('/protected', authenticate, (req, res) => {
    res.json({ message: 'Protected route', user: req.user });
  });

module.exports = router;
