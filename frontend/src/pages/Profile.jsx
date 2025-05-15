import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Briefcase, Edit2, Check, X, ArrowLeft } from 'lucide-react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', phone: '', EnterpriseName: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Simulate API call for demonstration
    setTimeout(() => {
      const mockUser = {
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean.dupont@example.com',
        phone: '+33 6 12 34 56 78',
        EnterpriseName: 'Dupont Rentals',
        role: 'loueur'
      };
      setUser(mockUser);
      setForm({
        nom: mockUser.nom || '',
        prenom: mockUser.prenom || '',
        email: mockUser.email || '',
        phone: mockUser.phone || '',
        EnterpriseName: mockUser.EnterpriseName || '',
      });
      setLoading(false);
    }, 1000);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setEditMode(true);
    setSuccess('');
    setError('');
  };

  const handleCancel = () => {
    setEditMode(false);
    setForm({
      nom: user.nom || '',
      prenom: user.prenom || '',
      email: user.email || '',
      phone: user.phone || '',
      EnterpriseName: user.EnterpriseName || '',
    });
    setError('');
    setSuccess('');
  };

  const handleSave = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setUser({...form});
      setEditMode(false);
      setSuccess('Profile updated successfully!');
      setLoading(false);
    }, 800);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );
  
  if (!user) return (
    <div className="text-center p-8 bg-gray-50 rounded-lg shadow">
      <div className="text-gray-500">No profile data found.</div>
    </div>
  );

  const getInitials = () => {
    return (user.prenom?.charAt(0) || '') + (user.nom?.charAt(0) || '');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Back button */}
      <div className="mb-6">
        <button className="flex items-center text-purple-600 hover:text-purple-800 transition-colors">
          <ArrowLeft size={18} className="mr-2" />
          Back to Dashboard
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
              
              <div className="px-3 py-1 bg-white/10 rounded-full text-sm flex items-center">
                <Phone size={14} className="mr-2" />
                {user.phone}
              </div>
              
              {user.role === 'loueur' && (
                <div className="px-3 py-1 bg-white/10 rounded-full text-sm flex items-center">
                  <Briefcase size={14} className="mr-2" />
                  {user.EnterpriseName}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Error and success messages */}
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 flex items-center border border-red-200">
          <div className="mr-3 bg-red-100 p-2 rounded-full">
            <X size={18} />
          </div>
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6 flex items-center border border-green-200">
          <div className="mr-3 bg-green-100 p-2 rounded-full">
            <Check size={18} />
          </div>
          {success}
        </div>
      )}

      {/* Profile form */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 md:p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <User className="mr-2" size={20} />
            Profile Information
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
              {editMode ? (
                <input
                  name="nom"
                  value={form.nom}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none"
                />
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg text-gray-800">{user.nom}</div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
              {editMode ? (
                <input
                  name="prenom"
                  value={form.prenom}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none"
                />
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg text-gray-800">{user.prenom}</div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              {editMode ? (
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none"
                />
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg text-gray-800">{user.email}</div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              {editMode ? (
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none"
                />
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg text-gray-800">{user.phone}</div>
              )}
            </div>
            
            {user.role === 'loueur' && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Enterprise Name</label>
                {editMode ? (
                  <input
                    name="EnterpriseName"
                    value={form.EnterpriseName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all outline-none"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg text-gray-800">{user.EnterpriseName}</div>
                )}
              </div>
            )}
          </div>
          
          <div className="mt-8 flex justify-end">
            {editMode ? (
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="px-5 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
                >
                  <X size={18} className="mr-2" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
                >
                  <Check size={18} className="mr-2" />
                  Save Changes
                </button>
              </div>
            ) : (
              <button
                onClick={handleEdit}
                className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
              >
                <Edit2 size={18} className="mr-2" />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;