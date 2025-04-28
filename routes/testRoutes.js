const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController'); // Import test controller

// Get all tests for a course (GET to /api/tests/:courseId)
router.get('/:courseId', testController.getTestsByCourse);

// Get a single test (GET to /api/tests/test/:testId)  - Add this later if needed
router.get('/test/:testId', testController.getTestById);

// Create a new test (POST to /api/tests) - Add this later
router.post('/', testController.createTest);

module.exports = router;
