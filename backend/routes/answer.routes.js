const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answer.controller.js');

router.post('/', answerController.createAnswer);
router.get('/', answerController.getAllAnswers);
router.get('/:id', answerController.getAnswerById);
router.put('/:id', answerController.updateAnswerById);
router.delete('/:id', answerController.deleteAnswerById);

module.exports = router;
