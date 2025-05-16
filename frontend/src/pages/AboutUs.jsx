import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="font-sans bg-gradient-to-b from-indigo-50 via-white to-indigo-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900 text-white text-center py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-60 bg-gradient-to-r from-blue-800 via-indigo-700 to-purple-800"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-200 mb-6 underline decoration-4 decoration-indigo-400 drop-shadow-lg">
            À Propos de Nous
          </h1>
          <p className="text-2xl md:text-3xl font-semibold max-w-2xl mx-auto leading-relaxed text-indigo-100 drop-shadow">
            Votre partenaire de confiance pour une location de voiture simple, rapide et sécurisée.
          </p>
        </div>
        <svg className="absolute bottom-0 left-0 w-full" height="60" viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#f5f7ff" fillOpacity="1" d="M0,32L48,37.3C96,43,192,53,288,53.3C384,53,480,43,576,32C672,21,768,11,864,10.7C960,11,1056,21,1152,32C1248,43,1344,53,1392,58.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
      </section>

      {/* Stats Section */}
      <section className="bg-indigo-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-around text-center gap-8">
            <div className="px-6 py-4 md:w-1/3">
              <h2 className="text-5xl font-extrabold text-indigo-700 mb-2 drop-shadow">20k+</h2>
              <p className="font-bold text-gray-800 text-lg">Clients satisfaits</p>
            </div>
            <div className="px-6 py-4 md:w-1/3">
              <h2 className="text-5xl font-extrabold text-indigo-700 mb-2 drop-shadow">540+</h2>
              <p className="font-bold text-gray-800 text-lg">Voitures disponibles</p>
            </div>
            <div className="px-6 py-4 md:w-1/3">
              <h2 className="text-5xl font-extrabold text-indigo-700 mb-2 drop-shadow">25+</h2>
              <p className="font-bold text-gray-800 text-lg">Ans d'expérience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Notre Histoire Section */}
      <section className="bg-indigo-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 tracking-tight">Qui sommes-nous ?</h2>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-300">
                <img
                  src={process.env.PUBLIC_URL + '/images/AboutUs/location-voiture.jpg'}
                  alt="Location de voiture"
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-white bg-opacity-10 p-10 rounded-2xl backdrop-blur-sm shadow-xl">
                <h3 className="text-2xl font-bold text-indigo-200 mb-4">Notre Mission</h3>
                <p className="text-lg leading-relaxed mb-6">
                  <span className="font-bold underline">DriveEase</span> est une plateforme de location de voitures qui simplifie votre mobilité. Que ce soit pour un voyage d'affaires, des vacances ou une simple course en ville, nous vous proposons une large gamme de véhicules à des prix compétitifs.
                </p>
                <p className="text-lg leading-relaxed">
                  Fondée en 2000, notre entreprise s'est développée avec une vision claire : rendre la location de voitures accessible, transparente et agréable pour tous nos clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-14">Nos Valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-indigo-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
              <div className="bg-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-indigo-700 text-center mb-3">Fiabilité</h3>
              <p className="text-gray-700 text-center">
                Nous nous engageons à fournir des véhicules propres, bien entretenus et fiables pour votre sécurité.
              </p>
            </div>
            <div className="bg-indigo-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
              <div className="bg-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-indigo-700 text-center mb-3">Efficacité</h3>
              <p className="text-gray-700 text-center">
                Notre processus de réservation est simple et rapide pour vous faire gagner du temps.
              </p>
            </div>
            <div className="bg-indigo-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
              <div className="bg-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-indigo-700 text-center mb-3">Service Client</h3>
              <p className="text-gray-700 text-center">
                Notre équipe est disponible 24/7 pour répondre à vos questions et résoudre vos problèmes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-indigo-700 mb-14">Témoignages Clients</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Témoignage 1 */}
            <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-2xl transition-shadow flex flex-col">
              <div className="text-indigo-500 text-5xl mb-4"></div>
              <p className="text-gray-700 mb-6 flex-1">
                J'ai loué plusieurs fois chez eux et je n'ai jamais été déçu. Le service est impeccable, l'équipe est réactive et toujours à l'écoute. Un vrai plaisir de passer par cette agence.
              </p>
              <div className="flex items-center mt-4">
                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-indigo-500">
                  <img src={process.env.PUBLIC_URL + '/images/AboutUs/amine.png'} alt="Amine Tidrini" className="h-full w-full object-cover" />
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-indigo-700">Amine Tidrini</h4>
                  <div className="flex text-yellow-400 text-lg">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Témoignage 2 */}
            <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-2xl transition-shadow flex flex-col">
              <div className="text-indigo-500 text-5xl mb-4"></div>
              <p className="text-gray-700 mb-6 flex-1">
                Excellente expérience ! Les prix sont très compétitifs et la transparence totale. Pas de frais cachés, et la voiture était en parfait état. Une entreprise sérieuse.
              </p>
              <div className="flex items-center mt-4">
                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-indigo-500">
                  <img 
                    src={process.env.PUBLIC_URL + '/images/AboutUs/brahim.png'}
                    alt="Brahim Ait Ali"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-indigo-700">Brahim Ait Ali</h4>
                  <div className="flex text-yellow-400 text-lg">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Témoignage 3 */}
            <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-2xl transition-shadow flex flex-col">
              <div className="text-indigo-500 text-5xl mb-4"></div>
              <p className="text-gray-700 mb-6 flex-1">
                J'ai loué une voiture pour un week-end et tout s'est déroulé parfaitement ! Réservation rapide, voiture propre et bien entretenue, et un service client au top.
              </p>
              <div className="flex items-center mt-4">
                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-indigo-500">
                  <img 
                    src={process.env.PUBLIC_URL + '/images/AboutUs/samira.png'}
                    alt="Samira Hakimi"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-indigo-700">Samira Hakimi</h4>
                  <div className="flex text-yellow-400 text-lg">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-indigo-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Prêt à nous faire confiance ?</h2>
          <p className="text-xl mb-8">Rejoignez nos milliers de clients satisfaits et profitez d'une expérience de location sans stress.</p>
          <Link to="/login">
            <button className="bg-white text-indigo-700 font-bold py-3 px-8 rounded-full hover:bg-indigo-100 transition duration-300 transform hover:scale-105 shadow-lg">
                Réserver Maintenant
            </button>
          </Link>
        </div>
      </section>     
    </div>
  );
};

export default AboutUs;