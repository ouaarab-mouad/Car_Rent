import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaUser, FaCalendarAlt, FaGasPump, FaCar, FaCog, FaChevronLeft } from 'react-icons/fa';
import { carData } from '../data/CarData';
import './DetailCar.css';

export const DetailCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the car with the matching ID
    const carId = parseInt(id);
    const foundCar = carData.find(car => car.id === carId);
    
    if (foundCar) {
      // Ensure image path is properly formatted
      const carWithFormattedImage = {
        ...foundCar,
        image: foundCar.image.startsWith('http') ? 
          foundCar.image : 
          process.env.PUBLIC_URL + '/' + foundCar.image
      };
      setCar(carWithFormattedImage);
    }
    setLoading(false);
  }, [id]);

  const handleReservation = () => {
    // Navigate to reservation page with car ID
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
        <Link to="/search" className="back-to-search">Retour à la recherche</Link>
      </div>
    );
  }

  return (
    <div className="detail-car-container">
      <div className="detail-car-nav">
        <Link to="/search" className="back-link">
          <FaChevronLeft /> Retour aux résultats
        </Link>
      </div>
      
      <div className="detail-car-header">
        <h1>{car.brand} {car.name}</h1>
        <span className="detail-car-type">{car.type}</span>
      </div>
      
      <div className="detail-car-content">
        <div className="detail-car-image-section">
          <div className="detail-car-image-container">
            <img 
              src={car.image} 
              alt={`${car.brand} ${car.name}`}
              className="detail-car-image" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = process.env.PUBLIC_URL + '/images/cars/default-car.jpg';
              }}
            />
          </div>
          <div className="detail-car-price">
            <span className="price-label">Prix journalier</span>
            <span className="price-value">{car.price} MAD</span>
          </div>
        </div>
        
        <div className="detail-car-info">
          <div className="detail-car-main-info">
            <div className="info-group vehicle-info">
              <h3><FaCar /> Information du véhicule</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Marque</span>
                  <span className="info-value">{car.brand}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Localisation</span>
                  <span className="info-value">
                    <FaMapMarkerAlt className="info-icon" /> {car.location}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Couleur</span>
                  <span className="info-value">
                    <span 
                      className="color-sample" 
                      style={{ 
                        backgroundColor: getColorCode(car.color),
                        marginRight: '8px'
                      }}
                    ></span>
                    {car.color}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Catégorie</span>
                  <span className="info-value">
                    {car.category.map((cat, index) => (
                      <span key={index} className="category-tag">
                        {cat}
                      </span>
                    ))}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">État</span>
                  <span className={`info-value condition-badge ${car.condition.toLowerCase()}`}>
                    {car.condition}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Places</span>
                  <span className="info-value">{car.seats} sièges</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Transmission</span>
                  <span className="info-value">
                    <FaCog className="info-icon" /> {car.transmission}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Carburant</span>
                  <span className="info-value">
                    <FaGasPump className="info-icon" /> {car.fuelType}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="info-group rental-info">
              <h3>Information de location</h3>
              <div className="rental-details">
                <div className="info-item rental-person">
                  <span className="info-label">Loué par</span>
                  <Link to={`/profile/${encodeURIComponent(car.rentedBy)}`} className="owner-link">
                    <FaUser className="info-icon" />
                    <span className="info-value owner-name">{car.rentedBy}</span>
                  </Link>
                </div>
                <div className="info-item">
                  <span className="info-label">Période</span>
                  <span className="info-value">
                    <FaCalendarAlt className="info-icon" /> {car.date}
                  </span>
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
            <a href={`tel:+212600000000`} className="contact-button">
              Contacter le propriétaire
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get color codes
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
  
  return colorMap[colorName] || '#CCCCCC'; // Default gray if color not found
};

