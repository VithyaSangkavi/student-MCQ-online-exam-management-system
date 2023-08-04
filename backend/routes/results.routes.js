const express = require('express');
const router = express.Router();
const resultController = require('../controllers/results.controller.js');

router.post('/', resultController.createResult);
router.get('/', resultController.getAllResults);
router.get('/:id', resultController.getResultById);
router.put('/:id', resultController.updateResultById);
router.delete('/:id', resultController.deleteResultById);

module.exports = router;
