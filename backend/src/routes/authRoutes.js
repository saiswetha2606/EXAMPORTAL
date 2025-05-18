const express = require('express');
const fileUpload = require('express-fileupload');
const { register, login, getCurrentUser } = require('../controllers/authController');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { auth } = require('../middleware/auth');
const nodemailer = require('nodemailer');
const crypto = require('crypto'); // To generate random password
const path = require('path'); // To handle file paths

const router = express.Router();
// Configure express-fileupload with increased limits
// router.use(fileUpload({
//     limits: { fileSize: 5 * 1024 * 1024 }, // Increase file size limit to 5MB (adjust as needed)
//     // Optionally adjust other limits like total form size if needed
// }));

// Configure Nodemailer (replace with your SMTP details and secure them in environment variables)
const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., 'gmail'
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Public routes
router.post('/register', async (req, res) => {
    try {
        // Get all required fields from the request body, including the user-provided password
        const { name, email, password, phoneNumber, collegeName, collegeIdNumber } = req.body;

        // Check if user already exists
        const [existingUsers] = await db.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Handle file uploads
        if (!req.files || !req.files.profilePicture || !req.files.collegeIdCard) {
            return res.status(400).json({ message: 'Profile picture and college ID card are required' });
        }

        const profilePicture = req.files.profilePicture;
        const collegeIdCard = req.files.collegeIdCard;

        // Generate unique filenames
        const profilePictureFileName = `${Date.now()}_${profilePicture.name}`;
        const collegeIdCardFileName = `${Date.now()}_${collegeIdCard.name}`;

        // Define upload paths
        const uploadPath = path.join(__dirname, '..', '..', 'uploads');
        const profilePicturePath = path.join(uploadPath, profilePictureFileName);
        const collegeIdCardPath = path.join(uploadPath, collegeIdCardFileName);

        // Move files to upload directory
        await profilePicture.mv(profilePicturePath);
        await collegeIdCard.mv(collegeIdCardPath);

        // Hash the user-provided password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new user into database
        const [result] = await db.query(
            'INSERT INTO users (full_name, email, password, phone, college_name, college_id, profile_picture, college_id_card, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [name, email, hashedPassword, phoneNumber, collegeName, collegeIdNumber, profilePicturePath, collegeIdCardPath, 'student'] // Default role to 'student'
        );

        // Respond to frontend
        res.status(201).json({
            message: 'User registered successfully.',
            userId: result.insertId,
        });

    } catch (error) {
        console.error('Registration error:', error);
        // Consider adding cleanup logic here to delete uploaded files if DB insertion fails
        res.status(500).json({ message: error.message || 'Error in registration. Please try again.' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Add logging here
        console.log('Attempting login for email:', email);
        console.log('Password received (should not log plain password in production):', password); // Be cautious with logging passwords in production

        // Check if user exists
        const [users] = await db.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            console.log('Login failed: User not found for email', email); // Log user not found
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const user = users[0];

        console.log('User found. Hashed password from DB:', user.password); // Log hashed password from DB

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);

        console.log('Password comparison result (bcrypt.compare):', isMatch); // Log comparison result

        if (!isMatch) {
            console.log('Login failed: Password mismatch for email', email); // Log password mismatch
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create token
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Exclude password from user object sent to frontend
        const userWithoutPassword = { ...user };
        delete userWithoutPassword.password;

        console.log('Login successful for email:', email); // Log successful login

        res.json({
            message: 'Login successful',
            token,
            user: userWithoutPassword,
        });

    } catch (error) {
        console.error('Login error:', error); // Log any unexpected errors
        res.status(500).json({ message: 'Error in login' });
    }
});

// Protected routes
router.get('/me', auth, getCurrentUser);

module.exports = router;
