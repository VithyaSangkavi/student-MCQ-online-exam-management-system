const express = require('express');
const router = express.Router();
const examTimeController = require('../controllers/exam_time.controller.js');

router.post('/', examTimeController.createExamTime);
router.get('/', examTimeController.getAllExamTime);
router.get('/:id', examTimeController.getExamTimeById);
router.put('/:id', examTimeController.updateExamTimeById);
router.delete('/:id', examTimeController.deleteExamTimeById);


module.exports = router;
