const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question.controller');
const authenticate = require('../middleware/authenticate.js')

router.post('/', questionController.createQuestion);
router.get('/', questionController.getAllQuestions);
router.get('/:id', authenticate, questionController.getQuestionById);
router.put('/:id', authenticate, questionController.updateQuestionById);
router.delete('/:id', authenticate, questionController.deleteQuestionById);

module.exports = router;