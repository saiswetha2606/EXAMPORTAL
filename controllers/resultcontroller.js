const db = require('../db');

const getResult = (req, res) => {
    const userId = req.params.userId;
    const testId = req.params.testId;
    const query = 'SELECT * FROM results WHERE user_id = ? AND test_id = ?';
    db.query(query, [userId, testId], (err, results) => {
        if (err) {
            console.error('Error fetching result:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Result not found' });
        }
        res.status(200).json(results[0]);
    });
};

const submitTest = (req, res) => {
    const { userId, testId, score, percentage, rank, submissionTime } = req.body;

    // 1. Input validation
    if (!userId || !testId || !score || !percentage || !rank || !submissionTime) {
        return res.status(400).json({ error: 'All result fields are required' });
    }

    // 2. Insert the result into the database
    const query = 'INSERT INTO results (user_id, test_id, score, percentage, rank, submission_time) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [userId, testId, score, percentage, rank, submissionTime], (err, result) => {
        if (err) {
            console.error('Error submitting test:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'Test submitted successfully', resultId: result.insertId });
    });
};

module.exports = {
    getResult,
    submitTest
};
