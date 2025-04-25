import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Listing } from "./pages/Listing";
import { Navbar } from "./fixed/Navbar";
import {SearchFilter} from "./pages/SearchFilter";
import { Footer } from "./fixed/Footer";
import CarDetailsForm  from "./louer-publication-crud/addcar"; 
import CarManagement from "./louer-publication-crud/deleteAndModify/app";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listing" element={<Listing />} />
            <Route path="/search" element={<SearchFilter />} />
            <Route path="/addcar" element={<CarDetailsForm />} />
            <Route path="/manage-cars" element={<CarManagement />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;