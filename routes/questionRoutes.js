const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController'); // Import question controller

// Get all questions for a test (GET to /api/questions/:testId)
router.get('/:testId', questionController.getQuestionsByTest);

// Get a single question (GET to /api/questions/question/:questionId) - Add this later
router.get('/question/:questionId', questionController.getQuestionById);

// Create a new question (POST to /api/questions) - Add this later
router.post('/', questionController.createQuestion);

module.exports = router;
