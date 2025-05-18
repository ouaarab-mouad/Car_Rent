// components/CarCard.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to delete cars');
        return;
      }

      const response = await axios.delete(`http://localhost:8000/api/cars/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (response.status === 200) {
        if (onDelete) onDelete(id);
      } else {
        throw new Error('Failed to delete car');
      }
    } catch (error) {
      console.error('Error deleting car:', error);
      alert(error.response?.data?.message || 'Failed to delete car. You may not have permission.');
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
      <div className="car-image" style={{padding:0}} >
        {srcimg ? (
          <img src={srcimg} alt={modele} className="car-img" style={{width: '450px'}} />
        ) : (
          <div className="car-silhouette" />
        )}
      </div>
      <div className="car-actions">
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
          <button className="delete-button" onClick={() => setShowConfirm(true)}>Delete</button>
          <Link to={`/loueur/modify/${id}`} className="modify-button">View and Modify</Link>
        </div>
      </div>
    </div>
  );
}

export default CarCard;