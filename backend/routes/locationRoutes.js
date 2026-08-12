const express = require('express');
const router = express.Router();
const { getLocations, addLocation, updateLocation, deleteLocation } = require('../controllers/locationController');
const { verifyToken } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');

// সব রাউটের জন্য verifyToken মিডলওয়্যারটি বাধ্যতামূলক করা হলো
router.use(verifyToken);

// রাউটগুলো
router.get('/', getLocations); // যে কেউ (লগিন থাকা অবস্থায়) লোকেশন দেখতে পারবে
router.post('/', isAdmin, addLocation); // শুধু অ্যাডমিন লোকেশন যুক্ত করতে পারবে
router.put('/:id', isAdmin, updateLocation); // শুধু অ্যাডমিন আপডেট করতে পারবে
router.delete('/:id', isAdmin, deleteLocation); // শুধু অ্যাডমিন ডিলিট করতে পারবে

module.exports = router;