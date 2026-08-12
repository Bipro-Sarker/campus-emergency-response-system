const db = require('../config/db');

// Create a new emergency request (Student)
exports.createEmergency = async (req, res) => {
    try {
        const { emergency_type_id, location_id, priority, description } = req.body;
        const user_id = req.user.id; // Token থেকে ইউজার আইডি নেওয়া হলো

        // একটি ইউনিক ইমার্জেন্সি কোড তৈরি করা (যেমন: CERS-2026-123456)
        const year = new Date().getFullYear();
        const randomNum = Math.floor(100000 + Math.random() * 900000);
        const emergency_code = `CERS-${year}-${randomNum}`;

        await db.execute(
            'INSERT INTO emergency_requests (emergency_code, user_id, emergency_type_id, location_id, priority, description) VALUES (?, ?, ?, ?, ?, ?)',
            [emergency_code, user_id, emergency_type_id, location_id, priority, description]
        );

        res.status(201).json({ message: 'Emergency request submitted successfully!', emergency_code });
    } catch (error) {
        res.status(500).json({ message: 'Error creating request', error: error.message });
    }
};

// Get all emergency requests (Admin sees all, Student sees their own)
exports.getEmergencies = async (req, res) => {
    try {
        // ডাটাবেস থেকে জয়েন করে সুন্দরভাবে ডাটা তুলে আনা
        let query = `
            SELECT e.id, e.emergency_code, e.priority, e.description, e.status, e.created_at, 
                   u.full_name as student_name, u.student_id, u.phone,
                   t.name as emergency_type, 
                   l.building_name, l.floor, l.area
            FROM emergency_requests e
            JOIN users u ON e.user_id = u.id
            JOIN emergency_types t ON e.emergency_type_id = t.id
            JOIN locations l ON e.location_id = l.id
        `;
        let params = [];

        // যদি ইউজার স্টুডেন্ট হয়, তাহলে শুধু তার নিজের রিকোয়েস্টগুলো দেখাবে
        if (req.user.role === 'student') {
            query += ' WHERE e.user_id = ?';
            params.push(req.user.id);
        }

        query += ' ORDER BY e.created_at DESC';

        const [emergencies] = await db.execute(query, params);
        res.status(200).json(emergencies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching emergencies', error: error.message });
    }
};

// Update emergency status (Admin only)
exports.updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, response_note } = req.body;
        const responder_id = req.user.id;
        
        let query = 'UPDATE emergency_requests SET status=?, response_note=?, responder_id=?';
        const params = [status, response_note, responder_id];

        // যদি স্ট্যাটাস Resolved হয়, তবে resolved_at টাইমস্ট্যাম্প আপডেট হবে
        if (status === 'Resolved') {
            query += ', resolved_at=CURRENT_TIMESTAMP';
        }

        query += ' WHERE id=?';
        params.push(id);

        await db.execute(query, params);
        res.status(200).json({ message: 'Emergency status updated successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating status', error: error.message });
    }
};