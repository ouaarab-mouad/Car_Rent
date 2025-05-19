import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, CreditCard, ArrowLeft, Loader, AlertCircle, CheckCircle } from 'lucide-react';
import axios from '../utils/axios';
import './Reservation.css';

// Main component
export default function Reservation() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [daysCount, setDaysCount] = useState(0);
  const [existingReservation, setExistingReservation] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/cars/${carId}`);
        setCar(res.data);
      } catch (err) {
        setError('Impossible de récupérer les informations du véhicule');
      }
      setLoading(false);
    };
    fetchCar();
  }, [carId]);

  useEffect(() => {
    if (car && dateDebut && dateFin) {
      const start = new Date(dateDebut);
      const end = new Date(dateFin);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      setDaysCount(days > 0 ? days : 0);
      setTotal(days > 0 ? days * car.prix_par_jour : 0);
    } else {
      setDaysCount(0);
      setTotal(0);
    }
  }, [dateDebut, dateFin, car]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');
    setExistingReservation(null);

    try {
      await axios.post('/api/reservations', {
        voiture_id: carId,
        date_debut: dateDebut,
        date_fin: dateFin
      });
      setSuccess('Réservation créée avec succès!');
      setTimeout(() => navigate('/client/dashboard'), 2000);
    } catch (err) {
      if (err.response?.status === 422) {
        setError(err.response.data.message);
        if (err.response.data.existing_reservation) {
          setExistingReservation(err.response.data.existing_reservation);
        }
      } else {
        setError(err.response?.data?.message || 'Erreur lors de la réservation');
      }
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Loader className="spinner" />
        <p className="loading-text">Chargement des informations...</p>
      </div>
    );
  }

  if (error && !car) {
    return (
      <div className="error-container">
        <div className="error-box">
          <div className="error-heading">
            <AlertCircle />
            <h3>Erreur</h3>
          </div>
          <p className="error-message">{error}</p>
          <Link to="/listing" className="back-link">
            <ArrowLeft />
            Retour à la liste des véhicules
          </Link>
        </div>
      </div>
    );
  }

  if (!car) return (
    <div className="error-container">
      <div className="error-box not-found">
        <div className="error-heading">
          <AlertCircle />
          <h3>Véhicule non trouvé</h3>
        </div>
        <p className="error-message">Nous n'avons pas pu trouver le véhicule demandé.</p>
        <Link to="/listing" className="back-link">
          <ArrowLeft />
          Retour à la liste des véhicules
        </Link>
      </div>
    </div>
  );

  return (
    <div className="container">
      <Link to="/listing" className="back-link">
        <ArrowLeft />
        Retour à la liste des véhicules
      </Link>

      <div className="card">
        <div className="card-header">
          <h1>Réservation de véhicule</h1>
          <p>{car.marque} {car.modele}</p>
        </div>

        <div className="card-body">
          <div className="grid">
            {/* Car information */}
            <div>
              <div className="car-info">
                <img 
                  src={car.srcimg || '/images/cars/default-car.jpg'} 
                  alt={`${car.marque} ${car.modele}`} 
                  className="car-image"
                />
                <div className="car-details">
                  <h2 className="car-title">
                    {car.marque} {car.modele}
                  </h2>
                  
                  <div className="car-info-list">
                    <div className="car-info-item">
                      <CreditCard />
                      <span className="price">{car.prix_par_jour}</span>
                      <span className="price-unit">DH / jour</span>
                    </div>
                    
                    <div className="car-info-item">
                      <MapPin />
                      <span>{car.ville}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reservation form */}
            <div>
              <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                  <label htmlFor="dateDebut" className="form-label">
                    Date de début
                  </label>
                  <div className="input-wrapper">
                    <Calendar />
                    <input
                      id="dateDebut"
                      type="date"
                      value={dateDebut}
                      onChange={e => setDateDebut(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="dateFin" className="form-label">
                    Date de fin
                  </label>
                  <div className="input-wrapper">
                    <Calendar />
                    <input
                      id="dateFin"
                      type="date"
                      value={dateFin}
                      onChange={e => setDateFin(e.target.value)}
                      min={dateDebut || new Date().toISOString().split('T')[0]}
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                {daysCount > 0 && (
                  <div className="summary-box">
                    <div className="summary-row">
                      <span>Prix par jour:</span>
                      <span>{car.prix_par_jour} DH</span>
                    </div>
                    <div className="summary-row">
                      <span>Durée de location:</span>
                      <span>{daysCount} jour{daysCount > 1 ? 's' : ''}</span>
                    </div>
                    <div className="summary-row total">
                      <span>Montant total:</span>
                      <span>{total} DH</span>
                    </div>
                  </div>
                )}

                {existingReservation && (
                  <div className="existing-reservation-warning">
                    <AlertCircle className="warning-icon" />
                    <div className="warning-content">
                      <p>Période déjà réservée :</p>
                      <p className="reservation-dates">
                        Du {new Date(existingReservation.date_debut).toLocaleDateString('fr-FR')} 
                        au {new Date(existingReservation.date_fin).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting || total <= 0}
                  className="btn"
                >
                  {submitting ? (
                    <>
                      <Loader className="spinner" />
                      Traitement en cours...
                    </>
                  ) : (
                    <>
                      Confirmer la réservation
                    </>
                  )}
                </button>
              </form>

              {/* Success message */}
              {success && (
                <div className="status-message success">
                  <CheckCircle />
                  <div>
                    <p>{success}</p>
                    <p className="redirect">Redirection vers votre profil...</p>
                  </div>
                </div>
              )}

              {/* Error message */}
              {error && (
                <div className="status-message error">
                  <AlertCircle />
                  <p>{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <p>Pour toute question concernant votre réservation, contactez notre service client.</p>
      </div>
    </div>
  );
}