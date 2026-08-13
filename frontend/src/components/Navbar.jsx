import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    
    // মোবাইল মেনু ওপেন বা ক্লোজ স্টেট হ্যান্ডেল করার জন্য
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleLogout = () => {
        setIsCollapsed(true);
        logout();
        navigate('/login');
    };

    const handleLinkClick = () => {
        setIsCollapsed(true); // কোনো লিঙ্কে ক্লিক করলেই মেনু বন্ধ হয়ে যাবে
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container">
                <Link className="navbar-brand fw-bold text-danger" to="/" onClick={handleLinkClick}>
                    🚨 CERS 
                </Link>
                
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`} id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        {user ? (
                            // যদি ইউজার লগিন করা থাকে
                            <>
                                <li className="nav-item me-3 py-2 py-lg-0">
                                    <span className="nav-link text-light p-0">
                                        👤 {user.full_name} ({user.role === 'admin' ? 'Admin' : 'Student'})
                                    </span>
                                </li>
                                <li className="nav-item me-2 my-1 my-lg-0">
                                    <Link 
                                        className="nav-link" 
                                        to={user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'}
                                        onClick={handleLinkClick}
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                <li className="nav-item my-1 my-lg-0">
                                    <button className="btn btn-outline-danger btn-sm fw-bold ms-lg-2" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            // যদি ইউজার লগিন করা না থাকে
                            <>
                                <li className="nav-item my-1 my-lg-0">
                                    <Link className="nav-link" to="/login" onClick={handleLinkClick}>Login</Link>
                                </li>
                                <li className="nav-item my-1 my-lg-0">
                                    <Link className="btn btn-primary btn-sm ms-lg-2 fw-bold" to="/register" onClick={handleLinkClick}>Register</Link>
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