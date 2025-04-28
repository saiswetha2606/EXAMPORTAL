const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config(); // Load the settings from your .env file

// Create a connection pool (efficient way to manage database connections)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    connectionLimit: 10, // You can adjust this number
});

// Test the database connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Failed to connect to the database:', err);
        return;
    }
    console.log('Successfully connected to the MySQL database!');
    connection.release(); // Give the connection back to the pool
});

// Export the connection pool so other files can use it
module.exports = pool;