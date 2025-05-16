import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  Car, 
  Search, 
  Menu, 
  X, 
  Home, 
  Users, 
  MessageSquare, 
  ChevronDown,
  Settings,
  LogOut,
  User,
  LayoutDashboard,
  UserCog
} from 'lucide-react'
import './Navbar.css'

export const Navbar = () => {
  const { user, logout, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const userMenuRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate('/')
    setShowUserMenu(false)
  }

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const getUserInitials = () => {
    if (!user) return 'U'
    const nom = user.nom || ''
    const prenom = user.prenom || ''
    if (!nom && !prenom) return 'U'
    return `${nom.charAt(0)}${prenom.charAt(0)}`.toUpperCase()
  }

  const getUserFullName = () => {
    if (!user) return 'Utilisateur'
    const nom = user.nom || ''
    const prenom = user.prenom || ''
    if (!nom && !prenom) return 'Utilisateur'
    return `${nom} ${prenom}`.trim()
  }

  const getUserRole = () => {
    if (!user || !user.role) return 'Utilisateur'
    const roles = {
      'administrateur': 'Administrateur',
      'client': 'Client',
      'loueur': 'Loueur',
      'admin': 'Administrateur'
    }
    return roles[user.role] || 'Utilisateur'
  }

  // Show a simplified navbar while loading
  if (loading) {
    return (
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <Car size={28} className="logo-icon" strokeWidth={2.5} />
            <span className="logo-text">
              <span className="logo-primary">Drive</span>
              <span className="logo-secondary">Ease</span>
            </span>
          </Link>
        </div>
      </nav>
    )
  }

  if (!user) {
    return (
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <Car size={28} className="logo-icon" strokeWidth={2.5} />
            <span className="logo-text">
              <span className="logo-primary">Drive</span>
              <span className="logo-secondary">Ease</span>
            </span>
          </Link>
          
          <div className="navbar-links">
            <Link to="/" className={`nav-link ${isActive('/')}`}>
              <Home size={18} className="nav-icon" />
              <span>Home</span>
            </Link>
            
            <Link to="/listing" className={`nav-link ${isActive('/listing')}`}>
              <Car size={18} className="nav-icon" />
              <span>Vehicles</span>
            </Link>
            
            <Link to="/about" className={`nav-link ${isActive('/about')}`}>
              <Users size={18} className="nav-icon" />
              <span>About Us</span>
            </Link>
            
            <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>
              <MessageSquare size={18} className="nav-icon" />
              <span>Contact</span>
            </Link>
          </div>
          
          <div className="navbar-actions">           
            
            <div className="auth-buttons">
              <Link to="/login" className="auth-button login">
                Connexion
              </Link>
              <Link to="/register" className="auth-button register">
                Inscription
              </Link>
            </div>
          </div>

          <button 
            className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
    )
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <Car size={28} className="logo-icon" strokeWidth={2.5} />
          <span className="logo-text">
            <span className="logo-primary">Drive</span>
            <span className="logo-secondary">Ease</span>
          </span>
        </Link>
        
        <div className="navbar-links">
          <Link to="/" className={`nav-link ${isActive('/')}`}>
            <Home size={18} className="nav-icon" />
            <span>Home</span>
          </Link>
          
          <Link to="/listing" className={`nav-link ${isActive('/listing')}`}>
            <Car size={18} className="nav-icon" />
            <span>Vehicles</span>
          </Link>
          
          {user.role === 'loueur' && (
            <>
              <Link to="/loueur/dashboard" className={`nav-link ${isActive('/loueur/dashboard')}`}>
                <LayoutDashboard size={18} className="nav-icon" />
                <span>Dashboard</span>
              </Link>
              <Link to="/loueur/manage-cars" className={`nav-link ${isActive('/loueur/manage-cars')}`}>
                <Car size={18} className="nav-icon" />
                <span>Manage Cars</span>
              </Link>
            </>
          )}
          
          {user.role === 'client' && (
            <Link to="/client/dashboard" className={`nav-link ${isActive('/client/dashboard')}`}>
              <LayoutDashboard size={18} className="nav-icon" />
              <span>Dashboard</span>
            </Link>
          )}
          
          <Link to="/about" className={`nav-link ${isActive('/about')}`}>
            <Users size={18} className="nav-icon" />
            <span>About Us</span>
          </Link>
          
          <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>
            <MessageSquare size={18} className="nav-icon" />
            <span>Contact</span>
          </Link>

          {/* Admin Dashboard Link */}
          {(user.role === 'administrateur' || user.role === 'admin') && (
            <Link to="/admin/dashboard" className={`nav-link ${isActive('/admin/dashboard')}`}>
              <LayoutDashboard size={18} className="nav-icon" />
              <span>Admin Dashboard</span>
            </Link>
          )}
        </div>
        
        <div className="navbar-actions">
         

          <div className="user-menu-container" ref={userMenuRef}>
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
                        <MessageSquare size={16} />
                        {user.email}
                      </div>
                    )}
                    <div className="user-role">
                      <UserCog size={16} />
                      {getUserRole()}
                    </div>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                
                {(user.role === 'administrateur' || user.role === 'admin') && (
                  <>
                    <Link to="/admin/dashboard" className="dropdown-item">
                      <LayoutDashboard size={18} /> Tableau de bord
                    </Link>
                    <Link to="/admin/dashboard/users" className="dropdown-item">
                      <UserCog size={18} /> Gestion des utilisateurs
                    </Link>
                  </>
                )}
                {user.role === 'loueur' && (
                  <Link to="/loueur" className="dropdown-item">
                    <LayoutDashboard size={18} /> Tableau de bord
                  </Link>
                )}
                {user.role === 'client' && (
                  <Link to="/client" className="dropdown-item">
                    <LayoutDashboard size={18} /> Mes réservations
                  </Link>
                )}
                
                <Link to="/profile" className="dropdown-item">
                  <User size={18} /> Mon profil
                </Link>
                <Link to="/settings" className="dropdown-item">
                  <Settings size={18} /> Paramètres
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="dropdown-item logout"
                  type="button"
                >
                  <LogOut size={18} /> Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>

        <button 
          className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  )
}
