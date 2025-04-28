const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Import user controller

// User registration route (POST to /api/users/register)
router.post('/register', userController.registerUser);

// User login route (POST to /api/users/login)
router.post('/login', userController.loginUser);

// User profile route (GET to /api/users/profile) -  Add this later when you have the controller
router.get('/profile', userController.getUserProfile);

// Change password route (POST to /api/users/change-password) - Add this later
router.post('/change-password', userController.changePassword);

module.exports = router;
