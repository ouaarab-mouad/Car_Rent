import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CalendarDays, Check, X, Clock, CreditCard, BarChart3, Car, User } from 'lucide-react';

function getTopCar(reservations) {
  const carCount = {};
  reservations.forEach(r => {
    if (r.voiture) {
      const key = `${r.voiture.marque} ${r.voiture.modele}`;
      carCount[key] = (carCount[key] || 0) + 1;
    }
  });
  const top = Object.entries(carCount).sort((a, b) => b[1] - a[1])[0];
  return top ? { name: top[0], count: top[1] } : null;
}

export default function LoueurStatistics() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError('Impossible de charger les statistiques.');
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  const total = reservations.length;
  const accepted = reservations.filter(r => r.statut === 'acceptée').length;
  const refused = reservations.filter(r => r.statut === 'refusée').length;
  const pending = reservations.filter(r => r.statut === 'en_attente').length;
  const revenue = reservations
    .filter(r => r.statut === 'acceptée')
    .reduce((sum, r) => sum + (r.prix_total || 0), 0);
  const topCar = getTopCar(reservations);
  const recent = [...reservations].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5);

  // Percentages
  const percent = (count) => total ? Math.round((count / total) * 100) : 0;

  // Bar chart data
  const barData = [
    { label: 'Acceptées', value: accepted, color: '#22c55e' },
    { label: 'Refusées', value: refused, color: '#ef4444' },
    { label: 'En Attente', value: pending, color: '#eab308' },
  ];
  const maxBar = Math.max(...barData.map(d => d.value), 1);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <BarChart3 className="h-8 w-8 mr-2 text-blue-600" />
            Statistiques
          </h1>
          <p className="text-gray-600">Vue d'ensemble de vos réservations et revenus</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center border border-gray-100">
            <CalendarDays className="h-8 w-8 text-blue-600 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Total Réservations</p>
              <p className="text-2xl font-bold text-gray-900">{total}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center border border-gray-100">
            <Check className="h-8 w-8 text-green-600 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Acceptées</p>
              <p className="text-2xl font-bold text-gray-900">{accepted} <span className="text-xs text-gray-400">({percent(accepted)}%)</span></p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center border border-gray-100">
            <X className="h-8 w-8 text-red-600 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Refusées</p>
              <p className="text-2xl font-bold text-gray-900">{refused} <span className="text-xs text-gray-400">({percent(refused)}%)</span></p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center border border-gray-100">
            <Clock className="h-8 w-8 text-yellow-600 mr-4" />
            <div>
              <p className="text-sm text-gray-500">En Attente</p>
              <p className="text-2xl font-bold text-gray-900">{pending} <span className="text-xs text-gray-400">({percent(pending)}%)</span></p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center border border-gray-100">
            <CreditCard className="h-8 w-8 text-purple-600 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Revenu Total</p>
              <p className="text-2xl font-bold text-gray-900">{revenue.toLocaleString()} DH</p>
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center"><BarChart3 className="h-5 w-5 mr-2 text-blue-500" />Répartition des Statuts</h2>
          <div className="flex items-end space-x-8 h-40">
            {barData.map((d, i) => (
              <div key={d.label} className="flex flex-col items-center flex-1">
                <div style={{ height: `${(d.value / maxBar) * 100}%`, background: d.color }} className="w-10 rounded-t-lg transition-all duration-300"></div>
                <span className="mt-2 text-sm font-medium text-gray-700">{d.value}</span>
                <span className="text-xs text-gray-400">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Car */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center"><Car className="h-5 w-5 mr-2 text-blue-500" />Véhicule le plus réservé</h2>
            {topCar ? (
              <div className="flex items-center space-x-4">
                <Car className="h-10 w-10 text-blue-600" />
                <div>
                  <p className="text-lg font-bold text-gray-900">{topCar.name}</p>
                  <p className="text-gray-500 text-sm">{topCar.count} réservation{topCar.count > 1 ? 's' : ''}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Aucune réservation trouvée.</p>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center"><User className="h-5 w-5 mr-2 text-blue-500" />Activité Récente</h2>
            {recent.length > 0 ? (
              <ul className="divide-y divide-gray-100">
                {recent.map(r => (
                  <li key={r.id} className="py-3 flex items-center space-x-3">
                    <Car className="h-5 w-5 text-gray-400" />
                    <span className="font-medium text-gray-800">{r.voiture?.marque} {r.voiture?.modele}</span>
                    <span className="text-gray-500 text-xs">{new Date(r.created_at).toLocaleDateString('fr-FR')}</span>
                    <span className="ml-auto px-2 py-1 rounded-full text-xs font-semibold "
                      style={{ background: r.statut === 'acceptée' ? '#dcfce7' : r.statut === 'refusée' ? '#fee2e2' : '#fef9c3', color: r.statut === 'acceptée' ? '#16a34a' : r.statut === 'refusée' ? '#dc2626' : '#b45309' }}>
                      {r.statut.charAt(0).toUpperCase() + r.statut.slice(1)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Aucune activité récente.</p>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6 text-red-700">
            {error}
          </div>
        )}
        {loading && (
          <div className="mt-8 flex items-center justify-center">
            <span className="text-blue-600 font-medium">Chargement...</span>
          </div>
        )}
      </div>
    </div>
  );
} 