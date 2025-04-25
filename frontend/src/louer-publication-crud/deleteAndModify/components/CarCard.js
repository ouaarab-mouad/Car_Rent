// components/CarCard.js
import React, { useState } from 'react';
import axios from 'axios';
import './CarCard.css';

function CarCard({ car, onDelete }) {
  // Extract fields from the car object
  const {
    id,
    modele,
    marque,
    categorie,
    ville,
    prix_par_jour,
    conditions,
    srcimg
  } = car;

  // srcimg is now a full URL returned from the backend

  // Delete car handler
  const [showConfirm, setShowConfirm] = useState(false);
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/cars/${id}`);
      if (onDelete) onDelete(id);
    } catch (error) {
      console.error('Error deleting car:', error);
      alert('Failed to delete car.');
    } finally {
      setShowConfirm(false);
    }
  };

  // Show only three main features: airConditioner, automatic, airbag
  const mainFeatures = [
    { key: 'airConditioner', label: 'Air Conditioner', icon: '❄️' },
    { key: 'automatic', label: 'Automatic', icon: '⚙️' },
    { key: 'airbag', label: 'Airbag', icon: '🛡️' }
  ];
  console.log('img', srcimg);

  return (
    <div className="car-card">
      <div className="car-image">
        {srcimg ? (
          <img src={srcimg} alt={modele} className="car-img" />
        ) : (
          <div className="car-silhouette" />
        )}
        {showConfirm && (
          <div className="confirm-dialog">
            <p>Are you sure you want to delete this car?</p>
            <button className="confirm-yes" onClick={handleDelete}>Yes</button>
            <button className="confirm-no" onClick={() => setShowConfirm(false)}>No</button>
          </div>
        )}
      </div>
      <div className="car-info">
        <div className="car-header">
          <div className="car-details">
            <h3>{marque} {modele}</h3>
            <p className="car-type">{categorie} - {ville}</p>
          </div>
          <div className="car-price">
            <span className="price">{prix_par_jour} DH</span>
            <span className="period">par jour</span>
          </div>
        </div>
        <div className="car-features">
          {mainFeatures.map((feature, index) =>
            conditions && conditions[feature.key] ? (
              <div key={index} className="feature">
                <span className="feature-icon">{feature.icon}</span>
                <span className="feature-text">{feature.label}</span>
              </div>
            ) : null
          )}
        </div>
        <div className="car-actions">
          <button className="delete-button" onClick={() => setShowConfirm(true)}>delete</button>
          <button className="modify-button">view and modify</button>
        </div>
      </div>
    </div>
  );
}

export default CarCard;