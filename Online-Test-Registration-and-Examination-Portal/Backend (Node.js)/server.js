const express = require('express');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const app = express();

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'exam_portal'
});

// Registration endpoint
app.post('/api/register', async (req, res) => {
  const { fullName, email, phone, collegeName, collegeId } = req.body;
  const password = generateRandomPassword();
  
  try {
    // Save user to database
    await db.query('INSERT INTO users SET ?', {
      fullName,
      email,
      phone,
      collegeName,
      collegeId,
      password
    });

    // Send email with password
    await sendPasswordEmail(email, password);
    
    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Test submission endpoint
app.post('/api/submit-test', async (req, res) => {
  const { userId, testId, answers } = req.body;
  
  try {
    // Calculate results
    const results = calculateResults(answers);
    
    // Save to database
    await db.query('INSERT INTO results SET ?', {
      userId,
      testId,
      score: results.score,
      percentage: results.percentage
    });

    // Send confirmation email
    await sendTestSubmissionEmail(userId);
    
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Submission failed' });
  }
});