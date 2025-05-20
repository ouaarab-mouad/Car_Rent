import React, { useState, useEffect } from 'react';
import { FaUsers, FaCar, FaMoneyBillWave, FaCalendarAlt, FaChartLine } from 'react-icons/fa';
import axios from '../../utils/axios';
import AdminSidebar from './AdminSidebar';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCars: 0,
    totalReservations: 0,
    totalRevenue: 0,
    recentRentals: [],
    recentUsers: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        console.log('Fetching dashboard data...');
        
        const [usersRes, carsRes, reservationsRes] = await Promise.all([
          axios.get('/api/users'),
          axios.get('/api/voitures'),
          axios.get('/api/reservations')
        ]);

        console.log('Users response:', usersRes.data);
        console.log('Cars response:', carsRes.data);
        console.log('Reservations response:', reservationsRes.data);

        // Extract data from the response
        const users = usersRes.data.data || [];
        const cars = carsRes.data.data || [];
        const reservations = reservationsRes.data.data || [];

        setStats(prevStats => ({
          ...prevStats,
          totalUsers: users.length,
          totalCars: cars.length,
          totalReservations: reservations.length
        }));

        console.log('Updated stats:', {
          totalUsers: users.length,
          totalCars: cars.length,
          totalReservations: reservations.length
        });

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        console.error('Error response:', error.response);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <h1 className="dashboard-title">Tableau de bord Administrateur</h1>
        
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon users">
              <FaUsers />
            </div>
            <div className="stat-info">
              <h3>Utilisateurs</h3>
              <p>{stats.totalUsers}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon cars">
              <FaCar />
            </div>
            <div className="stat-info">
              <h3>Voitures</h3>
              <p>{stats.totalCars}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon reservations">
              <FaCalendarAlt />
            </div>
            <div className="stat-info">
              <h3>Réservations</h3>
              <p>{stats.totalReservations}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 