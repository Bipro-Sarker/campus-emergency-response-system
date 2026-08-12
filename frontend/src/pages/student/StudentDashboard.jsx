import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

const StudentDashboard = () => {
    const { user } = useContext(AuthContext); // logout সরিয়ে দেওয়া হয়েছে
    const navigate = useNavigate();
    const [myRequests, setMyRequests] = useState([]);

    useEffect(() => {
        fetchMyRequests();
    }, []);

    const fetchMyRequests = async () => {
        try {
            const response = await api.get('/emergencies');
            setMyRequests(response.data);
        } catch (error) {
            console.error("Error fetching my requests:", error);
        }
    };

    // ড্যাশবোর্ডের হিসাব-নিকাশ
    const totalRequests = myRequests.length;
    const pendingRequests = myRequests.filter(e => e.status === 'Pending').length;
    const resolvedRequests = myRequests.filter(e => e.status === 'Resolved').length;

    return (
        <div className="container mt-5">
            <div className="mb-4">
                <h2 className="fw-bold">Welcome, {user?.full_name} 👋</h2>
            </div>
            
            <div className="row mb-4">
                <div className="col-md-4 mb-3">
                    <div className="card text-white bg-primary shadow-sm border-0">
                        <div className="card-body text-center">
                            <h5>My Total Requests</h5>
                            <h2>{totalRequests}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card text-dark bg-warning shadow-sm border-0">
                        <div className="card-body text-center">
                            <h5>Pending</h5>
                            <h2>{pendingRequests}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card text-white bg-success shadow-sm border-0">
                        <div className="card-body text-center">
                            <h5>Resolved</h5>
                            <h2>{resolvedRequests}</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center mb-5">
                <button 
                    className="btn btn-danger btn-lg px-5 py-3 fw-bold fs-4 shadow rounded-pill"
                    onClick={() => navigate('/student/report-emergency')}
                >
                    🚨 REPORT EMERGENCY / SEND SOS
                </button>
            </div>

            <h4 className="mb-3 text-secondary">🕒 My Request History</h4>
            <div className="table-responsive shadow-sm rounded mb-5">
                <table className="table table-hover table-bordered bg-white mb-0">
                    <thead className="table-light">
                        <tr>
                            <th>Code</th>
                            <th>Emergency Type</th>
                            <th>Location</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myRequests.length > 0 ? (
                            myRequests.map((request) => (
                                <tr key={request.id}>
                                    <td className="fw-bold text-primary">{request.emergency_code}</td>
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
                                    <td>{new Date(request.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center text-muted py-4">You haven't made any emergency requests yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentDashboard;