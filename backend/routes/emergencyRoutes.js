const express = require('express');
const router = express.Router();
const { createEmergency, getEmergencies, updateStatus } = require('../controllers/emergencyController');
const { verifyToken } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');

// সব রাউটের জন্য টোকেন ভেরিফিকেশন
router.use(verifyToken);

router.post('/', createEmergency); // স্টুডেন্ট রিকোয়েস্ট তৈরি করবে
router.get('/', getEmergencies); // রিকোয়েস্টগুলো দেখবে
router.put('/:id/status', isAdmin, updateStatus); // অ্যাডমিন স্ট্যাটাস আপডেট করবে

module.exports = router;