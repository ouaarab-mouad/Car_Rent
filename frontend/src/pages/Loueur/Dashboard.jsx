import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Car Owner Dashboard</h1>
        <p>Manage your vehicles and reservations</p>
      </div>

      <div className="dashboard-grid">
        {/* Add New Car Card */}
        <Link to="/loueur/add-car" className="dashboard-card">
          <div className="card-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
          </div>
          <h3>Add New Car</h3>
          <p>List a new vehicle for rent</p>
        </Link>

        {/* Manage Cars Card */}
        <Link to="/loueur/manage-cars" className="dashboard-card">
          <div className="card-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
            </svg>
          </div>
          <h3>Manage Cars</h3>
          <p>View and manage your vehicles</p>
        </Link>

        {/* Reservations Card */}
        <Link to="/loueur/reservations" className="dashboard-card">
          <div className="card-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
            </svg>
          </div>
          <h3>Reservations</h3>
          <p>View and manage reservations</p>
        </Link>

        {/* Statistics Card */}
        <Link to="/loueur/statistics" className="dashboard-card">
          <div className="card-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
            </svg>
          </div>
          <h3>Statistics</h3>
          <p>View your performance metrics</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard; 