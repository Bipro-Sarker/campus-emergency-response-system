const db = require('../config/db');

// Get all locations (সব লগিন করা ইউজারের জন্য)
exports.getLocations = async (req, res) => {
    try {
        const [locations] = await db.execute('SELECT * FROM locations');
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching locations', error: error.message });
    }
};

// Add a new location (শুধুমাত্র অ্যাডমিনের জন্য)
exports.addLocation = async (req, res) => {
    try {
        const { building_name, floor, area, description } = req.body;
        await db.execute(
            'INSERT INTO locations (building_name, floor, area, description) VALUES (?, ?, ?, ?)',
            [building_name, floor, area, description]
        );
        res.status(201).json({ message: 'Location added successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding location', error: error.message });
    }
};

// Update a location (শুধুমাত্র অ্যাডমিনের জন্য)
exports.updateLocation = async (req, res) => {
    try {
        const { id } = req.params;
        const { building_name, floor, area, description } = req.body;
        await db.execute(
            'UPDATE locations SET building_name=?, floor=?, area=?, description=? WHERE id=?',
            [building_name, floor, area, description, id]
        );
        res.status(200).json({ message: 'Location updated successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating location', error: error.message });
    }
};

// Delete a location (শুধুমাত্র অ্যাডমিনের জন্য)
exports.deleteLocation = async (req, res) => {
    try {
        const { id } = req.params;
        await db.execute('DELETE FROM locations WHERE id=?', [id]);
        res.status(200).json({ message: 'Location deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting location', error: error.message });
    }
};