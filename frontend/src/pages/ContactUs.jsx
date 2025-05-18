import React, { useState } from 'react';
import { Link } from 'react-router-dom';
export const ContactUs = () => {
  const [formData, setFormData] = useState({
    email: '',
    telephone: '',
    nom: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici vous pourriez ajouter la logique pour envoyer le formulaire
    console.log('Formulaire soumis:', formData);
    alert('Votre message a été envoyé avec succès!');
    setFormData({
      email: '',
      telephone: '',
      nom: '',
      message: ''
    });
  };

  return (
    <div className="font-sans bg-gradient-to-b from-indigo-50 via-white to-indigo-100 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 bg-indigo-900 overflow-hidden flex items-center justify-center">
        <img 
          src={process.env.PUBLIC_URL + '/images/ContactUs/keys.png'} 
          alt="Remise de clés de voiture" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-purple-800 opacity-80"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white text-center px-4 drop-shadow-lg">
            Contactez-nous
          </h1>
          <p className="text-indigo-100 text-lg mt-4 max-w-2xl mx-auto hidden md:block">
            Notre équipe est à votre écoute pour toute question ou demande de réservation.
          </p>
        </div>
      </div>

      {/* Informations de contact */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-4">
            Informations de contact
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Notre équipe est disponible pour répondre à toutes vos questions concernant la location de voitures. N'hésitez pas à nous contacter.
          </p>
        </div>

        {/* Cards de contact */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-16">
          {/* Téléphone */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center w-72 hover:shadow-2xl transition-all duration-300 border-t-4 border-indigo-600">
            <div className="bg-indigo-600 rounded-full p-4 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Téléphone</h3>
            <a href="tel:+212674997586" className="text-indigo-600 font-bold text-lg hover:text-indigo-800 transition duration-300">
              +212 674997586
            </a>
          </div>

          {/* Email */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center w-72 hover:shadow-2xl transition-all duration-300 border-t-4 border-indigo-600">
            <div className="bg-indigo-600 rounded-full p-4 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Email</h3>
            <a href="mailto:DriveEase@gmail.com" className="text-indigo-600 font-bold text-lg hover:text-indigo-800 transition duration-300">
              Tawsile@gmail.com
            </a>
          </div>

          {/* Facebook */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center w-72 hover:shadow-2xl transition-all duration-300 border-t-4 border-indigo-600">
            <div className="bg-indigo-600 rounded-full p-4 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Facebook</h3>
            <a href="https://facebook.com/driveease" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-bold text-lg hover:text-indigo-800 transition duration-300">
              Drive Ease officiel
            </a>
          </div>
        </div>
      </div>

      {/* Foire aux Questions */}
      <section className="max-w-4xl mx-auto mt-16 mb-20 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-10">Foire aux Questions</h1>
        <div className="space-y-6">
          {/* Question 1 */}
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-indigo-700 mb-2 flex items-center gap-2">
              <span className="inline-block bg-indigo-100 text-indigo-700 rounded-full px-3 py-1 text-base font-bold">1</span>
              Comment puis-je réserver une voiture sur votre site&nbsp;?
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-6">
            <li>
                <Link to="/listing">Allez sur la page <span className="font-semibold">Vehicles</span>.</Link>
            </li>
            <li>Parcourez les véhicules disponibles et choisissez celui qui vous convient.</li>
            <li>Remplissez vos informations personnelles et confirmez votre réservation.</li>
            <li>Sélectionnez vos dates de location et l'emplacement de prise en charge.</li>
            <li>Vous recevrez un email de confirmation avec les détails de votre location.</li>
            </ul>
          </div>
          {/* Question 2 */}
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-indigo-700 mb-2 flex items-center gap-2">
              <span className="inline-block bg-indigo-100 text-indigo-700 rounded-full px-3 py-1 text-base font-bold">2</span>
              Quels documents dois-je fournir pour louer une voiture&nbsp;?
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-6">
              <li>Une carte d'identité ou un passeport valide.</li>
              <li>Un permis de conduire en cours de validité (depuis au moins 2 ans).</li>
              <li>Une carte bancaire au nom du conducteur principal pour la caution.</li>
            </ul>
          </div>
          {/* Question 3 */}
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-indigo-700 mb-2 flex items-center gap-2">
              <span className="inline-block bg-indigo-100 text-indigo-700 rounded-full px-3 py-1 text-base font-bold">3</span>
              Quels types de véhicules proposez-vous à la location&nbsp;?
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-6">
              <li><span className="font-semibold">Citadines</span> : Idéales pour les trajets en ville.</li>
              <li><span className="font-semibold">Berlines</span> : Confortables et spacieuses pour les longs trajets.</li>
              <li><span className="font-semibold">SUV et 4x4</span> : Parfaits pour les escapades en montagne ou à la campagne.</li>
              <li><span className="font-semibold">Voitures de luxe</span> : Pour vos événements et occasions spéciales.</li>
            </ul>
          </div>
          {/* Question 4 */}
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-indigo-700 mb-2 flex items-center gap-2">
              <span className="inline-block bg-indigo-100 text-indigo-700 rounded-full px-3 py-1 text-base font-bold">4</span>
              Que se passe-t-il en cas d'accident ou de panne&nbsp;?
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-6">
              <li>Contactez immédiatement notre service client disponible 24/7.</li>
              <li>Suivez les instructions fournies par notre équipe.</li>
              <li>En cas d'accident, un constat amiable devra être rempli.</li>
              <li>Nous vous assisterons pour organiser le dépannage ou l'échange du véhicule si nécessaire.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Formulaire de contact */}
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto mb-16">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-indigo-700">
            <span className="text-indigo-600">Contact rapide</span>
          </h2>
          <p className="text-gray-600 mt-2">Remplissez le formulaire ci-dessous, nous vous répondrons dans les plus brefs délais.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Votre adresse email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="telephone" className="block text-gray-700 font-medium mb-2">Numéro Téléphone</label>
              <input
                type="tel"
                id="telephone"
                name="telephone"
                placeholder="Votre numéro de téléphone"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200"
                required
                value={formData.telephone}
                onChange={handleChange}
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="nom" className="block text-gray-700 font-medium mb-2">Nom Complet</label>
              <input
                type="text"
                id="nom"
                name="nom"
                placeholder="Votre nom complet"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200"
                required
                value={formData.nom}
                onChange={handleChange}
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Votre message"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200"
                required
                value={formData.message}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="text-center mt-8">
            <button
              type="submit"
              className="bg-indigo-600 text-white font-bold py-3 px-10 rounded-full hover:bg-indigo-700 transition duration-300 transform hover:scale-105 shadow-lg"
            >
              ENVOYER
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

