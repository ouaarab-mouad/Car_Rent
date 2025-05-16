import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../utils/axios';
import { User, Mail, Briefcase, Car, MapPin, CreditCard, ArrowLeft } from 'lucide-react';

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

  const getInitials = () => {
    return (user?.prenom?.charAt(0) || '') + (user?.nom?.charAt(0) || '');
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );

  if (error) return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-center border border-red-200">
        <div className="mr-3 bg-red-100 p-2 rounded-full">
          <span className="block h-5 w-5">×</span>
        </div>
        {error}
      </div>
    </div>
  );

  if (!user) return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="text-center p-8 bg-gray-50 rounded-lg shadow">
        <div className="text-gray-500">No profile data found.</div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Back button */}
      <div className="mb-6">
        <button className="flex items-center text-purple-600 hover:text-purple-800 transition-colors">
          <ArrowLeft size={18} className="mr-2" />
          Back to Listings
        </button>
      </div>

      {/* Profile header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-500 rounded-2xl p-6 md:p-8 text-white shadow-lg mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold border-4 border-white">
            {getInitials()}
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              {user.prenom} {user.nom}
            </h1>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
              <div className="px-3 py-1 bg-white/10 rounded-full text-sm flex items-center">
                <Mail size={14} className="mr-2" />
                {user.email}
              </div>
              
              {user.phone && (
                <div className="px-3 py-1 bg-white/10 rounded-full text-sm flex items-center">
                  <User size={14} className="mr-2" />
                  {user.role === 'loueur' ? 'Rental Provider' : 'Customer'}
                </div>
              )}
              
              {user.role === 'loueur' && user.EnterpriseName && (
                <div className="px-3 py-1 bg-white/10 rounded-full text-sm flex items-center">
                  <Briefcase size={14} className="mr-2" />
                  {user.EnterpriseName}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile info */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 md:p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <User className="mr-2" size={20} />
            Public Profile Information
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
              <div className="p-3 bg-gray-50 rounded-lg text-gray-800">{user.nom}</div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
              <div className="p-3 bg-gray-50 rounded-lg text-gray-800">{user.prenom}</div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="p-3 bg-gray-50 rounded-lg text-gray-800">{user.email}</div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <div className="p-3 bg-gray-50 rounded-lg text-gray-800 capitalize">
                {user.role === 'loueur' ? 'Rental Provider' : user.role}
              </div>
            </div>
            
            {user.role === 'loueur' && user.EnterpriseName && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Enterprise Name</label>
                <div className="p-3 bg-gray-50 rounded-lg text-gray-800">{user.EnterpriseName}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Vehicle listings section for rental providers */}
      {user.role === 'loueur' && user.vehicles && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden mt-8">
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <Car className="mr-2" size={20} />
              Available Vehicles
            </h2>
            {user.vehicles.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {user.vehicles.map(car => (
                  <Link to={`/cars/${car.id}`} key={car.id} className="block bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="h-40 bg-gray-200 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                      <img
                        src={car.srcimg ? `http://127.0.0.1:8000${car.srcimg}` : '/images/cars/default-car.jpg'}
                        alt={`${car.marque} ${car.modele}`}
                        className="object-cover w-full h-full"
                        onError={e => { e.target.onerror = null; e.target.src = '/images/cars/default-car.jpg'; }}
                      />
                    </div>
                    <h3 className="font-medium text-lg">{car.marque} {car.modele}</h3>
                    <div className="flex items-center text-gray-600 text-sm mt-2">
                      <MapPin size={14} className="mr-1" />
                      {car.ville}
                    </div>
                    <div className="flex items-center text-purple-600 font-medium mt-2">
                      <CreditCard size={14} className="mr-1" />
                      {car.prix_par_jour} DH/day
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 bg-gray-50 rounded-lg">
                <Car size={40} className="mx-auto text-gray-400 mb-3" />
                <div className="text-gray-500">No vehicles available at the moment.</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicProfile;