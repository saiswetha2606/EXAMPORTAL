const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController'); // Import course controller

// Get all courses (GET to /api/courses)
router.get('/', courseController.getAllCourses);

// Get a single course (GET to /api/courses/:courseId)
router.get('/:courseId', courseController.getCourseById);

// Add a new course (POST to /api/courses) -  Add this later if you need to create courses via API
router.post('/', courseController.addCourse);

module.exports = router;
