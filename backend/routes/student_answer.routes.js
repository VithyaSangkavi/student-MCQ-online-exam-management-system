const express = require('express');
const router = express.Router();
const studentAnswerController = require('../controllers/student_answer.controller.js');

router.post('/', studentAnswerController.createStudentAnswer);
router.get('/', studentAnswerController.getAllStudentAnswers);
router.get('/:id', studentAnswerController.getStudentAnswerById);
router.put('/:id', studentAnswerController.updateStudentAnswerById);
router.delete('/:id', studentAnswerController.deleteStudentAnswerById);

module.exports = router;
