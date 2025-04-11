import React from "react";
import { Navbar } from "../fixed/Navbar";
import { Footer } from "../fixed/Footer";

export const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="content">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Bienvenue sur <span className="highlight">DriveEase</span>...
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
            <img src="/images/cars/car1.png" alt="Car" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
