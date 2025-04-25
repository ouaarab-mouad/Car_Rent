// src/pages/Profile.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaCar, FaPlus, FaMapMarkerAlt, FaPhone, FaEnvelope, FaStar, FaChevronLeft } from "react-icons/fa";
import { carData } from "../data/CarData";
import "./Profile.css";

export const Profile = () => {
  const { id } = useParams();
  const [visibleCars, setVisibleCars] = useState(6);
  const [ownerData, setOwnerData] = useState({
    name: "",
    location: "",
    rating: 0,
    totalCars: 0,
    memberSince: "2023",
    cars: []
  });

  useEffect(() => {
    // Filter cars by owner and fix image paths
    const cars = carData
      .filter(car => car.rentedBy === decodeURIComponent(id))
      .map(car => ({
        ...car,
        image: process.env.PUBLIC_URL + '/' + car.image // Prepend public URL
      }));

    if (cars.length > 0) {
      setOwnerData({
        name: cars[0].rentedBy,
        location: cars[0].location,
        rating: calculateAverageRating(cars),
        totalCars: cars.length,
        memberSince: "2023",
        cars: cars
      });
    }
  }, [id]);

  const calculateAverageRating = (cars) => {
    // In a real app, this would come from backend
    const ratings = {
      "Exellent": 5,
      "Good": 4,
      "Bad": 2
    };
    const total = cars.reduce((sum, car) => sum + ratings[car.condition], 0);
    return (total / cars.length).toFixed(1);
  };

  const loadMoreCars = () => {
    setVisibleCars(prev => prev + 6);
  };

  const renderRatingStars = () => {
    const stars = [];
    const fullStars = Math.floor(ownerData.rating);
    const hasHalfStar = ownerData.rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="rating-star filled" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="rating-star half-filled" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="rating-star" />);
    }

    return stars;
  };

  return (
    <div className="profile-container">
      <div className="back-button-container">
        <Link to="/" className="back-button">
          <FaChevronLeft /> Retour à la liste
        </Link>
      </div>

      {/* Owner Profile Header */}
      <div className="owner-profile-header">
        <div className="owner-avatar">
          {ownerData.name.charAt(0)}
        </div>
        <div className="owner-info">
          <h1 className="owner-name">{ownerData.name}</h1>
          <div className="owner-meta">
            <span className="owner-location">
              <FaMapMarkerAlt /> {ownerData.location}
            </span>
            <span className="owner-rating">
              {renderRatingStars()} {ownerData.rating}
            </span>
            <span className="owner-stats">
              {ownerData.totalCars} voitures • Membre depuis {ownerData.memberSince}
            </span>
          </div>
        </div>
        <div className="owner-contact">
          <button className="contact-button phone">
            <FaPhone /> Appeler
          </button>
          <button className="contact-button message">
            <FaEnvelope /> Message
          </button>
        </div>
      </div>

      {/* Owner's Cars Section */}
      <div className="owner-cars-section">
        <h2 className="section-title">
          <FaCar /> Voitures disponibles ({ownerData.totalCars})
        </h2>
        
        <div className="cars-grid">
          {ownerData.cars.slice(0, visibleCars).map(car => (
            <div key={car.id} className="car-card">
              <div className="car-image-container">
                <img 
                  src={car.image} 
                  alt={`${car.brand} ${car.name}`} 
                  className="car-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = process.env.PUBLIC_URL + '/images/cars/default-car.jpg';
                  }}
                />
                <div className="car-price-tag">{car.price} DH/J</div>
                <div className={`car-badge ${car.condition.toLowerCase()}`}>
                  {car.condition}
                </div>
              </div>
              <div className="car-details">
                <h3 className="car-title">{car.brand} {car.name}</h3>
                <p className="car-type">{car.type}</p>
                <div className="car-features">
                  <span className="feature">
                    <FaMapMarkerAlt /> {car.location}
                  </span>
                  <span className="feature">{car.transmission}</span>
                  <span className="feature">{car.seats} places</span>
                </div>
                <div className="car-availability">
                  <span>{car.date}</span>
                </div>
                <button className="rent-button">Réserver maintenant</button>
              </div>
            </div>
          ))}
        </div>

        {ownerData.cars.length > visibleCars && (
          <button className="load-more-button" onClick={loadMoreCars}>
            <FaPlus /> Voir plus de voitures
          </button>
        )}

        {ownerData.cars.length === 0 && (
          <div className="no-cars-message">
            <p>Ce propriétaire n'a actuellement aucune voiture disponible à la location.</p>
          </div>
        )}
      </div>
    </div>
  );
};