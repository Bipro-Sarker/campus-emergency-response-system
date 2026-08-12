const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Require database connection
require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // JSON ডাটা পার্স করার জন্য

// Import Routes
const authRoutes = require('./routes/authRoutes');
const locationRoutes = require('./routes/locationRoutes');
const emergencyTypeRoutes = require('./routes/emergencyTypeRoutes');
const emergencyRoutes = require('./routes/emergencyRoutes'); // নতুন যোগ করা হলো

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/emergency-types', emergencyTypeRoutes);
app.use('/api/emergencies', emergencyRoutes); // নতুন যোগ করা হলো

// Basic Test Route
app.get('/', (req, res) => {
    res.send('CERS Backend API is running...');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});