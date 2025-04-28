const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController'); // Import result controller

// Get result for a user for a test (GET to /api/results/:userId/:testId)
router.get('/:userId/:testId', resultController.getResult);

// Submit a test (POST to /api/results)
router.post('/', resultController.submitTest);

module.exports = router;
