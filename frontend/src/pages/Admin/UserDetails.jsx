import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/user/${id}`);
                if (response.data.success) {
                    setUser(response.data.data);
                } else {
                    setError('Failed to load user details');
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load user details');
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="loader-container">
                <ClipLoader
                    color="#6342ff"
                    loading={loading}
                    size={50}
                    aria-label="Loading Spinner"
                />
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <p className="error-message">{error}</p>
                <button onClick={() => navigate('/admin/users')} className="back-button">
                    Back to Users List
                </button>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="error-container">
                <p className="error-message">User not found</p>
                <button onClick={() => navigate('/admin/users')} className="back-button">
                    Back to Users List
                </button>
            </div>
        );
    }

    return (
        <div className="user-details-container">
            <div className="user-details-header">
                <h2>User Details</h2>
                <button onClick={() => navigate('/admin/users')} className="back-button">
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
                    </div>
                </div>

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