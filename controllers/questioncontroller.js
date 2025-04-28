const db = require('../db');

const getQuestionsByTest = (req, res) => {
    const testId = req.params.testId;
    const query = 'SELECT * FROM questions WHERE test_id = ?';
    db.query(query, [testId], (err, results) => {
        if (err) {
            console.error('Error fetching questions:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json(results);
    });
};

const getQuestionById = (req, res) => {
  const questionId = req.params.questionId;
  const query = 'SELECT question_id, test_id, question_text, question_type, correct_answer FROM questions WHERE question_id = ?';
  db.query(query, [questionId], (err, results) => {
    if (err) {
      console.error('Error fetching question:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.status(200).json(results[0]);
  });
};

const createQuestion = (req, res) => {
  const { testId, questionText, questionType, correctAnswer } = req.body;

  // 1. Input validation
    if (!testId || !questionText || !questionType || !correctAnswer) {
        return res.status(400).json({ error: 'All question fields are required' });
    }

    if (questionType !== 'MCQ' && questionType !== 'NAT') {
        return res.status(400).json({ error: 'Invalid question type. Must be MCQ or NAT.' });
    }

  // 2. Insert the new question into the database
  const query = 'INSERT INTO questions (test_id, question_text, question_type, correct_answer) VALUES (?, ?, ?, ?)';
  db.query(query, [testId, questionText, questionType, correctAnswer], (err, result) => {
    if (err) {
      console.error('Error creating question:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(201).json({ message: 'Question created successfully', questionId: result.insertId });
  });
};

module.exports = {
    getQuestionsByTest,
    getQuestionById,
    createQuestion
};
