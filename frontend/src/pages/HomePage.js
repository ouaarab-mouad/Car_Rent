// src/pages/HomePage.js
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Car Rental</h1>
      <nav>
        <Link to="/register">Register</Link> | 
        <Link to="/login">Login</Link> | 
        <Link to="/dashboard">Dashboard</Link>
      </nav>
    </div>
  );
}