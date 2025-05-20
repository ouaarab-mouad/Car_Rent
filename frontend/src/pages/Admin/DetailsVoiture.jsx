import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import './DetailsVoiture.css';
import ClipLoader from "react-spinners/ClipLoader";

export const DetailsVoiture = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [voiture, setVoiture] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        console.log('=== DetailsVoiture Component Mounted ===');
        console.log('Car ID from params:', id);
        console.log('Current URL:', window.location.href);

        const fetchVoitureDetails = async () => {
            try {
                console.log('Fetching car details for ID:', id);
                const response = await axios.get(`http://127.0.0.1:8000/api/voitures/${id}`);
                console.log('API Response:', response);
                console.log('Response data:', response.data);
                
                if (response.data.success) {
                    console.log('Setting voiture data:', response.data.data);
                    setVoiture(response.data.data);
                } else {
                    console.error('API returned success: false', response.data);
                    throw new Error(response.data.message || 'Failed to load car details');
                }
            } catch (error) {
                console.error('=== Error Details ===');
                console.error('Error object:', error);
                console.error('Error response:', error.response);
                console.error('Error message:', error.message);
                console.error('Error stack:', error.stack);
                
                setMessage({
                    type: 'error',
                    text: error.response?.data?.message || error.message || 'Failed to load car details'
                });
                
                if (error.response?.status === 403) {
                    console.log('Redirecting to login due to 403 error');
                    navigate('/login');
                }
            } finally {
                console.log('Setting loading to false');
                setLoading(false);
            }
        };

        if (id) {
            console.log('ID exists, fetching car details');
            fetchVoitureDetails();
        } else {
            console.error('No car ID provided');
            setMessage({
                type: 'error',
                text: 'No car ID provided'
            });
            setLoading(false);
        }
    }, [id, navigate]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this car?')) {
            try {
                const response = await axios.delete(`http://127.0.0.1:8000/api/voitures/${id}`);
                if (response.data.success) {
                    setMessage({
                        type: 'success',
                        text: 'Car deleted successfully'
                    });
                    setTimeout(() => {
                        navigate('/admin/voitures');
                    }, 2000);
                }
            } catch (error) {
                setMessage({
                    type: 'error',
                    text: error.response?.data?.message || 'Failed to delete car'
                });
            }
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
                <p>Loading car details...</p>
            </div>
        );
    }

    if (!voiture) {
        return (
            <div className="error-container">
                <i className="fas fa-exclamation-circle"></i>
                <p>Car not found</p>
                <button onClick={() => navigate('/admin/voitures')} className="back-btn">
                    <i className="fas fa-arrow-left"></i> Back to Cars
                </button>
            </div>
        );
    }

    return (
        <div className="details-container">
            {message.text && (
                <div className={`message-alert ${message.type}`}>
                    <div className="message-icon">
                        {message.type === 'success' ? (
                            <i className="fas fa-check-circle"></i>
                        ) : (
                            <i className="fas fa-exclamation-circle"></i>
                        )}
                    </div>
                    <div className="message-content">
                        <p>{message.text}</p>
                    </div>
                    <button 
                        className="message-close"
                        onClick={() => setMessage({ type: '', text: '' })}
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            )}

            <div className="details-header">
                <button onClick={() => navigate('/admin/dashboard/voitures')} className="back-btn">
                    <i className="fas fa-arrow-left"></i> Back to Cars
                </button>
                <h1>Car Details</h1>
            </div>

            <div className="details-content">
                <div className="details-section image-section">
                    <h2>Car Image</h2>
                    <div className="car-image-container">
                        {voiture.srcimg ? (
                            <img 
                                src={voiture.srcimg} 
                                alt={`${voiture.marque} ${voiture.modele}`}
                                className="car-image"
                            />
                        ) : (
                            <div className="no-image">
                                <i className="fas fa-car"></i>
                                <p>No image available</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="details-section">
                    <h2>Basic Information</h2>
                    <div className="details-grid">
                        <div className="detail-item">
                            <label>Brand</label>
                            <p>{voiture.marque}</p>
                        </div>
                        <div className="detail-item">
                            <label>Model</label>
                            <p>{voiture.modele}</p>
                        </div>
                        <div className="detail-item">
                            <label>Year</label>
                            <p>{voiture.annee}</p>
                        </div>
                        <div className="detail-item">
                            <label>Price per Day</label>
                            <p>{voiture.prix_par_jour} DH</p>
                        </div>
                        <div className="detail-item">
                            <label>City</label>
                            <p>{voiture.ville}</p>
                        </div>
                        <div className="detail-item">
                            <label>Status</label>
                            <span className={`status-badge ${voiture.status}`}>
                                {voiture.status === 'disponible' ? (
                                    <i className="fas fa-check-circle"></i>
                                ) : voiture.status === 'en_location' ? (
                                    <i className="fas fa-car"></i>
                                ) : (
                                    <i className="fas fa-wrench"></i>
                                )}
                                {voiture.status}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="details-section">
                    <h2>Owner Information</h2>
                    <div className="details-grid">
                        <div className="detail-item">
                            <label>Owner Name</label>
                            <p>{voiture.utilisateur?.nom} {voiture.utilisateur?.prenom}</p>
                        </div>
                        <div className="detail-item">
                            <label>Owner Email</label>
                            <p>{voiture.utilisateur?.email}</p>
                        </div>
                        <div className="detail-item">
                            <label>Owner Phone</label>
                            <p>{voiture.utilisateur?.telephone || 'Not provided'}</p>
                        </div>
                    </div>
                </div>

                <div className="details-section">
                    <h2>Car Specifications</h2>
                    <div className="details-grid">
                        <div className="detail-item">
                            <label>Transmission</label>
                            <p>{voiture.transmission || 'Not specified'}</p>
                        </div>
                        <div className="detail-item">
                            <label>Fuel Type</label>
                            <p>{voiture.carburant || 'Not specified'}</p>
                        </div>
                        <div className="detail-item">
                            <label>Number of Seats</label>
                            <p>{voiture.nombre_places || 'Not specified'}</p>
                        </div>
                        <div className="detail-item">
                            <label>Mileage</label>
                            <p>{voiture.kilometrage ? `${voiture.kilometrage} km` : 'Not specified'}</p>
                        </div>
                    </div>
                </div>

                <div className="details-section">
                    <h2>Car Features</h2>
                    <div className="features-grid">
                        {voiture.conditions && Object.entries(voiture.conditions).map(([feature, value]) => (
                            <div key={feature} className="feature-item">
                                <span className={`feature-icon ${value ? 'active' : 'inactive'}`}>
                                    <i className={`fas fa-${value ? 'check' : 'times'}-circle`}></i>
                                </span>
                                <span className="feature-name">
                                    {feature.replace(/([A-Z])/g, ' $1').trim()}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="details-section">
                    <h2>Description</h2>
                    <div className="description-content">
                        <p>{voiture.description || 'No description provided'}</p>
                    </div>
                </div>

                <div className="details-actions">
                    <button 
                        className="action-btn delete-btn"
                        onClick={handleDelete}
                    >
                        <i className="fas fa-trash"></i> Delete Car
                    </button>
                </div>
            </div>
        </div>
    );
}; 