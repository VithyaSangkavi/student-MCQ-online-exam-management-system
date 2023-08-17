const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller.js');
const authenticate = require('../middleware/authenticate.js')

router.post('/login', userController.loginUser)

router.post('/', userController.createUser);
router.get('/', authenticate, userController.getAllUsers);
router.get('/:id', authenticate, userController.getUserById);
router.put('/:id', authenticate, userController.updateUserById);
router.delete('/:id', authenticate, userController.deleteUserById);

module.exports = router;
