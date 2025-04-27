// CarManagement.js
import React, { useEffect, useState } from 'react';
import CarListings from './components/CarListings';
import './App.css';
import axios from 'axios';

function CarManagement() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user/1/cars');
        setCars(response.data);
      } catch (err) {
        setError('Erreur lors du chargement des voitures.');
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  if (loading) return <div className="car-management"><div className="container"><p>Chargement...</p></div></div>;
  if (error) return <div className="car-management"><div className="container"><p>{error}</p></div></div>;

  return (
    <div className="car-management">
      <div className="container">
        <h1 id="page-title" className="page-title">my listing</h1>
        <CarListings
          cars={cars}
          onDelete={(deletedId) => setCars((prev) => prev.filter((c) => c.id !== deletedId))}
        />
      </div>
    </div>
  );
}

export default CarManagement;