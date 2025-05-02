import React, { useState, useEffect } from 'react';
import { FaUsers, FaCar, FaMoneyBillWave, FaCalendarAlt, FaChartLine } from 'react-icons/fa';
import axios from '../../utils/axios';
import AdminSidebar from './AdminSidebar';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCars: 0,
    totalRentals: 0,
    totalRevenue: 0,
    recentRentals: [],
    recentUsers: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [usersRes, carsRes, rentalsRes] = await Promise.all([
          axios.get('/api/users'),
          axios.get('/api/cars'),
          axios.get('/api/rentals')
        ]);

        const users = usersRes.data;
        const cars = carsRes.data;
        const rentals = rentalsRes.data;

        // Calculate total revenue
        const revenue = rentals.reduce((sum, rental) => sum + rental.total_price, 0);

        setStats({
          totalUsers: users.length,
          totalCars: cars.length,
          totalRentals: rentals.length,
          totalRevenue: revenue,
          recentRentals: rentals.slice(-5).reverse(),
          recentUsers: users.slice(-5).reverse()
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
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
            <div className="stat-icon rentals">
              <FaCalendarAlt />
            </div>
            <div className="stat-info">
              <h3>Locations</h3>
              <p>{stats.totalRentals}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon revenue">
              <FaMoneyBillWave />
            </div>
            <div className="stat-info">
              <h3>Revenu Total</h3>
              <p>{stats.totalRevenue.toFixed(2)} DH</p>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="dashboard-content">
          <div className="recent-section">
            <h2>Locations Récentes</h2>
            <div className="recent-list">
              {stats.recentRentals.map(rental => (
                <div key={rental.id} className="recent-item">
                  <div className="recent-info">
                    <span className="recent-title">Location #{rental.id}</span>
                    <span className="recent-date">
                      {new Date(rental.start_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="recent-amount">{rental.total_price} DH</div>
                </div>
              ))}
            </div>
          </div>

          <div className="recent-section">
            <h2>Nouveaux Utilisateurs</h2>
            <div className="recent-list">
              {stats.recentUsers.map(user => (
                <div key={user.id} className="recent-item">
                  <div className="recent-info">
                    <span className="recent-title">{user.nom} {user.prenom}</span>
                    <span className="recent-date">
                      {new Date(user.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="recent-role">{user.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 