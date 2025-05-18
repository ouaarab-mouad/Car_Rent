// src/pages/Listing.js
import React, { useState, useEffect } from "react";
import { FaCar, FaChevronDown, FaChevronUp, FaSearch, FaPlus, FaUserCircle, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";
import "./Listing.css";
import { Link } from 'react-router-dom';

export const Listing = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [priceRange, setPriceRange] = useState(2000);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState("All");
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [visibleCars, setVisibleCars] = useState(6);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/cars');
        setVehicles(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch cars. Please try again later.');
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setBrandDropdownOpen(false);
    setVisibleCars(6);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setLocationDropdownOpen(false);
    setVisibleCars(6);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color === selectedColor ? '' : color);
    setVisibleCars(6);
  };

  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
    setVisibleCars(6);
  };

  const handleConditionChange = (condition) => {
    setSelectedCondition(condition);
    setVisibleCars(6);
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = searchQuery === "" || 
      vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrand === "All" || vehicle.brand === selectedBrand;
    const matchesLocation = selectedLocation === "All" || vehicle.ville === selectedLocation;
    const matchesPrice = vehicle.price <= priceRange;
    const matchesColor = selectedColor === "" || vehicle.color === selectedColor;
    const matchesCategories = selectedCategories.length === 0 || 
      selectedCategories.some(category => vehicle.category.includes(category));
    const matchesCondition = selectedCondition === "All" || vehicle.condition === selectedCondition;

    return matchesSearch && matchesBrand && matchesLocation && matchesPrice && 
           matchesColor && matchesCategories && matchesCondition;
  });

  const brands = ["All", ...new Set(vehicles.map(vehicle => vehicle.brand))];
  const locations = ["All", ...new Set(vehicles.map(vehicle => vehicle.ville))];
  const categories = ["Sedan", "SUV", "Sports", "Luxury", "Electric", "Hybrid"];
  const colors = [
    { name: "Red", code: "#FF0000" },
    { name: "Blue", code: "#0000FF" },
    { name: "Black", code: "#000000" },
    { name: "White", code: "#FFFFFF" },
    { name: "Silver", code: "#C0C0C0" }
  ];

  const loadMoreCars = () => {
    setVisibleCars(prev => prev + 6);
  };

  if (loading) {
    return (
      <div className="listing-page-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="listing-page-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="listing-page-container">
      <h1 className="listing-page-title">
        <FaCar className="listing-page-icon-spacing" /> Available Cars
      </h1>
      
      <div className="listing-page-content-wrapper">
        {/* Left Side - Filters */}
        <div className="listing-page-filters-section">
          {/* Search Bar */}
          <div className="listing-page-search-container">
            <input
              type="text"
              className="listing-page-search-input"
              placeholder="Search cars..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          {/* Brand Filter */}
          <div className="listing-page-filter-group">
            <label>Brand</label>
            <div className="listing-page-dropdown" onClick={() => setBrandDropdownOpen(!brandDropdownOpen)}>
              <span>{selectedBrand}</span>
              <FaChevronDown className={brandDropdownOpen ? 'rotated' : ''} />
            </div>
            {brandDropdownOpen && (
              <div className="listing-page-dropdown-menu">
                {brands.map(brand => (
                  <div 
                    key={brand} 
                    className={`listing-page-dropdown-item ${selectedBrand === brand ? 'selected' : ''}`}
                    onClick={() => handleBrandSelect(brand)}
                  >
                    {brand}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Location Filter */}
          <div className="listing-page-filter-group">
            <label>Location</label>
            <div className="listing-page-dropdown" onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}>
              <span>{selectedLocation}</span>
              <FaChevronDown className={locationDropdownOpen ? 'rotated' : ''} />
            </div>
            {locationDropdownOpen && (
              <div className="listing-page-dropdown-menu">
                {locations.map(location => (
                  <div 
                    key={location} 
                    className={`listing-page-dropdown-item ${selectedLocation === location ? 'selected' : ''}`}
                    onClick={() => handleLocationSelect(location)}
                  >
                    {location}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Price Range Filter */}
          <div className="listing-page-filter-group">
            <label>Max Price: {priceRange} DH/J</label>
            <input
              type="range"
              className="listing-page-range-slider"
              min="350"
              max="2000"
              value={priceRange}
              onChange={(e) => setPriceRange(parseInt(e.target.value))}
            />
            <div className="listing-page-price-labels">
              <span>350</span>
              <span>2000</span>
            </div>
          </div>

          {/* Color Filter */}
          <div className="listing-page-filter-group">
            <label>Colors</label>
            <div className="listing-page-color-options">
              {colors.map(color => (
                <div 
                  key={color.name}
                  className={`listing-page-color-option ${selectedColor === color.name ? 'selected' : ''}`}
                  onClick={() => handleColorSelect(color.name)}
                >
                  <span 
                    className="listing-page-color-circle"
                    style={{ backgroundColor: color.code }}
                  ></span>
                  <span className="listing-page-color-name">{color.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="listing-page-filter-group">
            <label>Categories</label>
            <div className="listing-page-dropdown" onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}>
              <span>
                {selectedCategories.length > 0 
                  ? selectedCategories.join(', ') 
                  : 'Select categories'}
              </span>
              <FaChevronDown className={categoryDropdownOpen ? 'rotated' : ''} />
            </div>
            {categoryDropdownOpen && (
              <div className="listing-page-dropdown-menu">
                {categories.map(category => (
                  <div 
                    key={category} 
                    className={`listing-page-dropdown-item ${selectedCategories.includes(category) ? 'selected' : ''}`}
                    onClick={() => handleCategoryToggle(category)}
                  >
                    <input 
                      type="checkbox" 
                      checked={selectedCategories.includes(category)} 
                      readOnly 
                    />
                    <span>{category}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Condition Filter */}
          <div className="listing-page-filter-group">
            <label>Condition</label>
            <div className="listing-page-condition-options">
              {['All', 'Excellent', 'Good', 'Fair'].map(condition => (
                <div 
                  key={condition}
                  className={`listing-page-condition-option ${selectedCondition === condition ? 'selected' : ''}`}
                  onClick={() => handleConditionChange(condition)}
                >
                  <input 
                    type="radio" 
                    name="condition" 
                    checked={selectedCondition === condition} 
                    readOnly 
                  />
                  <span>{condition}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Cars Grid */}
        <div className="listing-page-content">
          <div className="listing-page-grid">
            {filteredVehicles.slice(0, visibleCars).map((vehicle) => (
              <Link to={`/cars/${vehicle.id}`} key={vehicle.id} className="listing-page-card-link">
                <div className="listing-page-card">
                  <div className="listing-page-image-container">
                    <img src={vehicle.image} alt={vehicle.name} className="listing-page-car-image" />
                    <div className="listing-page-price-badge">{vehicle.price} DH/J</div>
                    <div className={`listing-page-status-badge ${vehicle.status}`}>
                      {vehicle.status === 'disponible' && 'Disponible'}
                      {vehicle.status === 'non_disponible' && 'Non disponible'}
                      {vehicle.status === 'en_location' && 'En location'}
                      {vehicle.status === 'en_maintenance' && 'En maintenance'}
                      {vehicle.status === 'reserve' && 'Réservé'}
                    </div>
                  </div>
                  <div className="listing-page-car-details">
                    <h3 className="listing-page-car-brand">{vehicle.brand}</h3>
                    <p className="listing-page-car-model">{vehicle.name}</p>
                    <p className="listing-page-car-type">{vehicle.type}</p>
                    <div className="listing-page-car-info">
                      <span>{vehicle.transmission}</span>
                      <span>{vehicle.fuel_type}</span>
                    </div>
                    <div className="listing-page-car-location">
                      <FaMapMarkerAlt className="location-icon" />
                      <span>{vehicle.ville}</span>
                    </div>
                    <button className="listing-page-rent-button">
                      Details
                    </button>
                    {vehicle.utilisateur_id && (
                      <Link
                        to={`/loueur/public/${vehicle.utilisateur_id}`}
                        className="loueur-profile-link"
                        style={{ display: 'inline-block', marginTop: 8, color: '#6c5ce7', fontWeight: 500 }}
                        onClick={e => e.stopPropagation()}
                      >
                        Voir le profil du loueur
                      </Link>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {filteredVehicles.length > visibleCars && (
            <div className="listing-page-load-more">
              <button className="listing-page-load-more-btn" onClick={loadMoreCars}>
                <FaPlus /> Show More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Listing;