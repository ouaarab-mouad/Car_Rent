import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

export const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/')
    setShowUserMenu(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <div className="logo-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
          </svg>
        </div>
        <span className="logo-text">DriveEase</span>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/listing" className="nav-link">Vehicles</Link>
        {user && (
          <>
            {user.role === 'admin' && (
              <Link to="/admin/users" className="nav-link">Users</Link>
            )}
            {user.role === 'loueur' && (
              <Link to="/my-vehicles" className="nav-link">My Vehicles</Link>
            )}
          </>
        )}
        <Link to="/about" className="nav-link">About Us</Link>
        <Link to="/contact" className="nav-link">Contact Us</Link>
      </div>
      <div className="navbar-contact">
        <svg className="phone-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM12 3v10l3-3h6V3h-9z" />
        </svg>
        <div className="contact-info">
          <div className="help-text">Need help?</div>
          <div className="phone-number">+212 674997586</div>
        </div>
      </div>
      <div className="navbar-auth">
        {user && user.role === 'client' && (
          <Link to="/my-reservations" className="reservations-icon" title="My Reservations">
            <svg viewBox="0 0 24 24" fill="currentColor" className="reservations-svg">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
            </svg>
          </Link>
        )}
        {user && user.role === 'loueur' && (
          <Link to="/my-vehicles" className="vehicles-icon" title="My Vehicles">
            <svg viewBox="0 0 24 24" fill="currentColor" className="vehicles-svg">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
            </svg>
          </Link>
        )}
        {user ? (
          <div className="user-menu-container">
            <button 
              className="user-menu-button"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="user-avatar">
                {user.nom.charAt(0)}{user.prenom.charAt(0)}
              </div>
              <span className="user-name">{user.nom} {user.prenom}</span>
            </button>
            
            {showUserMenu && (
              <div className="user-dropdown">
                <div className="user-info">
                  <div className="user-role">{user.role}</div>
                  <div className="user-email">{user.email}</div>
                </div>
                <div className="dropdown-divider"></div>
                <Link to="/profile" className="dropdown-item">
                  <i className="fas fa-user"></i> Profile
                </Link>
                <Link to="/settings" className="dropdown-item">
                  <i className="fas fa-cog"></i> Settings
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="dropdown-item logout"
                  type="button"
                >
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="auth-button login">
              Login
            </Link>
            <Link to="/register" className="auth-button register">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
