import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, roleRequired }) => {
    const { user, loading } = useContext(AuthContext);

    // Context লোড হওয়া পর্যন্ত অপেক্ষা করা
    if (loading) {
        return <div className="text-center mt-5"><h3>Loading...</h3></div>;
    }

    // ইউজার লগিন করা না থাকলে লগিন পেজে পাঠিয়ে দেওয়া
    if (!user) {
        return <Navigate to="/login" />;
    }

    // যদি পেজটির জন্য নির্দিষ্ট কোনো রোল (Admin/Student) প্রয়োজন হয় এবং ইউজারের রোল তা না হয়
    if (roleRequired && user.role !== roleRequired) {
        return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'} />;
    }

    // সব ঠিক থাকলে কাঙ্ক্ষিত পেজটি দেখানো
    return children;
};

export default ProtectedRoute;