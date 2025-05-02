import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      {/* Section Hero avec image de fond */}
      <section className="about-hero" style={{backgroundImage: "url('/assets/about-hero.jpg')"}}>
        <div className="hero-overlay">
          <h1>About Us</h1>
          <p>Votre partenaire de confiance pour une location de voiture simple, rapide et sécurisée.</p>
        </div>
      </section>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>

      {/* Section Stats avec fond coloré */}
      <section className="stats-section" style={{backgroundColor: '#2c3e50'}}>
        <div className="stats-container">
          <div className="stat-item">
            <h2>20k+</h2>
            <p>Clients satisfaits</p>
          </div>
          <div className="stat-item">
            <h2>540+</h2>
            <p>De voitures</p>
          </div>
          <div className="stat-item">
            <h2>25+</h2>
            <p>ans d'expérience</p>
          </div>
        </div>
      </section>

      {/* Section Qui sommes-nous */}
      <section className="about-section">
        <h2>Qui sommes-nous ?</h2>
        <p>
          DriveEase est une plateforme de location de voitures qui simplifie votre mobilité.
          Que ce soit pour un voyage d'affaires, des vacances ou une simple course en ville,
          nous vous proposons une large gamme de véhicules à des prix compétitifs.
        </p>
      </section>

      {/* Section Témoignages avec image de fond */}
      <section className="testimonials-section" style={{backgroundImage: "url('/assets/testimonial-bg.jpg')"}}>
        <div className="testimonial-overlay">
          <h2>Témoignages clients</h2>
          <div className="testimonials-grid">
            {[1, 2, 3].map((item) => (
              <div key={item} className="testimonial-card">
                <div className="rating"></div>
                <p>
                  {item === 1 && "J'ai loué plusieurs fois chez eux et je n'ai jamais été déçue. Le service est impressionnant..."}
                  {item === 2 && "Excellente expérience ! Les prix sont très compétitifs et la transparence totale..."}
                  {item === 3 && "J'ai loué une voiture pour un week-end et tout s'est déroulé parfaitement..."}
                </p>
                <div className="author">
                  {item === 1 && "Amine Tidrini"}
                  {item === 2 && "Brahim ait Ali"}
                  {item === 3 && "Samira Alaoui"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Pourquoi nous choisir avec fond coloré */}
      <section className="features-section" style={{backgroundColor: '#5937E0'}}>

        <h2> Pourquoi nous choisir ?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Large choix de véhicules</h3>
          </div>
          <div className="feature-card">
            <h3>Sécurité et fiabilité</h3>
          </div>
          <div className="feature-card">
            <h3>Réservation rapide</h3>
            <button className="reserve-btn">RESERVE</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;