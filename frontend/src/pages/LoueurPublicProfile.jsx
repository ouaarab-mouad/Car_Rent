import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../utils/axios';
import { FaCar, FaMapMarkerAlt, FaEnvelope, FaPhone, FaBuilding } from 'react-icons/fa';
import '../pages/Loueur/LoueurProfile.css';

const LoueurPublicProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, [id]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/users/${id}/profile`);
      setUser(res.data);
      setLoading(false);
    } catch (err) {
      setError('Impossible de charger le profil du loueur');
      setLoading(false);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!user || user.role !== 'loueur') return <div>Loueur non trouvé.</div>;

  return (
    <div className="profile-container">
      <div className="owner-profile-header">
        <div className="owner-avatar">
          {user.prenom ? user.prenom.charAt(0) : 'U'}
        </div>
        <div className="owner-info">
          <h1 className="owner-name">{user.prenom} {user.nom}</h1>
          <div className="owner-meta">
            <span className="owner-location">
              <FaMapMarkerAlt /> {user.ville || 'Ville inconnue'}
            </span>
            <span className="owner-stats">
              {user.vehicles?.length || 0} voitures
            </span>
          </div>
        </div>
        <div className="owner-contact">
          <div className="contact-info">
            <span className="contact-item">
              <FaPhone /> {user.phone || 'Non disponible'}
            </span>
            <span className="contact-item">
              <FaEnvelope /> {user.email || 'Non disponible'}
            </span>
            {user.EnterpriseName && (
              <span className="contact-item">
                <FaBuilding /> {user.EnterpriseName}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="owner-cars-section">
        <h2 className="section-title">
          <FaCar /> Voitures de {user.prenom}
        </h2>
        {user.vehicles && user.vehicles.length > 0 ? (
          <div className="cars-grid">
            {user.vehicles.map(car => (
              <Link to={`/cars/${car.id}`} key={car.id} className="car-card-link">
                <div className="car-card">
                  <div className="car-image-container">
                    <img 
                      src={`http://127.0.0.1:8000${car.srcimg}` || '/images/cars/default-car.jpg'} 
                      alt={`${car.marque} ${car.modele}`} 
                      className="car-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/cars/default-car.jpg';
                      }}
                    />
                    <div className="car-price-tag">{car.prix_par_jour} DH/J</div>
                  </div>
                  <div className="car-details">
                    <h3 className="car-title">{car.marque} {car.modele}</h3>
                    <p className="car-type">{car.categorie || 'Type inconnu'}</p>
                    <div className="car-features">
                      <span className="feature">
                        <FaMapMarkerAlt /> {car.ville}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="no-cars-message">
            <p>Ce loueur n'a actuellement aucune voiture disponible à la location.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoueurPublicProfile; 