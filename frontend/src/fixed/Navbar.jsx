import React from 'react'
import './Navbar.css'
export const Navbar = () => {
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
        <a href="http://localhost:3000/" className="nav-link">Home</a>
        <a href="http://localhost:3000/Search" className="nav-link">Vehicles</a>
        <a href="http://localhost:3000/addcar" className="nav-link">Add Car</a>
        <a href="http://localhost:3000/manage-cars" className="nav-link">delete and modify</a>
        <a href="#" className="nav-link">Contact Us</a>

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
    </nav>
  )
}
