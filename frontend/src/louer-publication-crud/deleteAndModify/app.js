// CarManagement.js
import React, { useEffect, useState } from 'react';
import CarListings from './components/CarListings';
import './styles/CarManagement.css';
import axios from 'axios';

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

  if (loading) return <div className="car-management"><div className="container"><p>Chargement...</p></div></div>;

  const handleAddCar = () => {
    window.location.href = '/loueur/addcar';
  };

  const handleDelete = (deletedId) => {
    setCars((prev) => prev.filter((c) => c.id !== deletedId));
  };

  if (error) return <div className="car-management"><div className="container"><p>{error}</p></div></div>;

  return (
    <div className="car-management">
      <div className="container">
        <div className="car-management-header">
          <h1 id="page-title" className="page-title">my listing</h1>
          <button 
            className="add-car-button"
            onClick={handleAddCar}
          >
            <span className="plus-icon">+</span> Ajouter une voiture
          </button>
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