const express = require('express');
const router = express.Router();
const studentAnswerController = require('../controllers/student_answer.controller.js');
const authenticate = require('../middleware/authenticate.js')

router.post('/', studentAnswerController.createStudentAnswer);
router.get('/', authenticate, studentAnswerController.getAllStudentAnswers);
router.get('/:id', authenticate, studentAnswerController.getStudentAnswerById);
router.put('/:id', authenticate, studentAnswerController.updateStudentAnswerById);
router.delete('/:id', authenticate, studentAnswerController.deleteStudentAnswerById);

module.exports = router;
