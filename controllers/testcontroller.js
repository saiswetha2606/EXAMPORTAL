const db = require('../db');

const getTestsByCourse = (req, res) => {
    const courseId = req.params.courseId;
    const query = 'SELECT * FROM tests WHERE course_id = ?';
    db.query(query, [courseId], (err, results) => {
        if (err) {
            console.error('Error fetching tests:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json(results);
    });
};

const getTestById = (req, res) => {
  const testId = req.params.testId;
  const query = 'SELECT test_id, course_id, test_name, start_time, end_time FROM tests WHERE test_id = ?';
  db.query(query, [testId], (err, results) => {
    if (err) {
      console.error('Error fetching test:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Test not found' });
    }

    res.status(200).json(results[0]);
  });
};

const createTest = (req, res) => {
  const { courseId, testName, startTime, endTime } = req.body;

  // 1. Input validation
  if (!courseId || !testName || !startTime || !endTime) {
    return res.status(400).json({ error: 'All test fields are required' });
  }

  // 2. Insert the new test into the database
  const query = 'INSERT INTO tests (course_id, test_name, start_time, end_time) VALUES (?, ?, ?, ?)';
  db.query(query, [courseId, testName, startTime, endTime], (err, result) => {
    if (err) {
      console.error('Error creating test:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(201).json({ message: 'Test created successfully', testId: result.insertId });
  });
};

module.exports = {
    getTestsByCourse,
    getTestById,
    createTest
};
