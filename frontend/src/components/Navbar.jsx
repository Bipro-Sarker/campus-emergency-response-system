import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container">
                <Link className="navbar-brand fw-bold text-danger" to="/">
                    🚨 CERS 
                </Link>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        {user ? (
                            // যদি ইউজার লগিন করা থাকে
                            <>
                                <li className="nav-item me-3">
                                    <span className="nav-link text-light">
                                        👤 {user.full_name} ({user.role === 'admin' ? 'Admin' : 'Student'})
                                    </span>
                                </li>
                                <li className="nav-item me-2">
                                    <Link className="nav-link" to={user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'}>
                                        Dashboard
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-outline-danger btn-sm fw-bold ms-2" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            // যদি ইউজার লগিন করা না থাকে
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn btn-primary btn-sm ms-2 fw-bold" to="/register">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;