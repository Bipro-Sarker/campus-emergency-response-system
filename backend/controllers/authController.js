const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user (Student or Admin)
exports.register = async (req, res) => {
    try {
        const { full_name, student_id, email, phone, password, role } = req.body;

        // ১. চেক করা যে ইমেইল বা স্টুডেন্ট আইডি আগে থেকেই আছে কিনা
        const [existingUser] = await db.execute(
            'SELECT * FROM users WHERE email = ? OR student_id = ?', 
            [email, student_id]
        );
        
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User with this email or student ID already exists!' });
        }

        // ২. পাসওয়ার্ড সিকিউর (Hash) করা
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // ৩. ডাটাবেসে ইউজার সেভ করা
        const userRole = role ? role : 'student'; 
        
        await db.execute(
            'INSERT INTO users (full_name, student_id, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?)',
            [full_name, student_id, email, phone, hashedPassword, userRole]
        );

        res.status(201).json({ message: 'User registered successfully!' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during registration', error: error.message });
    }
};

// Login user (Student or Admin)
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // ১. চেক করা ইউজার ডাটাবেসে আছে কিনা
        const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        
        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found!' });
        }

        const user = users[0];

        // ২. পাসওয়ার্ড সঠিক কিনা তা চেক করা
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials!' });
        }

        // ৩. JWT Token তৈরি করা
        const token = jwt.sign(
            { id: user.id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' } 
        );

        res.status(200).json({
            message: 'Logged in successfully!',
            token,
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during login', error: error.message });
    }
};