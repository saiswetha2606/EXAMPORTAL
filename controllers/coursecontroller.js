const db = require('../db');

const getAllCourses = (req, res) => {
    const query = 'SELECT * FROM courses';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching courses:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json(results);
    });
};

const getCourseById = (req, res) => {
    const courseId = req.params.courseId;
    const query = 'SELECT * FROM courses WHERE course_id = ?';
    db.query(query, [courseId], (err, results) => {
        if (err) {
            console.error('Error fetching course:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json(results[0]);
    });
};

const addCourse = (req, res) => {
  const { courseName } = req.body;

  // 1. Input validation
  if (!courseName) {
    return res.status(400).json({ error: 'Course name is required' });
  }

  // 2. Insert the new course into the database
  const query = 'INSERT INTO courses (course_name) VALUES (?)';
  db.query(query, [courseName], (err, result) => {
    if (err) {
      console.error('Error adding course:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(201).json({ message: 'Course added successfully', courseId: result.insertId });
  });
};
module.exports = {
    getAllCourses,
    getCourseById,
    addCourse
};
