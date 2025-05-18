const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fileUpload = require('express-fileupload');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const testRoutes = require('./routes/testRoutes');
const db = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(fileUpload({
    limits: { fileSize: 1 * 1024 * 1024 }, // Increase file size limit to 1MB
    createParentPath: true,
    deferAndAttach: true // Defer file attachment until request stream is consumed
}));
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tests', testRoutes);

// Test database connection
async function testConnection() {
    try {
        const connection = await db.getConnection();
        console.log('Connected to the database');
        connection.release();
    } catch (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
}

testConnection();

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
