// CarManagement.js
import React, { useEffect, useState } from 'react';
import CarListings from './components/CarListings';
import './App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CarManagement() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please log in to view your cars');
          return;
        }

        const response = await axios.get('http://localhost:8000/api/user/cars', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });
        
        if (response.status === 200) {
          setCars(response.data);
        } else {
          throw new Error('Failed to fetch cars');
        }
      } catch (err) {
        console.error('Error fetching cars:', err);
        if (err.response?.status === 401) {
          setError('Please log in to view your cars');
        } else if (err.response?.status === 403) {
          setError('You do not have permission to view these cars');
        } else if (err.response?.status === 404) {
          setError('No cars found');
        } else {
          setError('Error loading cars. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  if (loading) {
    return (
      <div className="car-management loading">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading your cars...</p>
          </div>
        </div>
      </div>
    );
  }

  const handleDelete = (deletedId) => {
    setCars((prev) => prev.filter((c) => c.id !== deletedId));
  };

  if (error) return <div className="car-management"><div className="container"><p className="error-message">{error}</p></div></div>;

  return (
    <div className="car-management">
      <div className="container">
        <div className="car-management-header">
          <h1 className="page-title">My Listings</h1>
          <Link 
            to="/loueur/addcar"
            className="add-car-button"
          >
            <span className="plus-icon">+</span> Ajouter une voiture
          </Link>
        </div>
        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <CarListings cars={cars} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}

export default CarManagement;