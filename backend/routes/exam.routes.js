const express = require('express');
const router = express.Router();
const examController = require('../controllers/exam.controller.js');

router.post('/', examController.createExam);

module.exports = router;
