const db = require('../db'); // Import the database connection
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For creating JSON Web Tokens
const { v4: uuidv4 } = require('uuid');  // For generating unique IDs, e.g., for filenames
const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY; // Use a secret key from your .env file

const registerUser = async (req, res) => {
    // 1. Get user data from the request body
    const { full_name, email, phone_number, college_name, college_id_number } = req.body;
    const password = uuidv4(); // Generate a random password

    // 2. Input validation
    if (!full_name || !email || !phone_number || !college_name || !college_id_number) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // 3. Check if user with email already exists
    const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkUserQuery, [email], async (err, results) => {
        if (err) {
            console.error('Error checking for existing user:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length > 0) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        // 4. Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 5. Insert the new user into the database
        const insertUserQuery = 'INSERT INTO users (full_name, email, password, phone_number, college_name, college_id_number) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(insertUserQuery, [full_name, email, hashedPassword, phone_number, college_name, college_id_number], (err, result) => {
            if (err) {
                console.error('Error registering user:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            // 6. Send the password to the user's email (using nodemailer)
            // (Implementation of sendEmail function is not shown here)
            sendEmail(email, 'Your Password', `Your password is: ${password}`)
                .then(() => {
                     res.status(201).json({ message: 'User registered successfully. Password sent to email.' });
                })
                .catch(emailError => {
                    console.error("Error sending email", emailError);
                    res.status(201).json({ message: 'User registered successfully.  There was an error sending the email.' });
                });

        });
    });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // 1. Input validation
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    // 2. Check if the user exists
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) {
            console.error('Error during login:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = results[0];
        // 3. Compare the provided password with the hashed password from the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // 4. Generate a JWT token
        const token = jwt.sign({ userId: user.user_id, email: user.email }, secretKey, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token, user });
    });
};

const getUserProfile = (req, res) => {
  // Get user ID from the JWT token
  const userId = req.user.userId;

  // Query the database to get the user's profile data
  const query = 'SELECT user_id, full_name, email, phone_number, college_name, college_id_number, profile_picture_path, college_id_card_path FROM users WHERE user_id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user profile:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userProfile = results[0];
    res.status(200).json(userProfile);
  });
};

const changePassword = async (req, res) => {
    const { email, newPassword } = req.body;

    // 1. Validate input
    if (!email || !newPassword) {
        return res.status(400).json({ error: 'Email and new password are required' });
    }

    // 2. Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // 3. Update the password in the database
    const query = 'UPDATE users SET password = ? WHERE email = ?';
    db.query(query, [hashedNewPassword, email], (err, result) => {
        if (err) {
            console.error('Error changing password:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'Password changed successfully' });
    });
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    changePassword
};
