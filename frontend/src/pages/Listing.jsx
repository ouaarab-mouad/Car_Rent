// src/pages/Listing.js
import React, { useState } from "react";
import { FaCar, FaChevronDown, FaChevronUp, FaSearch, FaPlus } from "react-icons/fa";
import { carData } from "../data/CarData";
import "./Listing.css";

export const Listing = () => {
  const [vehicles] = useState(carData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [priceRange, setPriceRange] = useState(2000);

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === "All" || vehicle.brand === selectedBrand;
    const matchesPrice = vehicle.price <= priceRange;
    return matchesSearch && matchesBrand && matchesPrice;
  });

  const brands = ["All", ...new Set(vehicles.map(vehicle => vehicle.brand))];

  return (
    <div className="listing-page-container">
      <h1 className="listing-page-title">
        <FaCar className="listing-page-icon-spacing" /> Available Cars
      </h1>
      
      <div className="listing-page-content-wrapper">
        {/* Left Side - Filters */}
        <div className="listing-page-filters-section">
          <div className="listing-page-search-container">
            <input
              type="text"
              className="listing-page-search-input"
              placeholder="Search cars..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

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
        </div>

        {/* Right Side - Cars Grid */}
        <div className="listing-page-content">
          <div className="listing-page-grid">
            {filteredVehicles.map((vehicle) => (
              <div key={vehicle.id} className="listing-page-card">
                <div className="listing-page-image-container">
                  <img src={vehicle.image} alt={vehicle.name} className="listing-page-car-image" />
                  <div className="listing-page-price-badge">{vehicle.price} DH/J</div>
                </div>
                <div className="listing-page-car-details">
                  <h3 className="listing-page-car-brand">{vehicle.brand}</h3>
                  <p className="listing-page-car-model">{vehicle.name}</p>
                  <p className="listing-page-car-type">{vehicle.type}</p>
                  <div className="listing-page-car-info">
                    <span>{vehicle.transmission}</span>
                    <span>{vehicle.fuel_type}</span>
                  </div>
                  <button className="listing-page-rent-button">
                    Rent Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;