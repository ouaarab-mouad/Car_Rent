import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X } from 'lucide-react';
import axios from '../utils/axios';
import './CarDetailsForm.css';

export default function ModifyCar() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    modele: '',
    marque: '',
    categorie: '',
    'consumption-per-km': '',
    ville: '',
    prix_par_jour: '',
    classe: '',
  });

  const [originalConditions, setOriginalConditions] = useState(null);
  const [conditions, setConditions] = useState({
    airConditioner: true,
    automatic: true,
    airbag: true,
    abs: true,
    cruiseControl: true
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [showAttributeInput, setShowAttributeInput] = useState(false);
  const [newAttributeName, setNewAttributeName] = useState('');

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

    // Validate required fields
    const requiredFields = ['modele', 'marque', 'categorie', 'ville', 'prix_par_jour'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert(`Veuillez remplir les champs obligatoires: ${missingFields.join(', ')}`);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Not authenticated');
      }
      
      console.log('Starting car update for ID:', id);
      
      // Create form data
      const formDataToSend = new FormData();
      
      // Add required fields
      formDataToSend.append('_method', 'PUT'); // For Laravel to recognize as PUT request
      formDataToSend.append('modele', formData.modele || '');
      formDataToSend.append('marque', formData.marque || '');
      formDataToSend.append('categorie', formData.categorie || '');
      formDataToSend.append('ville', formData.ville || '');
      formDataToSend.append('prix_par_jour', parseFloat(formData.prix_par_jour) || 0);
      
      // Add optional fields
      if (formData['consumption-per-km']) {
        formDataToSend.append('consumption-per-km', parseFloat(formData['consumption-per-km']));
      }
      if (formData.classe) {
        formDataToSend.append('classe', formData.classe);
      }
      
      // Add conditions as a JSON string (same as in addcar.js)
      formDataToSend.append('conditions', JSON.stringify(conditions));
      console.log('Sending conditions:', conditions);
      
      // Add image if selected
      if (image) {
        formDataToSend.append('image', image);
      }
      
      // Log the data being sent
      console.log('Sending form data:');
      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }

      console.log('Sending update request...');
      
      // Use POST with _method=PUT for Laravel to handle the request correctly
      const response = await axios.post(`/api/voitures/${id}`, formDataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        withCredentials: true
      });

      console.log('Update response:', response);
      
      if (response.status === 200) {
        alert('Voiture mise à jour avec succès!');
        navigate('/manage-cars');
      }
    } catch (error) {
      if (error.response?.status === 401) {
        alert('Please log in to modify a car');
      } else if (error.response?.status === 403) {
        alert('Only loueurs can modify cars');
      } else if (error.response?.status === 404) {
        alert('Car not found or you don\'t have permission to modify it');
      } else if (error.message === 'Not authenticated') {
        alert('Please log in to modify a car');
      } else {
        console.error('Error updating car:', error.response?.data || error.message);
        alert(error.response?.data?.message || 'Error updating car. Please try again.');
      }
    }
  };

  useEffect(() => {
    const fetchCarData = async () => {
      console.log('Starting to fetch car data for ID:', id);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('No token found');
          setError('Please log in to modify a car');
          setLoading(false);
          return;
        }

        console.log('Making request to fetch car data');
        const response = await axios.get(`/api/voitures/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });
        
        console.log('Raw response:', response);
        
        if (!response.data.success) {
          throw new Error(response.data.message || 'Failed to fetch car data');
        }

        const carData = response.data.data;
        console.log('Processing car data:', carData);
        
        if (!carData) {
          throw new Error('No car data received');
        }
        
        // Set form data with proper null/undefined checks and logging
        const newFormData = {
          modele: carData.modele || '',
          marque: carData.marque || '',
          categorie: carData.categorie || '',
          'consumption-per-km': carData['consumption-per-km'] || '',
          ville: carData.ville || '',
          prix_par_jour: carData.prix_par_jour || '',
          classe: carData.classe || ''
        };
        
        console.log('Setting form data:', newFormData);
        setFormData(newFormData);

        // Set conditions from server data
        if (carData.conditions) {
          let serverConditions;
          try {
            serverConditions = typeof carData.conditions === 'string' 
              ? JSON.parse(carData.conditions) 
              : carData.conditions;
            
            console.log('Parsed conditions:', serverConditions);
            setConditions(serverConditions);
            setOriginalConditions(serverConditions);
          } catch (e) {
            console.error('Error parsing conditions:', e);
            setConditions({});
          }
        }

        // Set image preview if there's an existing image
        if (carData.srcimg) {
          console.log('Setting image preview:', carData.srcimg);
          setImagePreview(carData.srcimg);
        }
        
        setLoading(false);
        console.log('Finished loading car data');
      } catch (error) {
        console.error('Error fetching car data:', error);
        console.error('Error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
        
        let errorMessage = 'Error loading car data. Please try again.';
        
        if (error.response) {
          errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
        } else if (error.request) {
          errorMessage = 'No response from server. Please check your internet connection.';
        }
        
        setError(errorMessage);
        setLoading(false);
      }
    };

    if (id) {
      fetchCarData();
    }
  }, [id]);

  // Add a debug effect to monitor formData changes
  useEffect(() => {
    console.log('Current formData:', formData);
  }, [formData]);

  if (loading) {
    return <div className="form-container">Loading...</div>;
  }

  if (error) {
    return <div className="form-container">{error}</div>;
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="car-details-form">
        <div className="form-content">
          <div className="form-layout">
            {/* Image Section */}
            <div className="image-container">
              <div className="image-wrapper" style={{ backgroundColor: 'white' }}>
                {imagePreview ? (
                  <img src={imagePreview} alt="Car preview" className="image-placeholder" style={{ width: '80%' }} />
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
                  value={formData.modele || ''}
                  onChange={(e) => handleInputChange('modele', e.target.value)}
                  required
                />
              </div>

              {/* Marque */}
              <div>
                <label className="form-label">Marque</label>
                <input 
                  type="text" 
                  placeholder="Entrer la marque" 
                  className="form-input"
                  value={formData.marque || ''}
                  onChange={(e) => handleInputChange('marque', e.target.value)}
                  required
                />
              </div>

              {/* Categorie */}
              <div>
                <label className="form-label">Catégorie</label>
                <select
                  className="form-input"
                  value={formData.categorie || ''}
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
              Update Car
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}