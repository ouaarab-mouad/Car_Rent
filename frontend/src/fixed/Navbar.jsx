import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Car, 
  Search, 
  PhoneCall, 
  Menu, 
  X, 
  Home, 
  FileText, 
  Users, 
  MessageSquare, 
  ChevronDown 
} from 'lucide-react';
import './Navbar.css';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

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
        
        <button 
          className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <div className={`navbar-links ${mobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" className={`nav-link ${isActive('/')}`}>
            <Home size={18} className="nav-icon" />
            <span>Home</span>
          </Link>
          
          <div className="nav-dropdown">
            <button 
              className={`nav-link dropdown-toggle ${isActive('/Listing')}`} 
              onClick={toggleDropdown}
            >
              <Car size={18} className="nav-icon" />
              <span>Vehicles</span>
              <ChevronDown size={16} className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`} />
            </button>
            
            <div className={`dropdown-menu ${dropdownOpen ? 'active' : ''}`}>
              <Link to="/Listing" className="dropdown-item">All Vehicles</Link>
              <Link to="/Listing/sedan" className="dropdown-item">Sedans</Link>
              <Link to="/Listing/suv" className="dropdown-item">SUVs</Link>
              <Link to="/Listing/luxury" className="dropdown-item">Luxury</Link>
            </div>
          </div>
          
          <Link to="/details" className={`nav-link ${isActive('/details')}`}>
            <FileText size={18} className="nav-icon" />
            <span>Details</span>
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
          <Link to="/search" className="search-btn" aria-label="Search">
            <Search size={20} />
          </Link>
          
          <a href="tel:+212674997586" className="contact-btn">
            <div className="contact-icon">
              <PhoneCall size={20} />
            </div>
            <div className="contact-info">
              <div className="help-text">Need help?</div>
              <div className="phone-number">+212 674997586</div>
            </div>
          </a>
        </div>
      </div>
    </nav>
  );
};