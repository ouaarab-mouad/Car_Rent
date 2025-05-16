import React from "react";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Car, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  ChevronRight
} from "lucide-react";
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="contact-section">
        <div className="contact-card">
          <div className="icon-wrapper">
            <Car size={24} className="contact-icon" />
          </div>
          <div className="contact-info">
            <h3>Location</h3>
          </div>
        </div>
        
        <div className="contact-card">
          <div className="icon-wrapper">
            <MapPin size={24} className="contact-icon" />
          </div>
          <div className="contact-info">
            <p>Address</p>
            <strong>Marrakech, Maroc</strong>
          </div>
        </div>
        
        <div className="contact-card">
          <div className="icon-wrapper">
            <Mail size={24} className="contact-icon" />
          </div>
          <div className="contact-info">
            <p>Email</p>
            <strong>Tawsile@gmail.com</strong>
          </div>
        </div>
        
        <div className="contact-card">
          <div className="icon-wrapper">
            <Phone size={24} className="contact-icon" />
          </div>
          <div className="contact-info">
            <p>Phone</p>
            <strong>+212674997586</strong>
          </div>
        </div>
      </div>
      
      <div className="content-section">
        <div className="social-column">
          <h3>Nos Réseaux Sociaux</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook className="social-icon facebook" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="social-icon instagram" />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X">
              <Twitter className="social-icon twitter" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <Youtube className="social-icon youtube" />
            </a>
          </div>
        </div>
        
        <div className="links-column">
          <h3>Liens utiles</h3>
          <ul className="footer-links">
            <li>
              <ChevronRight size={16} className="list-icon" />
              <a href="#">À propos de nous</a>
            </li>
            <li>
              <ChevronRight size={16} className="list-icon" />
              <a href="#">Contactez-nous</a>
            </li>
            <li>
              <ChevronRight size={16} className="list-icon" />
              <a href="#">Photos</a>
            </li>
            <li>
              <ChevronRight size={16} className="list-icon" />
              <a href="#">Blog</a>
            </li>
            <li>
              <ChevronRight size={16} className="list-icon" />
              <a href="#">F.A.Q</a>
            </li>
          </ul>
        </div>
        
        <div className="links-column">
          <h3>Voitures</h3>
          <ul className="footer-links">
            <li>
              <ChevronRight size={16} className="list-icon" />
              <a href="#">Dacia</a>
            </li>
            <li>
              <ChevronRight size={16} className="list-icon" />
              <a href="#">Clio</a>
            </li>
            <li>
              <ChevronRight size={16} className="list-icon" />
              <a href="#">Mercedes</a>
            </li>
            <li>
              <ChevronRight size={16} className="list-icon" />
              <a href="#">BMW</a>
            </li>
            <li>
              <ChevronRight size={16} className="list-icon" />
              <a href="#">Chevrolet</a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="copyright-section">
        <p>© {new Date().getFullYear()} Tawsile. Tous droits réservés.</p>
      </div>
    </footer>
  );
};