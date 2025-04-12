// src/pages/Listing.js
import React, { useState } from "react";
import { FaCar, FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa";
import "./Listing.css";

export const Listing = () => {
  const [visibleItems, setVisibleItems] = useState(4);
  const [searchTerm, setSearchTerm] = useState("");

  const allListings = [
    {
      brand: "Mercedes",
      model: "Screen",
      price: "$25 per day",
      image: "/images/cars/car1.png"
    },
    {
      brand: "Mercedes",
      model: "Sport",
      price: "$50 per day",
      image: "/images/cars/car1.png"
    },
    {
      brand: "Mercedes",
      model: "Screen",
      price: "$45 per day",
      image: "/images/cars/car1.png"
    },
    {
      brand: "Porsche",
      model: "SUV",
      price: "$40 per day",
      image: "/images/cars/car1.png"
    },
    {
      brand: "Toyota",
      model: "Sistian",
      price: "$35 per day",
      image: "/images/cars/car1.png"
    },
    {
      brand: "Porsche",
      model: "SUV",
      price: "$50 per day",
      image: "/images/cars/car1.png"
    },
  ];

  const filteredListings = allListings.filter(item =>
    item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedListings = filteredListings.slice(0, visibleItems);

  const toggleShowMore = () => {
    if (visibleItems === 4) {
      setVisibleItems(filteredListings.length);
    } else {
      setVisibleItems(4);
    }
  };

  return (
    <div className="listing-page-container">
      <h1 className="listing-page-title">
        <FaCar className="listing-page-icon-spacing" /> Available Cars
      </h1>
      
      <div className="listing-page-search-container">
        <FaSearch className="listing-page-search-icon" />
        <input
          type="text"
          placeholder="Search by brand or model..."
          className="listing-page-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="listing-page-grid">
        {displayedListings.map((item, index) => (
          <div key={index} className="listing-page-card">
            <div className="listing-page-image-container">
              <img src={item.image} alt={`${item.brand} ${item.model}`} className="listing-page-car-image" />
              <div className="listing-page-price-badge">{item.price}</div>
            </div>
            <div className="listing-page-car-details">
              <h2 className="listing-page-car-brand">{item.brand}</h2>
              <h3 className="listing-page-car-model">{item.model}</h3>
              <button className="listing-page-rent-button">
                Rent Now <FaCar className="listing-page-button-icon" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredListings.length > 4 && (
        <button className="listing-page-show-more-btn" onClick={toggleShowMore}>
          {visibleItems === 4 ? (
            <>
              Show More <FaChevronDown className="listing-page-btn-icon" />
            </>
          ) : (
            <>
              Show Less <FaChevronUp className="listing-page-btn-icon" />
            </>
          )}
        </button>
      )}
    </div>
  );
};