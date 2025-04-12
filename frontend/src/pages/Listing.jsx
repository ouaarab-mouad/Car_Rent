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
    <div className="listing-container">
      <h1 className="listing-title">
        <FaCar className="icon-spacing" /> Available Cars
      </h1>
      
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by brand or model..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="listing-grid">
        {displayedListings.map((item, index) => (
          <div key={index} className="listing-card">
            <div className="image-container">
              <img src={item.image} alt={`${item.brand} ${item.model}`} className="car-image" />
              <div className="price-badge">{item.price}</div>
            </div>
            <div className="car-details">
              <h2 className="car-brand">{item.brand}</h2>
              <h3 className="car-model">{item.model}</h3>
              <button className="rent-button">
                Rent Now <FaCar className="button-icon" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredListings.length > 4 && (
        <button className="show-more-btn" onClick={toggleShowMore}>
          {visibleItems === 4 ? (
            <>
              Show More <FaChevronDown className="btn-icon" />
            </>
          ) : (
            <>
              Show Less <FaChevronUp className="btn-icon" />
            </>
          )}
        </button>
      )}
    </div>
  );
};
