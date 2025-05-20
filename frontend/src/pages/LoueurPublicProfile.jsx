import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../utils/axios';
import { FaCar, FaMapMarkerAlt, FaEnvelope, FaPhone, FaBuilding, FaStar } from 'react-icons/fa';
import '../pages/Loueur/LoueurProfile.css';
import './LoueurProfile.css'

const LoueurPublicProfile = () => {
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [commenrender,setCommenrender] = useState(false);
  
  const { id } = useParams();

console.log("token",localStorage.getItem("token"))
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
   axios.get(`http://127.0.0.1:8000/api/comments/${id}`)
   .then((res) => {
    console.log('comments',res.data);
    setComments(res.data);
   })



  }, [id,commenrender]);

  const handlesubmit = async () => {
    // Clear any previous messages
    setSubmitError('');
    setSubmitSuccess(false);
    
    // Validate form
    if (!comment.trim()) {
      setSubmitError('Please enter a comment');
      return;
    }
    
    if (rating === 0) {
      setSubmitError('Please select a rating');
      return;
    }
    
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('Authentication failed - Missing token');
      setSubmitError('You must be logged in to submit a comment');
      return;
    }
    
    try {
      const response = await axios.post('/api/comments', {
        comment: comment.trim(),
        loueur_id: id,
        rating: rating
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      console.log("Success:", response.data);
      setComment('');
      setRating(0);
      setSubmitSuccess(true);
      setCommenrender(!commenrender);
      
      // Refresh the profile to show the new comment without showing loading
      await fetchProfile(false);
      
    } catch (err) {
      console.error('Error submitting comment:', err);
      let errorMessage = 'Failed to submit comment. Please try again.';
      
      if (err.response) {
        // Handle validation errors
        if (err.response.status === 422 && err.response.data.errors) {
          const errors = err.response.data.errors;
          errorMessage = Object.values(errors).flat().join('\n');
        } else if (err.response.data?.message) {
          errorMessage = err.response.data.message;
        }
        console.error('Response data:', err.response.data);
      }
      
      setSubmitError(errorMessage);
    } 
  }
  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, [id]);

  const fetchProfile = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const res = await axios.get(`/api/users/${id}/profile`);
      setUser(res.data);
      if (showLoading) setLoading(false);
    } catch (err) {
      setError('Impossible de charger le profil du loueur');
      if (showLoading) setLoading(false);
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
      <div className="comment-container">
      
        <div className="comment-form-container">
            <h2>Add a Comment</h2>
            {submitError && (
              <div className="alert alert-error" style={{ color: 'red', marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#ffebee', borderRadius: '4px' }}>
                {submitError}
              </div>
            )}
            {submitSuccess && (
              <div className="alert alert-success" style={{ color: 'green', marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#e8f5e9', borderRadius: '4px' }}>
                Comment submitted successfully!
              </div>
            )}
            <form id="commentForm" onSubmit={(e) => { e.preventDefault(); }}>
                <div className="form-group">
                    <label htmlFor="comment">Comment</label>
                    <textarea id="comment" 
                    placeholder="Enter your comment"
                    onChange={(e) => setComment(e.target.value)}
                     required></textarea>
                </div>
                
                <div className="form-group">
                    <label>Rating</label>
                    <div className="stars-container">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                                key={star}
                                className="star"
                                data-value={star}
                                color={star <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(0)}
                                onClick={() => setRating(star)}
                                style={{
                                    cursor: 'pointer',
                                    fontSize: '24px',
                                    marginRight: '4px',
                                    transition: 'color 0.2s'
                                }}
                            />
                        ))}
                    </div>
                </div>
                
                <button 
                  type="button" 
                  className="submit-btn"
                  onClick={handlesubmit}
                >
                  Submit Comment
                </button>
            </form>
        </div>
        
        <div className="comments-display-container">
            <h2>Comments</h2>
            <div className="comments-list" id="commentsList">
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div className="comment-card" key={comment.id}>
                            <div className="comment-header">
                                <h3>{comment.user}</h3>
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
                                    {new Date(comment.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No comments yet. Be the first to leave a review!</p>
                )}
            </div>
        </div>
    </div>
  </div>
  );
};

export default LoueurPublicProfile; 