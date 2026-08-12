import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // আগের কোনো এরর থাকলে ক্লিয়ার করা
        
        try {
            const user = await login(email, password);
            // রোল অনুযায়ী ড্যাশবোর্ডে রিডাইরেক্ট করা
            if (user.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/student/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed! Please check your credentials.');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-sm p-4" style={{ width: '400px', borderRadius: '10px' }}>
                <h3 className="text-center mb-4 text-primary">CERS Login</h3>
                
                {error && <div className="alert alert-danger py-2">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Email address</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            placeholder="Enter your email"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="form-label fw-bold">Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="Enter your password"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    
                    <button type="submit" className="btn btn-primary w-100 fw-bold">
                        Login
                    </button>
                </form>
                
                <div className="text-center mt-3">
                    <small>
                        Don't have an account? <Link to="/register" className="text-decoration-none">Register here</Link>
                    </small>
                </div>
            </div>
        </div>
    );
};

export default Login;