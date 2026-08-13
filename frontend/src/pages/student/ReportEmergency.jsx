import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const ReportEmergency = () => {
    const [emergencyTypes, setEmergencyTypes] = useState([]);
    const [locations, setLocations] = useState([]);
    const [formData, setFormData] = useState({
        emergency_type_id: '',
        location_id: '',
        priority: 'Medium',
        description: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // পেজ লোড হওয়ার সময় ডাটাবেস থেকে Emergency Types এবং Locations নিয়ে আসা
    useEffect(() => {
        const fetchData = async () => {
            try {
                const typeRes = await api.get('/emergency-types');
                const locRes = await api.get('/locations');
                
                // ডাটাবেস থেকে কী ডাটা আসছে বা কোনো এরর হচ্ছে কি না তা কনসোলে দেখার জন্য লগ
                console.log("Emergency Types Response:", typeRes.data);
                console.log("Locations Response:", locRes.data);

                setEmergencyTypes(typeRes.data);
                setLocations(locRes.data);
            } catch (err) {
                // আসল এররটি কনসোলে দেখানোর জন্য
                console.error("Error fetching data:", err.response?.data || err.message);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const res = await api.post('/emergencies', formData);
            setMessage(`Emergency request submitted successfully! ID: ${res.data.emergency_code}`);
            setTimeout(() => navigate('/student/dashboard'), 3000);
        } catch (err) {
            setError('Failed to submit request. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: '600px', borderRadius: '10px', borderTop: '5px solid red' }}>
                <h3 className="text-center text-danger mb-4">🚨 Report Emergency (SOS)</h3>

                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Emergency Type</label>
                        <select name="emergency_type_id" className="form-select" onChange={handleChange} required>
                            <option value="">-- Select Emergency Type --</option>
                            {emergencyTypes.map(type => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Location</label>
                        <select name="location_id" className="form-select" onChange={handleChange} required>
                            <option value="">-- Select Location --</option>
                            {locations.map(loc => (
                                <option key={loc.id} value={loc.id}>
                                    {loc.building_name} (Floor: {loc.floor}, Area: {loc.area})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Priority Level</label>
                        <select name="priority" className="form-select" onChange={handleChange} value={formData.priority} required>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Critical">Critical</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-bold">Description / Details</label>
                        <textarea 
                            name="description" 
                            className="form-control" 
                            rows="4" 
                            placeholder="Please describe the emergency..."
                            onChange={handleChange} 
                            required
                        ></textarea>
                    </div>

                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-secondary" onClick={() => navigate('/student/dashboard')}>Cancel</button>
                        <button type="submit" className="btn btn-danger fw-bold px-4">SEND SOS</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReportEmergency;