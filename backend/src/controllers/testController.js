const db = require('../config/db');

exports.getTests = (req, res) => {
  const { courseId } = req.params;
  const query = `SELECT id, test_name FROM tests WHERE course_id = ?`;

  db.query(query, [courseId], (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(results);
  });
};

exports.submitTest = (req, res) => {
  const { userId, testId, answers } = req.body;

  const query = `INSERT INTO results (user_id, test_id, answers) VALUES (?, ?, ?)`;
  const values = [userId, testId, JSON.stringify(answers)];

  db.query(query, values, (err) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ message: 'Test submitted successfully' });
  });
};
