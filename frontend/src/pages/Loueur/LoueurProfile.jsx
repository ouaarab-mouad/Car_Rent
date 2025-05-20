import React, { useEffect, useState } from 'react';
import { FaCar, FaMapMarkerAlt, FaPhone, FaEnvelope, FaStar, FaBuilding, FaUser, FaMoneyBillWave } from 'react-icons/fa';
import axios from '../../utils/axios';
import './LoueurProfile.css';
import { Link } from 'react-router-dom';
import '../../pages/LoueurProfile.css';

const LoueurProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [error, setError] = useState('');
  const [commentsError, setCommentsError] = useState('');
  const [visibleCars, setVisibleCars] = useState(6);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchLoueurProfile();
  }, []);

  const fetchComments = async () => {
    if (!user?.id) {
      console.log('No user ID available from profile');
      return;
    }
    
    setCommentsLoading(true);
    setCommentsError('');
    try {
      console.log('Fetching comments for user ID:', user.id);
      const res = await axios.get(`/api/comments/${user.id}`);
      console.log('Comments response:', res.data);
      console.log('Comments array length:', res.data.length);
      setComments(res.data);
    } catch (err) {
      console.error('Error fetching comments:', err.response?.data || err.message);
      setCommentsError('Failed to load comments. Please try again later.');
    } finally {
      setCommentsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchComments();
    }
  }, [user?.id]);

  const fetchLoueurProfile = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/loeur/profile');
      console.log('Loueur Profile Data:', res.data);
      console.log('Cars Data:', res.data.vehicles);
      setUser(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to load loueur profile');
      setLoading(false);
    }
  };

  const loadMoreCars = () => {
    setVisibleCars(prev => prev + 6);
  };

  const renderRatingStars = (rating = 4.5) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

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

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Chargement du profil...</p>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <h3>Erreur</h3>
      <p>{error}</p>
      <button onClick={fetchLoueurProfile} className="retry-button">Réessayer</button>
    </div>
  );
  
  if (!user) return (
    <div className="no-data-container">
      <h3>Aucun profil trouvé</h3>
      <p>Aucune information de profil disponible.</p>
    </div>
  );

  return (
    <div className="profile-container">
      {/* Owner Profile Header */}
      <div className="owner-profile-header">
        <div className="owner-avatar">
          {user.prenom ? user.prenom.charAt(0) : 'U'}
        </div>
        <div className="owner-info">
          <h1 className="owner-name">{user.prenom} {user.nom}</h1>
          <div className="owner-meta">
            {user.ville && (
              <span className="owner-location">
                <FaMapMarkerAlt /> {user.ville}
              </span>
            )}
            <span className="owner-rating">
              {renderRatingStars()} 4.5
            </span>
            <span className="owner-stats">
              {user.vehicles?.length || 0} voitures • Membre depuis {new Date().getFullYear()}
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

      {/* Owner's Cars Section */}
      <div className="owner-cars-section">
        <h2 className="section-title">
          <FaCar /> Mes Voitures ({user.vehicles?.length || 0})
        </h2>
        
        {user.vehicles && user.vehicles.length > 0 ? (
          <>
            <div className="cars-grid">
              {user.vehicles.slice(0, visibleCars).map(car => (
                <Link to={`/cars/${car.id}`} key={car.id} className="car-card-link">
                  <div className="car-card">
                    <div className="car-image-container">
                      <img 
                        src={car.srcimg ? `http://localhost:8000${car.srcimg}` : '/images/cars/default-car.jpg'} 
                        alt={`${car.marque} ${car.modele}`} 
                        className="car-image"
                        onError={(e) => {
                          console.error('Image failed to load:', e.target.src);
                          e.target.onerror = null;
                          e.target.src = '/images/cars/default-car.jpg';
                        }}
                      />
                      <div className="car-price-tag">{car.prix_par_jour} DH/J</div>
                      <div className={`car-badge ${car.condition?.toLowerCase() || 'good'}`}>
                        {car.condition || 'Good'}
                      </div>
                    </div>
                    <div className="car-details">
                      <h3 className="car-title">{car.marque} {car.modele}</h3>
                      <p className="car-type">{car.type || 'Sedan'}</p>
                      <div className="car-features">
                        <span className="feature">
                          <FaMapMarkerAlt /> {car.ville}
                        </span>
                        <span className="feature">{car.transmission || 'Manuel'}</span>
                        <span className="feature">{car.seats || 5} places</span>
                      </div>
                      <div className="car-availability">
                        <span>{car.disponibilite || 'Disponible maintenant'}</span>
                      </div>
                      <div className="car-actions">
                        <button className="edit-button">Modifier</button>
                        <button className="delete-button">Supprimer</button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {user.vehicles.length > visibleCars && (
              <button className="load-more-button" onClick={loadMoreCars}>
                Voir plus de voitures ({user.vehicles.length - visibleCars})
              </button>
            )}
          </>
        ) : (
          <div className="no-cars-message">
            <p>Vous n'avez actuellement aucune voiture disponible à la location.</p>
            <button className="add-car-btn">
              <FaCar /> Ajouter une voiture
            </button>
          </div>
        )}
      </div>
        {/* Comments Section */}
        <div className="profile-section">
          <div className="section-header">
            <h2 className="section-title">
              <FaStar /> Avis des clients
            </h2>
          </div>
          
          {commentsLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Chargement des commentaires...</p>
            </div>
          ) : commentsError ? (
            <div className="error-message">
              {commentsError}
              <button onClick={fetchComments} className="retry-button">
                Réessayer
              </button>
            </div>
          ) : comments && comments.length > 0 ? (
            <div className="comments-grid">
              {comments.map((comment) => (
                <div className="comment-card" key={comment.id}>
                  <div className="comment-header">
                    <div className="comment-user">
                      <div className="user-avatar">
                        {comment.user ? comment.user.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <h3 className="user-name">{comment.user || 'Utilisateur anonyme'}</h3>
                    </div>
                    <div className="comment-rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          color={star <= comment.etoiles ? "#ffc107" : "#e4e5e9"}
                          style={{
                            fontSize: '14px',
                            marginRight: '2px',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="comment-text">{comment.description}</p>
                  <div className="comment-footer">
                    <span className="comment-date">
                      {new Date(comment.created_at).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-comments">
              <p>Aucun commentaire pour le moment.</p>
            </div>
          )}
        </div>
    </div>
  );
};

export default LoueurProfile;