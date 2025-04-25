import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Listing } from "./pages/Listing";
import { Navbar } from "./fixed/Navbar";
import { Profile } from "./pages/Profile";
import { SearchFilter } from "./pages/SearchFilter";
import { DetailCar } from "./pages/DetailCar";
import { Footer } from "./fixed/Footer";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/listing" element={<Listing />} />
            <Route path="/search" element={<SearchFilter />} />
            <Route path="/car/:id" element={<DetailCar />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;