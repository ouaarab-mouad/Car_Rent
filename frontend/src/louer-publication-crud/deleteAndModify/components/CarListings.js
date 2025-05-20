import React from 'react';
import CarCard from './CarCard';
import './CarListings.css';

function CarListings({ cars, onDelete }) {
  return (
    <div className="car-listings">
      {cars.map(car => (
        <CarCard
          key={car.id}
          car={car}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default CarListings;