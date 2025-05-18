const express = require('express');
const { getTests, submitTest } = require('../controllers/testController');
const { auth } = require('../middleware/auth'); // Import auth middleware

const router = express.Router();

router.get('/course/:courseId', getTests);
router.post('/submit', submitTest);

// New routes for dashboard
router.get('/available', auth, async (req, res) => {
    // TODO: Implement logic to fetch available exams for the logged-in user
    // Access user ID from req.user.id due to auth middleware
    console.log('Fetching available exams for user:', req.user.id);
    try {
        // Example: Query database for available exams
        // const [availableExams] = await db.query('SELECT * FROM exams WHERE ...');
        // res.json(availableExams);
        res.json([]); // Placeholder response
    } catch (error) {
        console.error('Error fetching available exams:', error);
        res.status(500).json({ message: 'Error fetching available exams' });
    }
});

router.get('/results', auth, async (req, res) => {
    // TODO: Implement logic to fetch exam results for the logged-in user
    // Access user ID from req.user.id due to auth middleware
     console.log('Fetching exam results for user:', req.user.id);
    try {
        // Example: Query database for user's exam results
        // const [examResults] = await db.query('SELECT * FROM results WHERE user_id = ?', [req.user.id]);
        // res.json(examResults);
        res.json([]); // Placeholder response
    } catch (error) {
         console.error('Error fetching exam results:', error);
        res.status(500).json({ message: 'Error fetching exam results' });
    }
});

module.exports = router;
