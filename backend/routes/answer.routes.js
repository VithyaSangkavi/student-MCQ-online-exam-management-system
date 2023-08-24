const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answer.controller.js');
const authenticate = require('../middleware/authenticate.js')

router.post('/', authenticate, answerController.createAnswer);
router.get('/', authenticate, answerController.getAllAnswers);
router.get('/:id', authenticate, answerController.getAnswerById);
router.put('/:id', authenticate, answerController.updateAnswerById);
router.delete('/:id', authenticate, answerController.deleteAnswerById);
router.get('/question/:questionID', authenticate, answerController.getAnswerByQuestionID);

module.exports = router;
