const express = require('express');
const router = express.Router();
const resultController = require('../controllers/results.controller.js');
const authenticate = require('../middleware/authenticate.js')

router.post('/', resultController.createResult);
router.get('/', authenticate, resultController.getAllResults);
router.get('/:id', authenticate, resultController.getResultById);
router.put('/:id', authenticate, resultController.updateResultById);
router.delete('/:id', authenticate, resultController.deleteResultById);

module.exports = router;
