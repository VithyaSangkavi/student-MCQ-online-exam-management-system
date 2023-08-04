const express = require('express');
const router = express.Router();
const examController = require('../controllers/exam.controller.js');

router.post('/', examController.createExam);
router.get('/', examController.getAllExams);
router.get('/:id', examController.getExamById);
router.put('/:id', examController.updateExamById);
router.delete('/:id', examController.deleteExamById);

module.exports = router;
