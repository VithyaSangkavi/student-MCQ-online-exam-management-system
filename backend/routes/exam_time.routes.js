const express = require('express');
const router = express.Router();
const examTimeController = require('../controllers/exam_time.controller.js');
const authenticate = require('../middleware/authenticate.js')

router.post('/', authenticate, examTimeController.createExamTime);
router.get('/', authenticate, examTimeController.getAllExamTime);
router.get('/:id', authenticate, examTimeController.getExamTimeById);
router.put('/:id', authenticate, examTimeController.updateExamTimeById);
router.delete('/:id', authenticate, examTimeController.deleteExamTimeById);


module.exports = router;
