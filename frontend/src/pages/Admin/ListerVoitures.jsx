import React, { useEffect, useState } from 'react'
import axios from "../../utils/axios"
import './ListeVoitures.css'
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from 'react-router-dom';

export const ListerVoitures = () => {
    const [voitures, setVoitures] = useState([]);
    const [filteredVoitures, setFilteredVoitures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [voitureToDelete, setVoitureToDelete] = useState(null);
    const navigate = useNavigate();

    // Initialize CSRF token and fetch voitures
    useEffect(() => {
        const initializeData = async () => {
            try {
                // First get CSRF token
                await axios.get('/sanctum/csrf-cookie');
                
                // Then fetch voitures
                const response = await axios.get('/api/voitures');
                
                if (response.data.success) {
                    setVoitures(response.data.data);
                    setFilteredVoitures(response.data.data);
                } else {
                    throw new Error(response.data.message || 'Failed to load cars');
                }
            } catch (error) {
                console.error('Error:', error);
                setMessage({
                    type: 'error',
                    text: error.response?.data?.message || error.message || 'Failed to load cars. Please try again later.'
                });
                
                if (error.response?.status === 403) {
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        initializeData();
    }, [navigate]);

    // Filter states
    const [filters, setFilters] = useState({
        marque: '',
        modele: '',
        status: 'all'
    });

    useEffect(() => {
        const fetchVoitures = async () => {
            try {
                const response = await axios.get('/api/voitures');
                
                if (response.data.success) {
                    setVoitures(response.data.data);
                    setFilteredVoitures(response.data.data);
                } else {
                    throw new Error(response.data.message || 'Failed to load cars');
                }
            } catch (error) {
                console.error('Error loading cars:', error);
                setMessage({
                    type: 'error',
                    text: error.response?.data?.message || error.message || 'Failed to load cars. Please try again later.'
                });
                
                if (error.response?.status === 403) {
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchVoitures();
    }, [navigate]);

    // Filter voitures based on search criteria
    useEffect(() => {
        let filtered = [...voitures];
        
        if (filters.marque) {
            filtered = filtered.filter(voiture => 
                voiture.marque.toLowerCase().includes(filters.marque.toLowerCase())
            );
        }
        
        if (filters.modele) {
            filtered = filtered.filter(voiture => 
                voiture.modele.toLowerCase().includes(filters.modele.toLowerCase())
            );
        }
        
        if (filters.status !== 'all') {
            filtered = filtered.filter(voiture => voiture.status === filters.status);
        }
        
        setFilteredVoitures(filtered);
    }, [filters, voitures]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDeleteClick = (voiture) => {
        setVoitureToDelete(voiture);
        setShowDeleteModal(true);
    };

    const deleteVoiture = async (id) => {
        try {
            // First get CSRF token
            const csrfResponse = await axios.get('/sanctum/csrf-cookie');
            
            // Get the XSRF-TOKEN from the response headers
            const xsrfToken = csrfResponse.headers['x-xsrf-token'];
            
            // Then make the delete request using the correct API endpoint
            const res = await axios.delete(`api/cars/${id}`, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-XSRF-TOKEN': xsrfToken
                },
                withCredentials: true
            });
            
            if (res.data.success) {
                setMessage({
                    type: 'success',
                    text: res.data.message || 'Car deleted successfully'
                });
                setVoitures(prev => prev.filter(p => p.id !== id));
            } else {
                throw new Error(res.data.message || 'Failed to delete car');
            }
        } catch (error) {
            console.error('Error deleting car:', error);
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Failed to delete car. Please try again later.'
            });
        } finally {
            setShowDeleteModal(false);
            setVoitureToDelete(null);
        }
    };

    const handleDetailsClick = (voitureId) => {
        navigate(`/admin/voitures/${voitureId}`);
    };

    // Message component
    const MessageAlert = ({ type, text }) => {
        if (!text) return null;
        
        return (
            <div className={`message-alert ${type}`}>
                <div className="message-icon">
                    {type === 'success' ? (
                        <i className="fas fa-check-circle"></i>
                    ) : (
                        <i className="fas fa-exclamation-circle"></i>
                    )}
                </div>
                <div className="message-content">
                    <p>{text}</p>
                </div>
                <button 
                    className="message-close"
                    onClick={() => setMessage({ type: '', text: '' })}
                >
                    <i className="fas fa-times"></i>
                </button>
            </div>
        );
    };

    // Delete Confirmation Modal
    const DeleteConfirmationModal = () => {
        if (!showDeleteModal) return null;

        return (
            <div className="modal-overlay">
                <div className="delete-modal">
                    <h3>Confirm Delete</h3>
                    <p>Are you sure you want to delete {voitureToDelete?.marque} {voitureToDelete?.modele}?</p>
                    <div className="modal-buttons">
                        <button 
                            className="modal-btn cancel-btn"
                            onClick={() => {
                                setShowDeleteModal(false);
                                setVoitureToDelete(null);
                            }}
                        >
                            Cancel
                        </button>
                        <button 
                            className="modal-btn confirm-btn"
                            onClick={() => deleteVoiture(voitureToDelete.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    if (loading) return (
        <div className="loader-container">
            <ClipLoader
                color="#6342ff"
                loading={loading}
                size={50}
                aria-label="Loading Spinner"
            />
            <p>Loading cars...</p>
        </div>
    );

    return (
        <div className="voiture-table-container">
            {message.text && (
                <MessageAlert type={message.type} text={message.text} />
            )}
            <DeleteConfirmationModal />
            
            {/* Filter Section */}
            <div className="filter-section">
                <h3>
                    <i className="fas fa-filter"></i>
                    Filtres
                </h3>
                <div className="filter-group">
                    <div className="filter-item">
                        <label>Marque</label>
                        <input
                            type="text"
                            name="marque"
                            placeholder="Rechercher par marque"
                            value={filters.marque}
                            onChange={handleFilterChange}
                            className="filter-input"
                        />
                    </div>
                    <div className="filter-item">
                        <label>Modèle</label>
                        <input
                            type="text"
                            name="modele"
                            placeholder="Rechercher par modèle"
                            value={filters.modele}
                            onChange={handleFilterChange}
                            className="filter-input"
                        />
                    </div>
                    <div className="filter-item">

                        <label>Statut</label>
                        <select
                            name="status"
                            value={filters.status}
                            onChange={handleFilterChange}
                            className="filter-select"
                        >
                            <option value="all">Tous les statuts</option>
                            <option value="disponible">Disponible</option>
                            <option value="en_location">En location</option>
                            <option value="en_maintenance">En maintenance</option>
                        </select>
                    </div>
                </div>
                <div className="filter-results">
                    <i className="fas fa-car"></i>
                    {filteredVoitures.length} voiture{filteredVoitures.length !== 1 ? 's' : ''} trouvée{filteredVoitures.length !== 1 ? 's' : ''}
                </div>
            </div>

            <table className="voiture-table">
                <thead>
                    <tr>
                        <th>Marque</th>
                        <th>Modèle</th>
                        <th>Année</th>
                        <th>Prix/Jour</th>
                        <th>Propriétaire</th>
                        <th>Email Propriétaire</th>
                        <th>Statut</th>
                        <th>Ville</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredVoitures.map((voiture, index) => (
                        <tr key={index}>
                            <td>{voiture.marque}</td>
                            <td>{voiture.modele}</td>
                            <td>{voiture.annee}</td>
                            <td>{voiture.prix_par_jour} DH</td>
                            <td>{voiture.utilisateur?.nom} {voiture.utilisateur?.prenom}</td>
                            <td>{voiture.utilisateur?.email}</td>
                            <td>
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
                            </td>
                            <td>{voiture.ville}</td>
                            <td>
                                <div className="action-buttons">
                                    <button 
                                        className="action-btn edit-btn"
                                        onClick={() => handleDetailsClick(voiture.id)}
                                    >
                                        <i className="fas fa-edit"></i> Détails
                                    </button>
                                    <button 
                                        className="action-btn delete-btn" 
                                        onClick={() => handleDeleteClick(voiture)}
                                    >
                                        <i className="fas fa-trash"></i> Supprimer
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
} 
