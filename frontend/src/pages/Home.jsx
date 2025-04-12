import React from "react";
import "./Home.css";

export const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Bienvenue sur <span className="highlight">DriveEase</span>
            </h1>
            <p className="hero-description">
              Louez ou mettez en location une voiture en toute simplicité. Que
              vous soyez loueur ou client, trouvez ou publiez une annonce en
              quelques clics. Commencez dès maintenant !
            </p>
            <div className="hero-buttons">
              <button className="btn-primary">Espace Loueur</button>
              <button className="btn-primary">Espace Client</button>
            </div>
          </div>
          <div className="hero-image">
            <img src="/images/cars/homeCar.png" alt="Luxury car" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="feature-card">
            <div className="feature-icon">
              <img src="/images/logos/dispo.png" alt="Disponibilité" />
            </div>
            <h3>Disponibilité</h3>
            <p>
              Trouvez facilement des véhicules disponibles quand vous en avez besoin,
              où que vous soyez en France.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <img src="/images/logos/confort.png" alt="Confort" />
            </div>
            <h3>Confort</h3>
            <p>
              Profitez d'une expérience de location sans stress avec nos véhicules
              confortables et bien entretenus.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <img src="/images/logos/eco.png" alt="Économies" />
            </div>
            <h3>Économies</h3>
            <p>
              Économisez sur vos frais de transport avec nos tarifs compétitifs
              et nos offres spéciales exclusives.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="how-it-works-container">
          <div className="image-container">
            <img src="/images/attract/menwomen.png" alt="Car rental process" />
          </div>
          <div className="steps-container">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Réservation en moins de 5 minutes</h3>
                <p>Effectuez votre réservation en moins de 5 minutes grâce à une interface intuitive et simplifiée.</p>
              </div>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Disponibilité dans plusieurs villes</h3>
                <p>Trouvez facilement une voiture à louer près de chez vous, où que vous soyez.</p>
              </div>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Des prix compétitifs</h3>
                <p>Profitez des meilleurs prix sans frais cachés pour une expérience de location en toute sérénité.</p>
              </div>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Transactions sécurisées</h3>
                <p>Toutes vos informations et paiements sont protégés pour garantir une location en toute confiance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="featured-cars">
        <div className="section-header">
          <h2>Choisissez La Voiture qui Vous Convient</h2>
          <a href="#" className="view-all">Voir Tout</a>
        </div>
        <div className="cars-grid">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div className="car-card" key={index}>
              <div className="car-image">
                <img src="/images/cars/car1.png" alt="Mercedes" />
              </div>
              <div className="car-details">
                <div className="car-header">
                  <h3>Mercedes</h3>
                  <p className="car-price">25€<span>/jour</span></p>
                </div>
                <p className="car-type">Sedan</p>
                <div className="car-features">
                  <span>Automatique</span>
                  <span>4 Places</span>
                  <span>Climatisé</span>
                </div>
                <button className="btn-view-details">Voir les détails</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-background">
          <img src="/images/cars/carBackground.png" alt="Background car" />
        </div>
        <div className="stats-content">
          <h2>Les faits en chiffres</h2>
          <p>
            Découvrez en un coup d'œil nos statistiques clés : nombre de véhicules disponibles, 
            loueurs actifs et réservations effectuées. Faites confiance à notre plateforme pour 
            une location simple et sécurisée !
          </p>
          <div className="stats-cards">
            <div className="stat-card">
              <img src="/images/icons/icon1.png" alt="Cars" />
              <div className="stat-info">
                <strong>540+</strong>
                <p>Véhicules</p>
              </div>
            </div>
            <div className="stat-card">
              <img src="/images/icons/icon2.png" alt="Customers" />
              <div className="stat-info">
                <strong>20k+</strong>
                <p>Clients</p>
              </div>
            </div>
            <div className="stat-card">
              <img src="/images/icons/icon3.png" alt="Years" />
              <div className="stat-info">
                <strong>25+</strong>
                <p>Années</p>
              </div>
            </div>
            <div className="stat-card">
              <img src="/images/icons/icon4.png" alt="Miles" />
              <div className="stat-info">
                <strong>20M+</strong>
                <p>Kilomètres</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};