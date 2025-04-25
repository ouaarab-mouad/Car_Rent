import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchFilterTest.css';
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
  const [visibleCars, setVisibleCars] = useState(6);
  
  const navigate = useNavigate();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setBrandDropdownOpen(false);
      setLocationDropdownOpen(false);
      setCategoryDropdownOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Apply filters when any filter changes
  useEffect(() => {
    applyFilters();
  }, [selectedBrand, selectedLocation, priceRange, selectedColor, selectedCategories, selectedCondition, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleBrandDropdown = (e) => {
    e.stopPropagation();
    setBrandDropdownOpen(!brandDropdownOpen);
    setLocationDropdownOpen(false);
    setCategoryDropdownOpen(false);
  };

  const toggleLocationDropdown = (e) => {
    e.stopPropagation();
    setLocationDropdownOpen(!locationDropdownOpen);
    setBrandDropdownOpen(false);
    setCategoryDropdownOpen(false);
  };

  const toggleCategoryDropdown = (e) => {
    e.stopPropagation();
    setCategoryDropdownOpen(!categoryDropdownOpen);
    setBrandDropdownOpen(false);
    setLocationDropdownOpen(false);
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
    setSelectedColor(prevColor => prevColor === color ? '' : color);
    setVisibleCars(6);
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(cat => cat !== category) 
        : [...prev, category]
    );
    setVisibleCars(6);
  };

  const handleConditionChange = (condition) => {
    setSelectedCondition(condition);
    setVisibleCars(6);
  };

  const applyFilters = () => {
    let result = carData;
    
    if (searchQuery) {
      result = result.filter(car => 
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedBrand !== 'All') {
      result = result.filter(car => car.brand === selectedBrand);
    }
    
    if (selectedLocation !== 'All') {
      result = result.filter(car => car.location === selectedLocation);
    }
    
    result = result.filter(car => car.price <= priceRange);
    
    if (selectedColor) {
      result = result.filter(car => car.color === selectedColor);
    }
    
    if (selectedCategories.length > 0) {
      result = result.filter(car => 
        selectedCategories.some(category => car.category.includes(category))
      );
    }
    
    if (selectedCondition !== 'All') {
      result = result.filter(car => car.condition === selectedCondition);
    }
    
    setFilteredCars(result);
  };

  const loadMoreCars = () => {
    setVisibleCars(prev => prev + 6);
  };

  const handleCarClick = (carId) => {
    navigate(`/car/${carId}`);
  };

  const handleOwnerClick = (ownerName, e) => {
    e.stopPropagation();
    navigate(`/profile/${encodeURIComponent(ownerName)}`);
  };

  return (
    <div className="car-rental-container">
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

      <div className="main-content">
        <div className="filters-section">
          <h2>Filters</h2>

          {/* Brand Filter */}
          <div className="filter-group">
            <div className="dropdown-filter" onClick={toggleBrandDropdown}>
              <span>{selectedBrand}</span>
              <FaChevronDown className={brandDropdownOpen ? 'rotated' : ''} />
            </div>
            {brandDropdownOpen && (
              <div className="dropdown-menu" onClick={e => e.stopPropagation()}>
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
            <div className="dropdown-filter" onClick={toggleLocationDropdown}>
              <span>{selectedLocation}</span>
              <FaChevronDown className={locationDropdownOpen ? 'rotated' : ''} />
            </div>
            {locationDropdownOpen && (
              <div className="dropdown-menu" onClick={e => e.stopPropagation()}>
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
                    hidden
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
            <div className="dropdown-filter car-type-filter" onClick={toggleCategoryDropdown}>
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
              <div className="dropdown-menu" onClick={e => e.stopPropagation()}>
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
                  id="excellent" 
                  checked={selectedCondition === 'Excellent'} 
                  onChange={() => handleConditionChange('Excellent')}
                />
                <label htmlFor="excellent">Excellent</label>
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

        <div className="search-results">
          <h2>Résultat De Recherche</h2>
          {filteredCars.length === 0 ? (
            <div className="no-results">
              <p>Aucune voiture ne correspond à vos critères de recherche.</p>
            </div>
          ) : (
            <div className="car-grid">
              {filteredCars.slice(0, visibleCars).map(car => (
                <div key={car.id} className="car-card" onClick={() => handleCarClick(car.id)}>
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
                      <div className="rental-user" onClick={(e) => handleOwnerClick(car.rentedBy, e)}>
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