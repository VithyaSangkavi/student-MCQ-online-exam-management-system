const express = require('express');
const router = express.Router();
const examController = require('../controllers/exam.controller.js');
const authenticate = require('../middleware/authenticate.js')

router.post('/', authenticate, examController.createExam);
router.get('/', authenticate, examController.getAllExams);
router.get('/:id', authenticate, examController.getExamById);
router.put('/:id', authenticate, examController.updateExamById);
router.delete('/:id', authenticate, examController.deleteExamById);

module.exports = router;
