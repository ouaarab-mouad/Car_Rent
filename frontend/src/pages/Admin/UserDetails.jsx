import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { useParams, useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import './UserDetails.css';

export const UserDetails = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('UserDetails mounted with ID:', id);
        const fetchUserDetails = async () => {
            try {
                console.log('Fetching user details for ID:', id);
                const response = await axios.get(`api/user/${id}`);
                console.log('User details response:', response.data);
                
                if (response.data.success) {
                    setUser(response.data.data);
                } else {
                    setError('Failed to load user details');
                }
            } catch (err) {
                console.error('Error fetching user details:', err);
                console.error('Error response:', err.response);
                setError(err.response?.data?.message || 'Failed to load user details');
                if (err.response?.status === 401) {
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchUserDetails();
        } else {
            setError('No user ID provided');
            setLoading(false);
        }
    }, [id, navigate]);

    const handleApprove = async () => {
        try {
            const response = await axios.put(`api/user/${id}/role`, {
                role: 'loueur',
                role_status: 'approved'
            });
            
            if (response.data.success) {
                setUser(prev => ({
                    ...prev,
                    role: 'loueur',
                    role_status: 'approved'
                }));
                alert('User approved as loueur successfully!');
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to approve user');
        }
    };

    const handleReject = async () => {
        try {
            const response = await axios.put(`/user/${id}/role`, {
                role: 'client',
                role_status: 'rejected'
            });
            
            if (response.data.success) {
                setUser(prev => ({
                    ...prev,
                    role: 'client',
                    role_status: 'rejected'
                }));
                alert('User rejected successfully!');
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to reject user');
        }
    };

    if (loading) {
        return (
            <div className="loader-container">
                <ClipLoader
                    color="#6342ff"
                    loading={loading}
                    size={50}
                    aria-label="Loading Spinner"
                />
                <p>Loading user details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <p className="error-message">{error}</p>
                <button onClick={() => navigate('/admin/dashboard/users')} className="back-button">
                    Back to Users List
                </button>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="error-container">
                <p className="error-message">User not found</p>
                <button onClick={() => navigate('/admin/dashboard/users')} className="back-button">
                    Back to Users List
                </button>
            </div>
        );
    }

    return (
        <div className="user-details-container">
            <div className="user-details-header">
                <h2>User Details</h2>
                <button onClick={() => navigate('/admin/dashboard/users')} className="back-button">
                    Back to Users List
                </button>
            </div>

            <div className="user-details-content">
                <div className="user-info-section">
                    <h3>Personal Information</h3>
                    <div className="info-grid">
                        <div className="info-item">
                            <label>Name:</label>
                            <span>{user.nom} {user.prenom}</span>
                        </div>
                        <div className="info-item">
                            <label>Email:</label>
                            <span>{user.email}</span>
                        </div>
                        <div className="info-item">
                            <label>Phone:</label>
                            <span>{user.phone}</span>
                        </div>
                        <div className="info-item">
                            <label>Role:</label>
                            <span className={`role-badge ${user.role}`}>{user.role}</span>
                        </div>
                        <div className="info-item">
                            <label>Enterprise:</label>
                            <span>{user.EnterpriseName || 'N/A'}</span>
                        </div>
                        <div className="info-item">
                            <label>Status:</label>
                            <span className={`status-badge ${user.role_status}`}>
                                {user.role_status === 'pending' ? 'Pending Approval' : 
                                 user.role_status === 'approved' ? 'Approved' : 
                                 user.role_status === 'rejected' ? 'Rejected' : 'N/A'}
                            </span>
                        </div>
                    </div>
                </div>

                {user.licence && (
                    <div className="licence-section">
                        <h3>Licence Document</h3>
                        <div className="licence-content">
                            <div className="licence-preview">
                                <img 
                                    src={`http://127.0.0.1:8000/storage/${user.licence}`} 
                                    alt="Licence Document"
                                    className="licence-image"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/400x300?text=Document+Not+Found';
                                    }}
                                />
                                <div className="licence-actions">
                                    <a 
                                        href={`http://127.0.0.1:8000/storage/${user.licence}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="view-button"
                                    >
                                        <i className="fas fa-external-link-alt"></i> View Full Size
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {user.requested_role === 'loueur' && user.role_status === 'pending' && (
                    <div className="approval-actions">
                        <button onClick={handleApprove} className="approve-button">
                            <i className="fas fa-check"></i> Approve as Loueur
                        </button>
                        <button onClick={handleReject} className="reject-button">
                            <i className="fas fa-times"></i> Reject Request
                        </button>
                    </div>
                )}

                {user.reservations && user.reservations.length > 0 && (
                    <div className="reservations-section">
                        <h3>Reservations</h3>
                        <div className="reservations-list">
                            {user.reservations.map((reservation) => (
                                <div key={reservation.id} className="reservation-card">
                                    <div className="reservation-info">
                                        <p><strong>Vehicle:</strong> {reservation.vehicle?.brand} {reservation.vehicle?.model}</p>
                                        <p><strong>Start Date:</strong> {new Date(reservation.start_date).toLocaleDateString()}</p>
                                        <p><strong>End Date:</strong> {new Date(reservation.end_date).toLocaleDateString()}</p>
                                        <p><strong>Status:</strong> <span className={`status-badge ${reservation.status}`}>{reservation.status}</span></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {user.vehicles && user.vehicles.length > 0 && (
                    <div className="vehicles-section">
                        <h3>Vehicles</h3>
                        <div className="vehicles-list">
                            {user.vehicles.map((vehicle) => (
                                <div key={vehicle.id} className="vehicle-card">
                                    <div className="vehicle-info">
                                        <p><strong>Brand:</strong> {vehicle.brand}</p>
                                        <p><strong>Model:</strong> {vehicle.model}</p>
                                        <p><strong>Year:</strong> {vehicle.year}</p>
                                        <p><strong>Status:</strong> <span className={`status-badge ${vehicle.status}`}>{vehicle.status}</span></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}; 