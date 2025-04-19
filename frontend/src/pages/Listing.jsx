// src/pages/Listing.js
import React, { useState } from "react";
import { FaCar, FaChevronDown, FaChevronUp, FaSearch, FaPlus } from "react-icons/fa";
import { carData } from "../data/CarData";
import "./Listing.css";

export const Listing = () => {
  const [visibleItems, setVisibleItems] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [priceRange, setPriceRange] = useState(2000);

  const filteredListings = carData.filter(car => {
    // Search filter
    const matchesSearch = 
      car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Brand filter
    const matchesBrand = selectedBrand === "All" || car.brand === selectedBrand;
    
    // Price filter
    const matchesPrice = car.price <= priceRange;
    
    return matchesSearch && matchesBrand && matchesPrice;
  });

  const displayedListings = filteredListings.slice(0, visibleItems);

  const loadMoreCars = () => {
    setVisibleItems(prev => prev + 6);
  };

  const brands = ["All", ...new Set(carData.map(car => car.brand))];

  return (
    <div className="listing-page-container">
      <h1 className="listing-page-title">
        <FaCar className="listing-page-icon-spacing" /> Available Cars
      </h1>
      
      <div className="listing-page-search-container">
        <FaSearch className="listing-page-search-icon" />
        <input
          type="text"
          placeholder="Search by car name or brand..."
          className="listing-page-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Brand Filter */}
      <div className="listing-page-filter-group">
        <label>Brand</label>
        <select 
          className="listing-page-select"
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          {brands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>

      {/* Price Filter */}
      <div className="listing-page-filter-group">
        <label>Max Price: {priceRange} DH/J</label>
        <input
          type="range"
          min="350"
          max="2000"
          value={priceRange}
          onChange={(e) => setPriceRange(parseInt(e.target.value))}
          className="listing-page-range-slider"
        />
        <div className="listing-page-price-labels">
          <span>350</span>
          <span>2000</span>
        </div>
      </div>

      <div className="listing-page-grid">
        {displayedListings.map((car) => (
          <div key={car.id} className="listing-page-card">
            <div className="listing-page-image-container">
              <img src={car.image} alt={`${car.brand} ${car.name}`} className="listing-page-car-image" />
              <div className="listing-page-price-badge">{car.price} DH/J</div>
            </div>
            <div className="listing-page-car-details">
              <h2 className="listing-page-car-brand">{car.brand}</h2>
              <h3 className="listing-page-car-model">{car.name}</h3>
              <p className="listing-page-car-type">{car.type}</p>
              <div className="listing-page-car-info">
                <span>{car.location}</span>
                <span>{car.transmission}</span>
                <span>{car.seats} seats</span>
              </div>
              <button className="listing-page-rent-button">
                Rent Now <FaCar className="listing-page-button-icon" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredListings.length > visibleItems && (
        <button className="listing-page-show-more-btn" onClick={loadMoreCars}>
          Show More <FaPlus className="listing-page-btn-icon" />
        </button>
      )}
    </div>
  );
};