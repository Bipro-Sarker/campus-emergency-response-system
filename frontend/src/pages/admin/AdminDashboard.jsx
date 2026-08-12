import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext); // useNavigate এবং logout সরিয়ে দেওয়া হয়েছে
    const [emergencies, setEmergencies] = useState([]);

    useEffect(() => {
        fetchEmergencies();
    }, []);

    const fetchEmergencies = async () => {
        try {
            const response = await api.get('/emergencies');
            setEmergencies(response.data);
        } catch (error) {
            console.error("Error fetching emergencies:", error);
        }
    };

    // স্ট্যাটাস আপডেট করার ফাংশন
    const handleStatusChange = async (id, newStatus) => {
        try {
            await api.put(`/emergencies/${id}/status`, { 
                status: newStatus, 
                response_note: 'Action taken by Admin' 
            });
            fetchEmergencies(); // স্ট্যাটাস আপডেটের পর লিস্ট রিফ্রেশ করা
        } catch (error) {
            alert('Error updating status!');
        }
    };

    // ড্যাশবোর্ডের হিসাব-নিকাশ
    const totalRequests = emergencies.length;
    const pendingRequests = emergencies.filter(e => e.status === 'Pending').length;
    const resolvedRequests = emergencies.filter(e => e.status === 'Resolved').length;

    return (
        <div className="container mt-5">
            <div className="mb-4">
                <h2 className="fw-bold">Admin Panel - {user?.full_name}</h2>
            </div>
            
            {/* Statistics Cards */}
            <div className="row mb-5">
                <div className="col-md-4 mb-3">
                    <div className="card text-white bg-primary shadow-sm border-0">
                        <div className="card-body text-center">
                            <h4>All Requests</h4>
                            <h2>{totalRequests}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card text-white bg-warning shadow-sm border-0 text-dark">
                        <div className="card-body text-center">
                            <h4>Pending</h4>
                            <h2>{pendingRequests}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card text-white bg-success shadow-sm border-0">
                        <div className="card-body text-center">
                            <h4>Resolved</h4>
                            <h2>{resolvedRequests}</h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* Emergency Requests Table */}
            <h4 className="mb-3 text-secondary">🚨 Recent Emergency Requests</h4>
            <div className="table-responsive shadow-sm rounded">
                <table className="table table-hover table-bordered bg-white mb-0">
                    <thead className="table-dark">
                        <tr>
                            <th>Code</th>
                            <th>Student Name</th>
                            <th>Emergency Type</th>
                            <th>Location</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emergencies.length > 0 ? (
                            emergencies.map((request) => (
                                <tr key={request.id}>
                                    <td className="fw-bold">{request.emergency_code}</td>
                                    <td>{request.student_name} <br/><small className="text-muted">ID: {request.student_id}</small></td>
                                    <td>{request.emergency_type}</td>
                                    <td>{request.building_name} (Fl: {request.floor})</td>
                                    <td>
                                        <span className={`badge ${request.priority === 'Critical' ? 'bg-danger' : request.priority === 'High' ? 'bg-warning text-dark' : 'bg-info'}`}>
                                            {request.priority}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge ${request.status === 'Resolved' ? 'bg-success' : 'bg-secondary'}`}>
                                            {request.status}
                                        </span>
                                    </td>
                                    <td>
                                        {request.status !== 'Resolved' && (
                                            <button 
                                                className="btn btn-sm btn-success fw-bold"
                                                onClick={() => handleStatusChange(request.id, 'Resolved')}
                                            >
                                                Mark Resolved
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center text-muted py-4">No emergency requests found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;