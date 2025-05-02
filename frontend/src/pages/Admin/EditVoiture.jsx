import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import './EditVoiture.css';
import ClipLoader from "react-spinners/ClipLoader";

export const EditVoiture = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [formData, setFormData] = useState({
        modele: '',
        marque: '',
        categorie: '',
        ville: '',
        prix_par_jour: '',
        status: 'disponible',
        description: '',
        transmission: '',
        carburant: '',
        nombre_places: '',
        kilometrage: ''
    });

    useEffect(() => {
        const fetchVoitureDetails = async () => {
            try {
                const response = await axios.get(`/api/cars/${id}`);
                if (response.data.success) {
                    const voiture = response.data.data;
                    setFormData({
                        modele: voiture.modele || '',
                        marque: voiture.marque || '',
                        categorie: voiture.categorie || '',
                        ville: voiture.ville || '',
                        prix_par_jour: voiture.prix_par_jour || '',
                        status: voiture.status || 'disponible',
                        description: voiture.description || '',
                        transmission: voiture.transmission || '',
                        carburant: voiture.carburant || '',
                        nombre_places: voiture.nombre_places || '',
                        kilometrage: voiture.kilometrage || ''
                    });
                }
            } catch (error) {
                setMessage({
                    type: 'error',
                    text: error.response?.data?.message || 'Failed to load car details'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchVoitureDetails();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/cars/${id}`, formData);
            if (response.data.success) {
                setMessage({
                    type: 'success',
                    text: 'Car updated successfully'
                });
                setTimeout(() => {
                    navigate(`/admin/dashboard/voitures/${id}`);
                }, 2000);
            }
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Failed to update car'
            });
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

    return (
        <div className="edit-container">
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

            <div className="edit-header">
                <button onClick={() => navigate(`/admin/dashboard/voitures/${id}`)} className="back-btn">
                    <i className="fas fa-arrow-left"></i> Back to Details
                </button>
                <h1>Edit Car</h1>
            </div>

            <form onSubmit={handleSubmit} className="edit-form">
                <div className="form-section">
                    <h2>Basic Information</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Brand</label>
                            <input
                                type="text"
                                name="marque"
                                value={formData.marque}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Model</label>
                            <input
                                type="text"
                                name="modele"
                                value={formData.modele}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <input
                                type="text"
                                name="categorie"
                                value={formData.categorie}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>City</label>
                            <input
                                type="text"
                                name="ville"
                                value={formData.ville}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Price per Day (DH)</label>
                            <input
                                type="number"
                                name="prix_par_jour"
                                value={formData.prix_par_jour}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="disponible">Available</option>
                                <option value="en_location">Rented</option>
                                <option value="en_maintenance">In Maintenance</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h2>Specifications</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Transmission</label>
                            <input
                                type="text"
                                name="transmission"
                                value={formData.transmission}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Fuel Type</label>
                            <input
                                type="text"
                                name="carburant"
                                value={formData.carburant}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Number of Seats</label>
                            <input
                                type="number"
                                name="nombre_places"
                                value={formData.nombre_places}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Mileage (km)</label>
                            <input
                                type="number"
                                name="kilometrage"
                                value={formData.kilometrage}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h2>Description</h2>
                    <div className="form-group">
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="4"
                            placeholder="Enter car description..."
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="submit-btn">
                        <i className="fas fa-save"></i> Save Changes
                    </button>
                    <button 
                        type="button" 
                        className="cancel-btn"
                        onClick={() => navigate(`/admin/dashboard/voitures/${id}`)}
                    >
                        <i className="fas fa-times"></i> Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}; 