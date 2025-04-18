import React, { useState, useEffect } from 'react';
import './Search&Filter.css';
import { FaChevronDown, FaUserCircle, FaCalendarAlt, FaPlus } from 'react-icons/fa';
import { carData, brands, locations, colors, categories } from '../data/CarData';

export const SearchFilter = () => {
  const [filteredCars, setFilteredCars] = useState(carData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [priceRange, setPriceRange] = useState(1000);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [visibleCars, setVisibleCars] = useState(6); // For show more functionality

  useEffect(() => {
    applyFilters();
  }, [selectedBrand, selectedLocation, priceRange, selectedColor, selectedCategories, selectedCondition, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setBrandDropdownOpen(false);
    setVisibleCars(6); // Reset visible cars when filters change
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setLocationDropdownOpen(false);
    setVisibleCars(6); // Reset visible cars when filters change
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color === selectedColor ? '' : color);
    setVisibleCars(6); // Reset visible cars when filters change
  };

  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
    setVisibleCars(6); // Reset visible cars when filters change
  };

  const handleConditionChange = (condition) => {
    setSelectedCondition(condition);
    setVisibleCars(6); // Reset visible cars when filters change
  };

  const applyFilters = () => {
    let result = carData;
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(car => 
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by brand (skip if "All" is selected)
    if (selectedBrand !== 'All') {
      result = result.filter(car => car.brand === selectedBrand);
    }
    
    // Filter by location (skip if "All" is selected)
    if (selectedLocation !== 'All') {
      result = result.filter(car => car.location === selectedLocation);
    }
    
    // Filter by price
    result = result.filter(car => car.price <= priceRange);
    
    // Filter by color
    if (selectedColor) {
      result = result.filter(car => car.color === selectedColor);
    }
    
    // Filter by categories (if any selected)
    if (selectedCategories.length > 0) {
      result = result.filter(car => 
        selectedCategories.some(category => car.category.includes(category))
      );
    }
    
    // Filter by condition (skip if "All" is selected)
    if (selectedCondition !== 'All') {
      result = result.filter(car => car.condition === selectedCondition);
    }
    
    setFilteredCars(result);
  };

  const loadMoreCars = () => {
    setVisibleCars(prev => prev + 6);
  };

  return (
    <div className="car-rental-container">
      {/* Search Bar */}
      <div className="search-container">
        <div className="search-bar">
          <button className="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <input 
            type="text" 
            placeholder="Rechercher par nom de voiture ou marque" 
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Filters Section */}
        <div className="filters-section">
          <h2>Filters</h2>

          {/* Brand Filter */}
          <div className="filter-group">
            <div className="dropdown-filter" onClick={() => setBrandDropdownOpen(!brandDropdownOpen)}>
              <span>{selectedBrand}</span>
              <FaChevronDown className={brandDropdownOpen ? 'rotated' : ''} />
            </div>
            {brandDropdownOpen && (
              <div className="dropdown-menu">
                <div 
                  className={`dropdown-item ${selectedBrand === 'All' ? 'selected' : ''}`}
                  onClick={() => handleBrandSelect('All')}
                >
                  All
                </div>
                {brands.map(brand => (
                  <div 
                    key={brand} 
                    className={`dropdown-item ${selectedBrand === brand ? 'selected' : ''}`}
                    onClick={() => handleBrandSelect(brand)}
                  >
                    {brand}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Location Filter */}
          <div className="filter-group">
            <div className="dropdown-filter" onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}>
              <span>{selectedLocation}</span>
              <FaChevronDown className={locationDropdownOpen ? 'rotated' : ''} />
            </div>
            {locationDropdownOpen && (
              <div className="dropdown-menu">
                <div 
                  className={`dropdown-item ${selectedLocation === 'All' ? 'selected' : ''}`}
                  onClick={() => handleLocationSelect('All')}
                >
                  All
                </div>
                {locations.map(location => (
                  <div 
                    key={location} 
                    className={`dropdown-item ${selectedLocation === location ? 'selected' : ''}`}
                    onClick={() => handleLocationSelect(location)}
                  >
                    {location}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Budget Filter */}
          <div className="filter-group budget-filter">
            <label>Votre Budget (DH/J)</label>
            <div className="range-slider">
              <input 
                type="range" 
                min="350" 
                max="2000" 
                value={priceRange} 
                onChange={(e) => setPriceRange(parseInt(e.target.value))} 
              />
              <div className="price-labels">
                <span>350</span>
                <span className="current-price">{priceRange}</span>
                <span>2000</span>
              </div>
            </div>
          </div>

          {/* Color Filter */}
          <div className="filter-group">
            <label>Couleurs</label>
            <div className="color-options">
              {colors.map(color => (
                <div className="color-option" key={color.name}>
                  <input 
                    type="radio" 
                    name="color" 
                    id={color.name.toLowerCase()} 
                    checked={selectedColor === color.name}
                    onChange={() => handleColorSelect(color.name)}
                  />
                  <label htmlFor={color.name.toLowerCase()} className="color-label">
                    <span 
                      className={`color-circle ${color.name.toLowerCase()}`} 
                      style={{ backgroundColor: color.code }}
                    ></span>
                    <span className="color-name">{color.name}</span>
                  </label>
                </div>
              ))}
              <div className="special-color-button">+ Couleur Special</div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="filter-group">
            <div className="dropdown-filter car-type-filter" onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}>
              {selectedCategories.length > 0 ? (
                selectedCategories.map(cat => (
                  <span key={cat} className="filter-tag">{cat}</span>
                ))
              ) : (
                <span>Sélectionnez des catégories</span>
              )}
              <FaChevronDown className={categoryDropdownOpen ? 'rotated' : ''} />
            </div>
            {categoryDropdownOpen && (
              <div className="dropdown-menu">
                {categories.map(category => (
                  <div 
                    key={category} 
                    className={`dropdown-item checkbox-item ${selectedCategories.includes(category) ? 'selected' : ''}`}
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
          <div className="filter-group">
            <label>Condition</label>
            <div className="condition-options">
              <div className="condition-option">
                <input 
                  type="radio" 
                  name="condition" 
                  id="all" 
                  checked={selectedCondition === 'All'} 
                  onChange={() => handleConditionChange('All')}
                />
                <label htmlFor="all">All</label>
              </div>
              <div className="condition-option">
                <input 
                  type="radio" 
                  name="condition" 
                  id="exellent" 
                  checked={selectedCondition === 'Exellent'} 
                  onChange={() => handleConditionChange('Exellent')}
                />
                <label htmlFor="exellent">Exellent</label>
              </div>
              <div className="condition-option">
                <input 
                  type="radio" 
                  name="condition" 
                  id="good" 
                  checked={selectedCondition === 'Good'} 
                  onChange={() => handleConditionChange('Good')}
                />
                <label htmlFor="good">Good</label>
              </div>
              <div className="condition-option">
                <input 
                  type="radio" 
                  name="condition" 
                  id="bad" 
                  checked={selectedCondition === 'Bad'} 
                  onChange={() => handleConditionChange('Bad')}
                />
                <label htmlFor="bad">Bad</label>
              </div>
            </div>
          </div>

          <button className="apply-filters-btn" onClick={applyFilters}>
            Appliquer Filters
          </button>
        </div>

        {/* Search Results */}
        <div className="search-results">
          <h2>Résultat De Recherche</h2>
          {filteredCars.length === 0 ? (
            <div className="no-results">
              <p>Aucune voiture ne correspond à vos critères de recherche.</p>
            </div>
          ) : (
            <div className="car-grid">
              {filteredCars.slice(0, visibleCars).map(car => (
                <div key={car.id} className="car-card">
                  <div className="car-image">
                    <img src={car.image} alt={car.name} />
                  </div>
                  <div className="car-details">
                    <div className="car-header">
                      <div className="car-title">
                        <h3>{car.name}</h3>
                        <p>{car.type}</p>
                      </div>
                      <div className="car-price">
                        <span className="price">{car.price}</span>
                        <span className="currency">DHJ</span>
                      </div>
                    </div>
                    <div className="rental-info">
                      <div className="rental-user">
                        <FaUserCircle className="user-icon" />
                        <span>{car.rentedBy}</span>
                      </div>
                      <div className="rental-date">
                        <FaCalendarAlt className="calendar-icon" />
                        <span>{car.date}</span>
                      </div>
                    </div>
                    <button className="reserve-btn">Reserver</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {filteredCars.length > visibleCars && (
            <div className="load-more">
              <button className="load-more-btn" onClick={loadMoreCars}>
                <FaPlus /> Show More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};