const express = require('express');
const router = express.Router();
const { getEmergencyTypes, addEmergencyType, updateEmergencyType, deleteEmergencyType } = require('../controllers/emergencyTypeController');
const { verifyToken } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');

// সব রাউটের জন্য টোকেন ভেরিফিকেশন
router.use(verifyToken);

router.get('/', getEmergencyTypes); // সবাই দেখতে পারবে
router.post('/', isAdmin, addEmergencyType); // শুধু অ্যাডমিন তৈরি করতে পারবে
router.put('/:id', isAdmin, updateEmergencyType); // শুধু অ্যাডমিন আপডেট করতে পারবে
router.delete('/:id', isAdmin, deleteEmergencyType); // শুধু অ্যাডমিন ডিলিট করতে পারবে

module.exports = router;