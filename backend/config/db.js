const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,      // <-- এই লাইনটি মিসিং ছিল
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false   // <-- Aiven-এর ক্লাউড সিকিউরিটির জন্য এটি বাধ্যতামূলক
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const promisePool = pool.promise();

// Test the database connection
promisePool.getConnection()
    .then(connection => {
        console.log('Successfully connected to the MySQL Database!');
        connection.release();
    })
    .catch(err => {
        console.error('Error connecting to MySQL:', err.message);
    });

module.exports = promisePool;