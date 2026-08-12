import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';

const Register = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        student_id: '',
        email: '',
        phone: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await api.post('/auth/register', formData);
            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed!');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-sm p-4" style={{ width: '450px', borderRadius: '10px' }}>
                <h3 className="text-center mb-4 text-primary">Student Registration</h3>
                
                {error && <div className="alert alert-danger py-2">{error}</div>}
                {success && <div className="alert alert-success py-2">{success}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Full Name</label>
                        <input type="text" name="full_name" className="form-control" onChange={handleChange} required />
                    </div>
                    
                    <div className="mb-3">
                        <label className="form-label fw-bold">Student ID</label>
                        <input type="text" name="student_id" className="form-control" onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Email</label>
                        <input type="email" name="email" className="form-control" onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Phone (Optional)</label>
                        <input type="text" name="phone" className="form-control" onChange={handleChange} />
                    </div>
                    
                    <div className="mb-4">
                        <label className="form-label fw-bold">Password</label>
                        <input type="password" name="password" className="form-control" onChange={handleChange} required />
                    </div>
                    
                    <button type="submit" className="btn btn-primary w-100 fw-bold">
                        Register
                    </button>
                </form>
                
                <div className="text-center mt-3">
                    <small>
                        Already have an account? <Link to="/login" className="text-decoration-none">Login here</Link>
                    </small>
                </div>
            </div>
        </div>
    );
};

export default Register;