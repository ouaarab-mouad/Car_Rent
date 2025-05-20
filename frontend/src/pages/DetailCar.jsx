import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaUser, FaCalendarAlt, FaGasPump, FaCar, FaCog, FaChevronLeft } from 'react-icons/fa';
import axios from 'axios';
import './DetailCar.css';

const getColorCode = (colorName) => {
  const colorMap = {
    'Blanc': '#FFFFFF',
    'Noir': '#000000',
    'Rouge': '#FF0000',
    'Bleu': '#0000FF',
    'Gris': '#808080',
    'Argent': '#C0C0C0',
    'Beige': '#F5F5DC',
    'Vert': '#008000',
    'Jaune': '#FFFF00',
    'Orange': '#FFA500'
  };
  return colorMap[colorName] || '#CCCCCC';
};

const DetailCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:8000/api/voitures/${id}`);
        console.log('Car details response:', res.data);
        if (res.data.success) {
          setCar(res.data.data);
        } else {
          console.error('Error in response:', res.data.message);
          setCar(null);
        }
      } catch (err) {
        console.error('Error fetching car details:', err);
        setCar(null);
      }
      setLoading(false);
    };
    fetchCar();
  }, [id]);

  const handleReservation = () => {
    navigate(`/reservation/${id}`);
  };

  if (loading) {
    return (
      <div className="detail-car-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des détails de la voiture...</p>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="detail-car-error">
        <h2>Voiture non trouvée!</h2>
        <p>La voiture que vous recherchez n'existe pas ou a été supprimée.</p>
        <Link to="/listing" className="back-to-search">Retour à la recherche</Link>
      </div>
    );
  }
  console.log('Car details:', car);

  return (
    <div className="detail-car-container">
      <div className="detail-car-nav">
        <Link to="/listing" className="back-link">
          <FaChevronLeft /> Retour aux résultats
        </Link>
      </div>
      <div className="detail-car-header">
        <h1>{car.marque} {car.modele}</h1>
        <span className="detail-car-type">{car.categorie}</span>
      </div>
      <div className="detail-car-content">
        <div className="detail-car-image-section">
          <div className="detail-car-image-container">
            <img 
              src={car.srcimg || '/images/cars/default-car.jpg'} 
              alt={`${car.marque} ${car.modele}`}
              className="detail-car-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/cars/default-car.jpg';
              }}
            />
          </div>
          <div className="detail-car-price">
            <span className="price-label">Prix journalier</span>
            <span className="price-value">{car.prix_par_jour} MAD</span>
          </div>
        </div>
        <div className="detail-car-info">
          <div className="detail-car-main-info">
            <div className="info-group vehicle-info">
              <h3><FaCar /> Information du véhicule</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Marque</span>
                  <span className="info-value">{car.marque}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Localisation</span>
                  <span className="info-value">
                    <FaMapMarkerAlt className="info-icon" /> {car.ville}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Catégorie</span>
                  <span className="info-value">{car.categorie}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">État</span>
                  <span className={`info-value condition-badge`}>
                    {car.status}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Places</span>
                  <span className="info-value">{car.seats || 5} sièges</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Transmission</span>
                  <span className="info-value">
                    <FaCog className="info-icon" /> {car.conditions?.transmission || 'Manuel'}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Carburant</span>
                  <span className="info-value">
                    <FaGasPump className="info-icon" /> {car.conditions?.carburant || 'Essence'}
                  </span>
                </div>
              </div>
            </div>

            {/* Car Features Section */}
            <div className="info-group features-info">
              <h3><FaCar /> Caractéristiques</h3>
              <div className="features-container">
                {car.conditions && Object.entries(car.conditions).map(([feature, value]) => (
                  <div key={feature} className={`feature-badge ${value ? 'active' : 'inactive'}`}>
                    <i className={`fas fa-${value ? 'check' : 'times'}-circle`}></i>
                    <span>{feature.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="info-group rental-info">
              <h3>Information de location</h3>
              <div className="rental-details">
                <div className="info-item rental-person">
                  <span className="info-label">Loué par</span>
                  <Link to={`/loueur/public/${car.utilisateur.id}`} className="owner-link">
                    <FaUser className="info-icon" />
                    <span className="info-value owner-name">{car.utilisateur?.nom} {car.utilisateur?.prenom}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="detail-car-actions">
            <button 
              className="reservation-button"
              onClick={handleReservation}
            >
              Réserver maintenant
            </button>
            <a href={`tel:${car.utilisateur?.phone || '+212600000000'}`} className="contact-button">
              Contacter le propriétaire
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCar; 