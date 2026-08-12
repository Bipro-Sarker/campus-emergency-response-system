const db = require('../config/db');

// Get all emergency types
exports.getEmergencyTypes = async (req, res) => {
    try {
        const [types] = await db.execute('SELECT * FROM emergency_types');
        res.status(200).json(types);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching emergency types', error: error.message });
    }
};

// Add a new emergency type (Admin only)
exports.addEmergencyType = async (req, res) => {
    try {
        const { name, description } = req.body;
        await db.execute(
            'INSERT INTO emergency_types (name, description) VALUES (?, ?)',
            [name, description]
        );
        res.status(201).json({ message: 'Emergency type added successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding emergency type', error: error.message });
    }
};

// Update an emergency type (Admin only)
exports.updateEmergencyType = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        await db.execute(
            'UPDATE emergency_types SET name=?, description=? WHERE id=?',
            [name, description, id]
        );
        res.status(200).json({ message: 'Emergency type updated successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating emergency type', error: error.message });
    }
};

// Delete an emergency type (Admin only)
exports.deleteEmergencyType = async (req, res) => {
    try {
        const { id } = req.params;
        await db.execute('DELETE FROM emergency_types WHERE id=?', [id]);
        res.status(200).json({ message: 'Emergency type deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting emergency type', error: error.message });
    }
};