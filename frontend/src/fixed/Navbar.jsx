import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaTachometerAlt, FaUsersCog, FaUser, FaCog, FaSignOutAlt, FaEnvelope, FaUserTag } from 'react-icons/fa'
import './Navbar.css'

export const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showUserMenu, setShowUserMenu] = useState(false)

  useEffect(() => {
    console.log('Current user data:', user);
  }, [user]);

  const handleLogout = async () => {
    await logout()
    navigate('/')
    setShowUserMenu(false)
  }

  const getUserInitials = () => {
    if (!user) return 'U';
    const nom = user.nom || '';
    const prenom = user.prenom || '';
    if (!nom && !prenom) return 'U';
    return `${nom.charAt(0)}${prenom.charAt(0)}`.toUpperCase();
  }

  const getUserFullName = () => {
    if (!user) return 'Utilisateur';
    const nom = user.nom || '';
    const prenom = user.prenom || '';
    if (!nom && !prenom) return 'Utilisateur';
    return `${nom} ${prenom}`.trim();
  }

  const getUserRole = () => {
    if (!user || !user.role) return 'Utilisateur';
    console.log('User role:', user.role);
    const roles = {
      'administrateur': 'Administrateur',
      'client': 'Client',
      'loueur': 'Loueur',
      'admin': 'Administrateur'
    };
    return roles[user.role] || 'Utilisateur';
  };

  if (!user) {
    return (
      <nav className="navbar">
        <div className="navbar-logo">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
            </svg>
          </div>
          <Link to="/" className="logo-text">DriveEase</Link>
        </div>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/listing" className="nav-link">Vehicles</Link>
          <Link to="/about" className="nav-link">About Us</Link>
          <Link to="/contact" className="nav-link">Contact Us</Link>
        </div>
        <div className="navbar-auth">
          <div className="auth-buttons">
            <Link to="/login" className="auth-button login">
              Connexion
            </Link>
            <Link to="/register" className="auth-button register">
              Inscription
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <div className="logo-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
          </svg>
        </div>
        <Link to="/" className="logo-text">DriveEase</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/listing" className="nav-link">Vehicles</Link>
        <Link to="/search" className="nav-link">Search</Link>
        <Link to="/contact" className="nav-link">Contact Us</Link>

        {/* Loueur (Car Owner) Dashboard Links */}
        {user && user.role === 'loueur' && (
          <>
            <Link to="/loueur/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/loueur/manage-cars" className="nav-link">Manage Cars</Link>
          </>
        )}
        
        {/* Client Dashboard Link */}
        {user && user.role === 'client' && (
          <Link to="/client/dashboard" className="nav-link">Dashboard</Link>
        )}
      </div>
      
      <div className="navbar-auth">
        {/* Admin Dashboard Icon */}
        {user && (user.role === 'administrateur' || user.role === 'admin') && (
          <Link to="/admin/dashboard" className="nav-link admin-dashboard-icon">
            <FaTachometerAlt />
          </Link>
        )}
        
        {/* User Menu */}
        {user ? (
          <div className="user-menu-container">
            <button 
              className="user-menu-button"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="user-avatar">
                {getUserInitials()}
              </div>
              <div className="user-info-main">
                <span className="user-name">{getUserFullName()}</span>
                <span className="user-role-badge">{getUserRole()}</span>
              </div>
            </button>
            
            {showUserMenu && (
              <div className="user-dropdown">
                <div className="user-info">
                  <div className="user-avatar-large">
                    {getUserInitials()}
                  </div>
                  <div className="user-details">
                    <div className="user-name-large">{getUserFullName()}</div>
                    {user.email && (
                      <div className="user-email">
                        <FaEnvelope />
                        {user.email}
                      </div>
                    )}
                    <div className="user-role">
                      <FaUserTag />
                      {getUserRole()}
                    </div>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                
                {/* Dashboard Links based on role */}
                {(user.role === 'administrateur' || user.role === 'admin') && (
                  <>
                    <Link to="/admin/dashboard" className="dropdown-item">
                      <FaTachometerAlt /> Tableau de bord
                    </Link>
                    <Link to="/admin/dashboard/users" className="dropdown-item">
                      <FaUsersCog /> Gestion des utilisateurs
                    </Link>
                  </>
                )}
                {user.role === 'loueur' && (
                  <Link to="/loueur" className="dropdown-item">
                    <FaTachometerAlt /> Tableau de bord
                  </Link>
                )}
                {user.role === 'client' && (
                  <Link to="/client" className="dropdown-item">
                    <FaTachometerAlt /> Mes réservations
                  </Link>
                )}
                
                <Link to="/profile" className="dropdown-item">
                  <FaUser /> Mon profil
                </Link>
                <Link to="/settings" className="dropdown-item">
                  <FaCog /> Paramètres
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="dropdown-item logout"
                  type="button"
                >
                  <FaSignOutAlt /> Déconnexion
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="auth-button login">
              Connexion
            </Link>
            <Link to="/register" className="auth-button register">
              Inscription
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
