import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ClientDashboard.css';

const ClientDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/client/reservations', {
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
      <div className="dashboard-header">
        <h2>Mes Réservations</h2>
        <div className="filter-controls">
          <span>Filtrer par:</span>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="filter-dropdown"
          >
            <option value="all">Toutes les réservations</option>
            <option value="confirmé">Confirmées</option>
            <option value="en attente">En attente</option>
            <option value="annulé">Annulées</option>
            <option value="terminé">Terminées</option>
          </select>
        </div>
      </div>

      {reservations.length === 0 ? (
        <div className="no-reservations">
          <div className="empty-icon">📅</div>
          <p>Vous n'avez aucune réservation.</p>
          <Link to="/cars" className="browse-cars-btn">Parcourir les voitures disponibles</Link>
        </div>
      ) : filteredReservations.length === 0 ? (
        <div className="no-reservations">
          <p>Aucune réservation ne correspond à ce filtre.</p>
          <button onClick={() => setFilter('all')} className="reset-filter-btn">
            Réinitialiser le filtre
          </button>
        </div>
      ) : (
        <div className="reservations-container">
          {filteredReservations.map(res => (
            <div key={res.id} className="reservation-card">
              <div className="reservation-header">
                <span className={`reservation-status ${getStatusClass(res.statut)}`}>
                  {res.statut}
                </span>
                <span className="reservation-id">Réservation #{res.id}</span>
              </div>
              
              <div className="reservation-car-details">
                {res.car.srcimg ? (
                  <img src={res.car.srcimg} alt={`${res.car.marque} ${res.car.modele}`} className="car-image" />
                ) : (
                  <div className="car-image-placeholder">
                    <span>Image non disponible</span>
                  </div>
                )}
                <div className="car-info">
                  <h3>{res.car.marque} {res.car.modele}</h3>
                  <div className="loueur-info">
                    {res.loueur ? (
                      <>
                        <span className="loueur-label">Loueur:</span>
                        <Link to={`/profile/${res.loueur.id}`} className="loueur-link">
                          {res.loueur.nom} {res.loueur.prenom}
                        </Link>
                      </>
                    ) : 'Loueur non disponible'}
                  </div>
                </div>
              </div>
              
              <div className="reservation-dates">
                <div className="date-group">
                  <span className="date-label">Date de début</span>
                  <span className="date-value">{formatDate(res.date_debut)}</span>
                </div>
                <div className="date-separator">→</div>
                <div className="date-group">
                  <span className="date-label">Date de fin</span>
                  <span className="date-value">{formatDate(res.date_fin)}</span>
                </div>
              </div>
              
              <div className="reservation-footer">
                <div className="price-info">
                  <span className="price-label">Prix total</span>
                  <span className="price-value">{res.prix_total} DH</span>
                </div>
                <Link to={`/cars/${res.car.id}`} className="details-button">
                  Voir détails
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;