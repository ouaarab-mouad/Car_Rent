import { useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';
import './CarDetailsForm.css';

export default function CarDetailsForm() {
  const [formData, setFormData] = useState({
    modele: '',
    marque: '',
    categorie: '',
    'consumption-per-km': '',
    ville: '',
    prix_par_jour: '',
    classe: '',
  });

  const [conditions, setConditions] = useState({
    airConditioner: true,
    automatic: true,
    airbag: true,
    abs: true,
    cruiseControl: true
  });
  
  const [showAttributeInput, setShowAttributeInput] = useState(false);
  const [newAttributeName, setNewAttributeName] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Car categories (commonly used)
  const carCategories = [
    'Citadine', 'Compacte', 'Berline', 'SUV', 'Coupé', 'Cabriolet', 'Break', 'Monospace', '4x4', 'Pick-up', 'Utilitaire', 'Sport', 'Luxe', 'Électrique', 'Hybride', 'Diesel', 'Essence'
  ];
  // Major cities in Morocco
  const villesMaroc = [
    'Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Tanger', 'Agadir', 'Meknès', 'Oujda', 'Kenitra', 'Tétouan', 'Safi', 'El Jadida', 'Béni Mellal', 'Nador', 'Taza', 'Khouribga', 'Settat', 'Larache', 'Ksar El Kebir', 'Guelmim', 'Berrechid', 'Ouarzazate', 'Al Hoceima', 'Errachidia', 'Khemisset', 'Khénifra', 'Mohammedia', 'Salé', 'Essaouira', 'Azrou', 'Ifrane', 'Taroudant', 'Taourirt', 'Sidi Slimane', 'Sidi Kacem', 'Sidi Bennour', 'Sefrou', 'Youssoufia', 'Midelt', 'Oued Zem', 'El Hajeb', 'Boujdour', 'Boulemane', 'Jerada', 'Tan-Tan', 'Dakhla', 'Laâyoune', 'Smara', 'Zagora', 'Tiznit', 'Chefchaouen'
  ];

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleFeatureToggle = (feature) => {
    setConditions({
      ...conditions,
      [feature]: !conditions[feature]
    });
  };
  
  const addNewAttribute = () => {
    if (newAttributeName.trim() !== '') {
      setConditions({
        ...conditions,
        [newAttributeName.toLowerCase().replace(/\s+/g, '_')]: true
      });
      setNewAttributeName('');
      setShowAttributeInput(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      alert('Please select a valid image file.');
      setImage(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.modele || !formData.marque || !formData.categorie || !formData.ville || !formData.prix_par_jour) {
      alert('Please fill in all required fields');
      return;
    }
    if (!image) {
      alert('Please upload an image of the car.');
      return;
    }

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      data.append('prix_par_jour', parseInt(formData.prix_par_jour, 10));
      data.append('conditions', JSON.stringify(conditions));
      data.append('image', image);
      const response = await axios.post('http://localhost:8000/api/cars', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
      });
      
      if (response.status === 201) {
        alert('Voiture ajoutée avec succès!');
        // Reset form
        setFormData({
          modele: '',
          marque: '',
          categorie: '',
          'consumption-per-km': '',
          ville: '',
          prix_par_jour: '',
          classe: ''
        });
        setConditions({
          airConditioner: true,
          automatic: true,
          airbag: true,
          abs: true,
          cruiseControl: true
        });
        setImage(null);
        setImagePreview(null);
      }
    } catch (error) {
      console.error('Error saving car:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Error saving car. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-content">
          <div className="form-layout">
            {/* Image Section */}
            <div className="image-container">
              <div className="image-wrapper" style={{ backgroundColor: 'white'}}>
                {imagePreview ? (
                  <img src={imagePreview} alt="Car preview" className="image-placeholder" style={{ width: '80%'}}/>
                ) : (
                  <img src="images/addcar/emptycar.png" alt="Car silhouette" className="image-placeholder" style={{ width: '80%'}}/>
                )}
                <label htmlFor="car-image-upload" className="upload-button" style={{ cursor: 'pointer' }}>
                  <input
                    id="car-image-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                </label>
              </div>
            </div>

            {/* Top Form Fields */}
            <div className="form-fields">
              {/* Modele */}
              <div>
                <label className="form-label">Modèle</label>
                <input 
                  type="text" 
                  placeholder="Entrer le modèle" 
                  className="form-input"
                  value={formData.modele}
                  onChange={(e) => handleInputChange('modele', e.target.value)}
                />
              </div>

              {/* Marque */}
              <div>
                <label className="form-label">Marque</label>
                <input 
                  type="text" 
                  placeholder="Entrer la marque" 
                  className="form-input"
                  value={formData.marque}
                  onChange={(e) => handleInputChange('marque', e.target.value)}
                />
              </div>

              {/* Categorie */}
              <div>
                <label className="form-label">Catégorie</label>
                <select
                  className="form-input"
                  value={formData.categorie}
                  onChange={(e) => handleInputChange('categorie', e.target.value)}
                  required
                >
                  <option value="">Choisir une catégorie</option>
                  {carCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Bottom Form Fields */}
          <div className="form-fields full-width">
            {/* Consumption per km */}
            <div>
              <label className="form-label">Consommation par km</label>
              <input 
                type="text" 
                placeholder="Entrer la consommation par km" 
                className="form-input"
                value={formData['consumption-per-km']}
                onChange={(e) => handleInputChange('consumption-per-km', e.target.value)}
              />
            </div>

            {/* Ville */}
            <div>
              <label className="form-label">Ville</label>
              <select
                className="form-input"
                value={formData.ville}
                onChange={(e) => handleInputChange('ville', e.target.value)}
                required
              >
                <option value="">Choisir une ville</option>
                {villesMaroc.map((ville) => (
                  <option key={ville} value={ville}>{ville}</option>
                ))}
              </select>
            </div>

            {/* Prix par jour */}
            <div>
              <label className="form-label">Prix par jour</label>
              <input 
                type="number" 
                placeholder="Entrer le prix par jour" 
                className="form-input"
                value={formData.prix_par_jour}
                onChange={(e) => handleInputChange('prix_par_jour', e.target.value)}
              />
            </div>

            {/* Classe */}
            <div>
              <label className="form-label">Classe</label>
              <input 
                type="text" 
                placeholder="Entrer la classe" 
                className="form-input"
                value={formData.classe}
                onChange={(e) => handleInputChange('classe', e.target.value)}
              />
            </div>
          </div>

          {/* Features Section */}
          <div className="features-section">
            <div className="features-grid">
              {Object.entries(conditions).map(([feature, isChecked]) => (
                <div className="feature-item" key={feature}>
                  <input
                    type="checkbox"
                    className="feature-checkbox"
                    checked={isChecked}
                    onChange={() => handleFeatureToggle(feature)}
                  />
                  <span className="feature-label">{feature.replace(/([A-Z])/g, ' $1').trim()}</span>
                </div>
              ))}
              {showAttributeInput ? (
                <div className="new-attribute-input">
                  <input
                    type="text"
                    value={newAttributeName}
                    onChange={(e) => setNewAttributeName(e.target.value)}
                    placeholder="New feature name"
                  />
                  <button onClick={addNewAttribute} className="add-button">
                    <X size={16} />
                  </button>
                  <button onClick={() => setShowAttributeInput(false)} className="cancel-button">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAttributeInput(true)}
                  className="add-feature-button"
                >
                  Add Feature
                </button>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="submit-section">
            <button type="submit" className="submit-button">
              Save Car
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}