import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ClientDashboard.css';

const ClientDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://127.0.0.1:8000/api/client/reservations', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('API response:', res.data);
        setReservations(res.data.reservations || []);
      } catch (err) {
        console.error('API error:', err, err.response);
        setError('Erreur lors du chargement des réservations. ' + (err.response ? JSON.stringify(err.response.data) : err.message));
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  const handleCancelReservation = async (reservationId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
      return;
    }

    setCancellingId(reservationId);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      console.log('Attempting to cancel reservation:', reservationId);
      const response = await axios.post(
        `http://127.0.0.1:8000/api/client/reservations/${reservationId}/cancel`,
        {},
        {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('Cancel response:', response.data);
      
      // Update the local state to reflect the cancellation
      setReservations(prevReservations => 
        prevReservations.map(res => 
          res.id === reservationId 
            ? { ...res, statut: 'annulé' }
            : res
        )
      );

      // Show success message
      alert(response.data.message || 'Réservation annulée avec succès');
    } catch (err) {
      console.error('Error cancelling reservation:', err);
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      
      // Show the specific error message from the backend if available
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          err.message || 
                          'Erreur lors de l\'annulation de la réservation. Veuillez réessayer.';
      alert(errorMessage);
    } finally {
      setCancellingId(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const getStatusClass = (status) => {
    switch(status?.toLowerCase()) {
      case 'confirmé':
      case 'confirmée':
      case 'confirme':
        return 'status-confirmed';
      case 'en attente':
        return 'status-pending';
      case 'annulé':
      case 'annulée':
      case 'annule':
        return 'status-cancelled';
      case 'terminé':
      case 'terminée':
      case 'termine':
        return 'status-completed';
      default:
        return '';
    }
  };

  const filteredReservations = filter === 'all' 
    ? reservations 
    : reservations.filter(res => res.statut?.toLowerCase() === filter);

  if (loading) return (
    <div className="loading-container">
      <div className="loader"></div>
      <p>Chargement des réservations...</p>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <div className="error-icon">!</div>
      <h3>Erreur</h3>
      <p>{error}</p>
      <button onClick={() => window.location.reload()} className="retry-button">
        Réessayer
      </button>
    </div>
  );

  return (
    <div className="client-dashboard">
      <div className="client-dashboard-header">
        <h2>Mes Réservations</h2>
        <div className="client-filter-controls">
          <span>Filtrer par:</span>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="client-filter-dropdown"
          >
            <option value="all">Toutes les réservations</option>
            <option value="confirmé">Confirmées</option>
            <option value="en_attente">En attente</option>
            <option value="annulé">Annulées</option>
            <option value="terminé">Terminées</option>
          </select>
        </div>
      </div>

      {reservations.length === 0 ? (
        <div className="client-no-reservations">
          <div className="client-empty-icon">📅</div>
          <p>Vous n'avez aucune réservation.</p>
          <Link to="/cars" className="client-browse-cars-btn">Parcourir les voitures disponibles</Link>
        </div>
      ) : filteredReservations.length === 0 ? (
        <div className="client-no-reservations">
          <p>Aucune réservation ne correspond à ce filtre.</p>
          <button onClick={() => setFilter('all')} className="client-reset-filter-btn">
            Réinitialiser le filtre
          </button>
        </div>
      ) : (
        <div className="client-reservations-container">
          {filteredReservations.map(res => (
            <div key={res.id} className="client-reservation-card">
              <div className="client-reservation-header">
                <span className={`client-reservation-status client-status-${getStatusClass(res.statut).replace('status-', '')}`}>
                  {res.statut}
                </span>
                <span className="client-reservation-id">Réservation #{res.id}</span>
              </div>
              
              <div className="client-reservation-car-details">
                {res.car.srcimg ? (
                  <img src={`http://127.0.0.1:8000${res.car.srcimg}`} alt={`${res.car.marque} ${res.car.modele}`} className="client-car-image" />
                ) : (
                  <div className="client-car-image-placeholder">
                    <span>Image non disponible</span>
                  </div>
                )}
                <div className="client-car-info">
                  <h3>{res.car.marque} {res.car.modele}</h3>
                  <div className="client-loueur-info">
                    {res.loueur ? (
                      <>
                        <span className="client-loueur-label">Loueur:</span>
                        <Link to={`/profile/${res.loueur.id}`} className="client-loueur-link">
                          {res.loueur.nom} {res.loueur.prenom}
                        </Link>
                      </>
                    ) : 'Loueur non disponible'}
                  </div>
                </div>
              </div>
              
              <div className="client-reservation-dates">
                <div className="client-date-group">
                  <span className="client-date-label">Date de début</span>
                  <span className="client-date-value">{formatDate(res.date_debut)}</span>
                </div>
                <div className="client-date-separator">→</div>
                <div className="client-date-group">
                  <span className="client-date-label">Date de fin</span>
                  <span className="client-date-value">{formatDate(res.date_fin)}</span>
                </div>
              </div>
              
              <div className="client-reservation-footer">
                <div className="client-price-info">
                  <span className="client-price-label">Prix total</span>
                  <span className="client-price-value">{res.prix_total} DH</span>
                </div>
                <div className="client-reservation-actions">
                  <Link to={`/cars/${res.car.id}`} className="client-details-button">
                    Voir détails
                  </Link>
                  {res.statut?.toLowerCase() === 'en_attente' && (
                    <button 
                      className="client-cancel-button"
                      onClick={() => handleCancelReservation(res.id)}
                      disabled={cancellingId === res.id}
                    >
                      {cancellingId === res.id ? 'Annulation...' : 'Annuler'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;