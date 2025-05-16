import React, { useEffect, useState } from 'react';
import { CalendarDays, Car, Clock, CreditCard, Loader2, User, Check, X, AlertTriangle } from 'lucide-react';
import axios from 'axios';

export default function ProfessionalReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [notification, setNotification] = useState(null);
  const [actionInProgress, setActionInProgress] = useState(false);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8000/api/loueur/reservations', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setReservations(res.data);
        setLoading(false);
      } catch (err) {
        let message = 'Impossible de charger les réservations.';
        if (err.response) {
          message += ` (Status: ${err.response.status})`;
          if (err.response.data && err.response.data.message) {
            message += ` - ${err.response.data.message}`;
          }
        } else if (err.request) {
          message += ' (Le serveur ne répond pas)';
        } else {
          message += ` (${err.message})`;
        }
        setError(message);
        console.error('Reservations API error:', err);
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleAction = async (id, action) => {
    try {
      setActionInProgress(true);
      const token = localStorage.getItem('token');
      const url = `http://localhost:8000/api/loueur/reservations/${id}/${action}`;
      await axios.post(url, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Update local state
      setReservations(prev => prev.map(res =>
        res.id === id ? { ...res, statut: action === 'accept' ? 'acceptée' : 'refusée' } : res
      ));
      
      // Show notification
      setNotification({
        type: action === 'accept' ? 'success' : 'info',
        message: action === 'accept' 
          ? 'Réservation acceptée avec succès' 
          : 'Réservation refusée'
      });
      
      // Auto-dismiss notification
      setTimeout(() => setNotification(null), 4000);
    } catch (err) {
      let errorMessage = `Échec de l'opération (${action}).`;
      if (err.response) {
        errorMessage += ` (Status: ${err.response.status})`;
        if (err.response.data && err.response.data.message) {
          errorMessage += ` - ${err.response.data.message}`;
        }
      } else if (err.request) {
        errorMessage += ' (Le serveur ne répond pas)';
      } else {
        errorMessage += ` (${err.message})`;
      }
      
      setNotification({
        type: 'error',
        message: errorMessage
      });
      console.error('Action API error:', err);
    } finally {
      setActionInProgress(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const getFilteredReservations = () => {
    if (activeTab === 'all') return reservations;
    return reservations.filter(res => {
      if (activeTab === 'pending') return res.statut === 'en_attente';
      if (activeTab === 'accepted') return res.statut === 'acceptée';
      if (activeTab === 'rejected') return res.statut === 'refusée';
      return true;
    });
  };

  const getTotalStats = () => {
    const total = reservations.length;
    const pending = reservations.filter(r => r.statut === 'en_attente').length;
    const accepted = reservations.filter(r => r.statut === 'acceptée').length;
    const rejected = reservations.filter(r => r.statut === 'refusée').length;
    
    return { total, pending, accepted, rejected };
  };

  const stats = getTotalStats();
  const filteredReservations = getFilteredReservations();

  const getStatusBadgeClasses = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    
    switch(status) {
      case 'en_attente':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'acceptée':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'refusée':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'en_attente': return 'En attente';
      case 'acceptée': return 'Acceptée';
      case 'refusée': return 'Refusée';
      default: return status;
    }
  };

  if (loading && reservations.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
          <p className="text-gray-700 font-medium">Chargement des réservations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-lg w-full">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-8 w-8 text-red-500" />
            <h2 className="text-lg font-semibold text-red-800">Erreur</h2>
          </div>
          <p className="mt-3 text-red-700">{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={() => window.location.reload()}
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm w-full flex items-center space-x-3 
          ${notification.type === 'success' ? 'bg-green-50 border border-green-200' : 
            notification.type === 'error' ? 'bg-red-50 border border-red-200' : 
            'bg-blue-50 border border-blue-200'}`}
        >
          {notification.type === 'success' ? (
            <Check className="h-5 w-5 text-green-500" />
          ) : notification.type === 'error' ? (
            <AlertTriangle className="h-5 w-5 text-red-500" />
          ) : (
            <Clock className="h-5 w-5 text-blue-500" />
          )}
          <p className={`text-sm font-medium ${
            notification.type === 'success' ? 'text-green-800' : 
            notification.type === 'error' ? 'text-red-800' : 
            'text-blue-800'
          }`}>{notification.message}</p>
          <button 
            onClick={() => setNotification(null)}
            className="ml-auto text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mes Réservations</h1>
            <p className="mt-1 text-gray-600">Gérez les demandes de réservation pour vos véhicules</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="inline-flex items-center px-3 py-1 rounded-md bg-blue-50 text-blue-700">
              <Clock className="h-5 w-5 mr-2" />
              <span className="font-medium">Date: {new Date().toLocaleDateString('fr-FR')}</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center border border-gray-100">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <CalendarDays className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Réservations</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center border border-gray-100">
            <div className="rounded-full bg-yellow-100 p-3 mr-4">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">En Attente</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center border border-gray-100">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Acceptées</p>
              <p className="text-2xl font-bold text-gray-900">{stats.accepted}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center border border-gray-100">
            <div className="rounded-full bg-red-100 p-3 mr-4">
              <X className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Refusées</p>
              <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`py-3 px-1 font-medium text-sm border-b-2 ${
                activeTab === 'all' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Toutes ({stats.total})
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`py-3 px-1 font-medium text-sm border-b-2 ${
                activeTab === 'pending' 
                  ? 'border-yellow-500 text-yellow-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              En attente ({stats.pending})
            </button>
            <button
              onClick={() => setActiveTab('accepted')}
              className={`py-3 px-1 font-medium text-sm border-b-2 ${
                activeTab === 'accepted' 
                  ? 'border-green-500 text-green-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Acceptées ({stats.accepted})
            </button>
            <button
              onClick={() => setActiveTab('rejected')}
              className={`py-3 px-1 font-medium text-sm border-b-2 ${
                activeTab === 'rejected' 
                  ? 'border-red-500 text-red-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Refusées ({stats.rejected})
            </button>
          </nav>
        </div>

        {/* Reservations List */}
        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
            <span className="ml-2 text-gray-600">Mise à jour...</span>
          </div>
        )}

        {!loading && filteredReservations.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-gray-100">
            <CalendarDays className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">Aucune réservation trouvée</h3>
            <p className="text-gray-500">
              {activeTab === 'all' 
                ? "Vous n'avez actuellement aucune réservation." 
                : `Aucune réservation "${
                    activeTab === 'pending' ? 'en attente' : 
                    activeTab === 'accepted' ? 'acceptée' : 'refusée'
                  }" trouvée.`}
            </p>
          </div>
        )}

        {!loading && filteredReservations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReservations.map(res => (
              <div key={res.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 transition-all hover:shadow-md">
                <div className="relative">
                  <img 
                    src={res.voiture.srcimg} 
                    alt={`${res.voiture.marque} ${res.voiture.modele}`} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={getStatusBadgeClasses(res.statut)}>
                      {getStatusLabel(res.statut)}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {res.voiture.marque} {res.voiture.modele}
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-700">
                      <User className="h-4 w-4 mr-2 text-gray-400" />
                      <span>
                        {res.client.prenom} {res.client.nom}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-700">
                      <CalendarDays className="h-4 w-4 mr-2 text-gray-400" />
                      <span>
                        Du {formatDate(res.date_debut)} au {formatDate(res.date_fin)}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-700">
                      <CreditCard className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="font-medium">
                        {res.prix_total.toLocaleString()} DH
                      </span>
                    </div>
                  </div>
                  
                  {res.statut === 'en_attente' && (
                    <div className="flex space-x-3 mt-6">
                      <button 
                        onClick={() => handleAction(res.id, 'accept')}
                        disabled={actionInProgress}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                      >
                        {actionInProgress ? (
                          <span className="flex items-center justify-center">
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Traitement...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center">
                            <Check className="h-4 w-4 mr-2" />
                            Accepter
                          </span>
                        )}
                      </button>
                      <button 
                        onClick={() => handleAction(res.id, 'refuse')}
                        disabled={actionInProgress}
                        className="flex-1 bg-white border border-red-600 text-red-600 hover:bg-red-50 py-2 px-4 rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                      >
                        {actionInProgress ? (
                          <span className="flex items-center justify-center">
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Traitement...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center">
                            <X className="h-4 w-4 mr-2" />
                            Refuser
                          </span>
                        )}
                      </button>
                    </div>
                  )}
                  
                  {res.statut === 'acceptée' && (
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <div className="flex items-center text-green-600">
                        <Check className="h-5 w-5 mr-2" />
                        <span className="font-medium">Réservation acceptée</span>
                      </div>
                    </div>
                  )}
                  
                  {res.statut === 'refusée' && (
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <div className="flex items-center text-red-600">
                        <X className="h-5 w-5 mr-2" />
                        <span className="font-medium">Réservation refusée</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}