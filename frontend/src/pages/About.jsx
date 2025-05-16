import React from 'react';
import { Star, Car, Shield, Clock } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero" style={{backgroundImage: "url('/assets/about-hero.jpg')"}}>
        <div className="hero-overlay">
          <h1>À Propos de Nous</h1>
          <p>Votre partenaire de confiance pour une location de voiture simple, rapide et sécurisée.</p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <h2>20k+</h2>
            <p>Clients satisfaits</p>
          </div>
          <div className="stat-item">
            <h2>540+</h2>
            <p>Véhicules disponibles</p>
          </div>
          <div className="stat-item">
            <h2>25+</h2>
            <p>Années d'expérience</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>Qui sommes-nous ?</h2>
        <p>
          DriveEase est une plateforme de location de voitures qui simplifie votre mobilité.
          Que ce soit pour un voyage d'affaires, des vacances ou une simple course en ville,
          nous vous proposons une large gamme de véhicules à des prix compétitifs.
          Notre mission est de rendre la location de voiture accessible, transparente et agréable pour tous.
        </p>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section" style={{backgroundImage: "url('/assets/testimonial-bg.jpg')"}}>
        <div className="testimonial-overlay">
          <h2>Témoignages clients</h2>
          <div className="testimonials-grid">
            {[
              {
                text: "J'ai loué plusieurs fois chez eux et je n'ai jamais été déçue. Le service est impressionnant et le personnel est très professionnel.",
                author: "Amine Tidrini",
                rating: "★★★★★"
              },
              {
                text: "Excellente expérience ! Les prix sont très compétitifs et la transparence totale dans les conditions de location.",
                author: "Brahim ait Ali",
                rating: "★★★★★"
              },
              {
                text: "J'ai loué une voiture pour un week-end et tout s'est déroulé parfaitement. Je recommande vivement !",
                author: "Samira Alaoui",
                rating: "★★★★★"
              }
            ].map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="rating">{testimonial.rating}</div>
                <p>{testimonial.text}</p>
                <div className="author">{testimonial.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Pourquoi nous choisir ?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <Car size={40} className="mb-4 text-[#5937E0]" />
            <h3>Large choix de véhicules</h3>
            <p>Des véhicules pour tous les besoins et tous les budgets</p>
          </div>
          <div className="feature-card">
            <Shield size={40} className="mb-4 text-[#5937E0]" />
            <h3>Sécurité et fiabilité</h3>
            <p>Des véhicules entretenus et des contrats transparents</p>
          </div>
          <div className="feature-card">
            <Clock size={40} className="mb-4 text-[#5937E0]" />
            <h3>Réservation rapide</h3>
            <p>Réservez en quelques clics, sans complication</p>
            <button className="reserve-btn mt-4">RÉSERVER</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;