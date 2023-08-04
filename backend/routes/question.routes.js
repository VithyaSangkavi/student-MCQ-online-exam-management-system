const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question.controller');

router.post('/', questionController.createQuestion);
router.get('/', questionController.getAllQuestions);
router.get('/:id', questionController.getQuestionById);
router.put('/:id', questionController.updateQuestionById);
router.delete('/:id', questionController.deleteQuestionById);

module.exports = router;