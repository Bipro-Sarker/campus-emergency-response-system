const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController'); // login যুক্ত করা হয়েছে

// POST request for User Registration
router.post('/register', register);

// POST request for User Login (নতুন যোগ করা হলো)
router.post('/login', login);

module.exports = router;