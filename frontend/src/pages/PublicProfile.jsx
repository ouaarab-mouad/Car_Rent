import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../utils/axios';

const PublicProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPublicProfile();
    // eslint-disable-next-line
  }, [id]);

  const fetchPublicProfile = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/users/${id}/profile`);
      setUser(res.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load public profile');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>No profile data found.</div>;

  return (
    <div className="public-profile-container">
      <h2>Public Profile</h2>
      <div><strong>Nom:</strong> {user.nom}</div>
      <div><strong>Prénom:</strong> {user.prenom}</div>
      <div><strong>Email:</strong> {user.email}</div>
      <div><strong>Role:</strong> {user.role}</div>
      {user.EnterpriseName && <div><strong>Enterprise Name:</strong> {user.EnterpriseName}</div>}
      {user.role === 'loueur' && user.vehicles && (
        <>
          <h3>Cars</h3>
          {user.vehicles.length > 0 ? (
            <ul>
              {user.vehicles.map(car => (
                <li key={car.id}>
                  {car.marque} {car.modele} - {car.ville} - {car.prix_par_jour} DH/day
                </li>
              ))}
            </ul>
          ) : (
            <div>No cars found.</div>
          )}
        </>
      )}
    </div>
  );
};

export default PublicProfile; 