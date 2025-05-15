import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, CreditCard, ArrowLeft, Loader, AlertCircle, CheckCircle } from 'lucide-react';
import axios from '../utils/axios';

// Main component
export default function Reservation() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [daysCount, setDaysCount] = useState(0);

  useEffect(() => {
    const fetchCar = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/cars/${carId}`);
        setCar(res.data);
      } catch (err) {
        setError('Impossible de récupérer les informations du véhicule');
      }
      setLoading(false);
    };
    fetchCar();
  }, [carId]);

  useEffect(() => {
    if (car && dateDebut && dateFin) {
      const start = new Date(dateDebut);
      const end = new Date(dateFin);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      setDaysCount(days > 0 ? days : 0);
      setTotal(days > 0 ? days * car.prix_par_jour : 0);
    } else {
      setDaysCount(0);
      setTotal(0);
    }
  }, [dateDebut, dateFin, car]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');
    try {
      await axios.post('/api/reservations', {
        voiture_id: carId,
        date_debut: dateDebut,
        date_fin: dateFin
      });
      setSuccess('Réservation créée avec succès!');
      setTimeout(() => navigate('/profile'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la réservation');
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader className="w-12 h-12 text-blue-600 animate-spin" />
          <p className="text-lg font-medium text-gray-700">Chargement des informations...</p>
        </div>
      </div>
    );
  }

  if (error && !car) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-6 bg-red-50 rounded-lg border border-red-200 max-w-md w-full">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="text-red-500 w-6 h-6" />
            <h3 className="text-lg font-semibold text-red-700">Erreur</h3>
          </div>
          <p className="text-red-600">{error}</p>
          <Link to="/listing" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Retour à la liste des véhicules
          </Link>
        </div>
      </div>
    );
  }

  if (!car) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200 max-w-md w-full">
        <div className="flex items-center gap-3 mb-3">
          <AlertCircle className="text-yellow-500 w-6 h-6" />
          <h3 className="text-lg font-semibold text-yellow-700">Véhicule non trouvé</h3>
        </div>
        <p className="text-yellow-600">Nous n'avons pas pu trouver le véhicule demandé.</p>
        <Link to="/listing" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Retour à la liste des véhicules
        </Link>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/listing" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-6">
        <ArrowLeft className="w-4 h-4 mr-1" />
        Retour à la liste des véhicules
      </Link>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Réservation de véhicule
          </h1>
          <p className="text-blue-100 mt-1">
            {car.marque} {car.modele}
          </p>
        </div>

        <div className="p-6 grid md:grid-cols-2 gap-8">
          {/* Car information */}
          <div>
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-6">
              <img 
                src={car.srcimg || '/images/cars/default-car.jpg'} 
                alt={`${car.marque} ${car.modele}`} 
                className="w-full h-48 object-cover object-center"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {car.marque} {car.modele}
                </h2>
                
                <div className="mt-4 space-y-3">
                  <div className="flex items-center text-gray-700">
                    <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                    <span className="font-medium">{car.prix_par_jour} DH</span>
                    <span className="text-gray-500 ml-1">/ jour</span>
                  </div>
                  
                  <div className="flex items-center text-gray-700">
                    <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                    <span>{car.ville}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reservation form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="dateDebut" className="block text-sm font-medium text-gray-700 mb-1">
                  Date de début
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="dateDebut"
                    type="date"
                    value={dateDebut}
                    onChange={e => setDateDebut(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 bg-white border"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="dateFin" className="block text-sm font-medium text-gray-700 mb-1">
                  Date de fin
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="dateFin"
                    type="date"
                    value={dateFin}
                    onChange={e => setDateFin(e.target.value)}
                    min={dateDebut || new Date().toISOString().split('T')[0]}
                    required
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 bg-white border"
                  />
                </div>
              </div>

              {daysCount > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
                    <span>Prix par jour:</span>
                    <span>{car.prix_par_jour} DH</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                    <span>Durée de location:</span>
                    <span>{daysCount} jour{daysCount > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Montant total:</span>
                    <span className="text-blue-700">{total} DH</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting || total <= 0}
                className={`flex justify-center items-center w-full py-3 px-4 rounded-md shadow-sm text-white font-medium
                  ${submitting || total <= 0 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  }
                `}
              >
                {submitting ? (
                  <>
                    <Loader className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                    Traitement en cours...
                  </>
                ) : (
                  <>
                    Confirmer la réservation
                  </>
                )}
              </button>
            </form>

            {/* Success message */}
            {success && (
              <div className="mt-4 p-4 rounded-md bg-green-50 border border-green-200 flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-green-800">{success}</p>
                  <p className="text-green-600 text-sm mt-1">Redirection vers votre profil...</p>
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="mt-4 p-4 rounded-md bg-red-50 border border-red-200 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-red-800">{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Pour toute question concernant votre réservation, contactez notre service client.</p>
      </div>
    </div>
  );
}