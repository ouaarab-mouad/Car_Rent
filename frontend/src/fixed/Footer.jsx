// src/fixed/Footer.js
import React from "react";
import './Footer.css'
export const Footer = () => {
  return (
    <footer>
      <div className="firstSectionFooter">
        <div className="footerCard">
          <div>
            <img src="/images/footerIcons/car.png" alt="Car icon" />
          </div>
          <div>
            <h3>Location</h3>
          </div>
        </div>
        <div className="footerCard">
          <div>
            <img src="/images/footerIcons/localisation.png" alt="Location icon" />
          </div>
          <div>
            <div>
              <p>Address</p>
              <strong>Marrakech,Maroc</strong>
            </div>
          </div>
        </div>
        <div className="footerCard">
          <div>
            <img src="/images/footerIcons/email.png" alt="Email icon" />
          </div>
          <div>
            <p>Email</p>
            <strong>Tawsile@gmail.com</strong>
          </div>
        </div>
        <div className="footerCard">
          <div>
            <img src="/images/footerIcons/tel.png" alt="Phone icon" />
          </div>
          <div>
            <p>Phone</p>
            <strong>+212674997586</strong>
          </div>
        </div>
      </div>
      <div className="secondSectionFooter">
        <div className="socialMedia">
          <div>
            <h3>Nos Réseaux Sociaux</h3>
          </div>
          <div className="socialMediaIcons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="/images/SocialMedia/fb.png" alt="Facebook" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="/images/SocialMedia/instagram.png" alt="Instagram" />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <img src="/images/SocialMedia/x.png" alt="Twitter/X" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <img src="/images/SocialMedia/youtube.png" alt="YouTube" />
            </a>
          </div>
        </div>
        <div className="footerLinks">
          <div>
            <h3>Liens utiles</h3>
          </div>
          <div>
            <ul>
              <li><a href="">à propos de nous</a></li>
              <li><a href="">Contactez-nous</a></li>
              <li><a href="">Photos</a></li>
              <li><a href="">Blog</a></li>
              <li><a href="">F.A.Q</a></li>
            </ul>
          </div>
        </div>
        <div className="footerLinks">
          <div>
            <h3>Voitures</h3>
          </div>
          <div>
            <ul>
              <li><a href="">Dacia</a></li>
              <li><a href="">Clio</a></li>
              <li><a href="">Mercedes</a></li>
              <li><a href="">BMW</a></li>
              <li><a href="">Chevrolet</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};  
