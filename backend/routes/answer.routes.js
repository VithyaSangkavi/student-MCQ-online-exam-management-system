const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answer.controller.js');
const authenticate = require('../middleware/authenticate.js')

router.post('/', answerController.createAnswer);
router.get('/', answerController.getAllAnswers);
router.get('/:id', authenticate, answerController.getAnswerById);
router.put('/:id', authenticate, answerController.updateAnswerById);
router.delete('/:id', authenticate, answerController.deleteAnswerById);
router.get('/question/:questionID', answerController.getAnswerByQuestionID);

module.exports = router;
