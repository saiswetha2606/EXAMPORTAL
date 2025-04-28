const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const db = require('./db'); // Import database connection

// Import routes (ADD THESE LINES)
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const testRoutes = require('./routes/testRoutes');
const questionRoutes = require('./routes/questionRoutes');
const resultRoutes = require('./routes/resultRoutes');

// Middleware (These lines should already be in your server.js)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes (ADD THESE LINES)
app.use('/api/users', userRoutes);       //  /api/users/...
app.use('/api/courses', courseRoutes);     //  /api/courses/...
app.use('/api/tests', testRoutes);         //  /api/tests/...
app.use('/api/questions', questionRoutes); //  /api/questions/...
app.use('/api/results', resultRoutes);     //  /api/results/...

// A simple test route (optional - you can keep or remove this)
app.get('/', (req, res) => {
    res.send('Welcome to the Online Test Portal Backend!');
});

// Start the server (This line should already be in your server.js)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
