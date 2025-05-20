import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUsers, FaCar, FaChartLine, FaCog, FaHome } from 'react-icons/fa';
import './AdminSidebar.css';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      path: '/admin/dashboard',
      icon: <FaHome />,
      label: 'Tableau de bord',
      exact: true
    },
    {
      path: '/admin/dashboard/users',
      icon: <FaUsers />,
      label: 'Users'
    },
    {
      path: '/admin/dashboard/voitures',
      icon: <FaCar />,
      label: 'Gestion des voitures'
    },
    /*{
      path: '/admin/statistics',
      icon: <FaChartLine />,
      label: 'Statistiques'
    },
    {
      path: '/admin/settings',
      icon: <FaCog />,
      label: 'Paramètres'
    }*/
  ];

  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;