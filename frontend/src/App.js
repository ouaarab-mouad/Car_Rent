import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Listing } from "./pages/Listing";
import { Navbar } from "./fixed/Navbar";
import {SearchFilter} from "./pages/SearchFilter";
import { Footer } from "./fixed/Footer";
import './App.css';
import { ListerUsers } from "./pages/Admin/ListerUsers";
import { UserDetails } from "./pages/Admin/UserDetails";

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
            <Route path="/admin/users" element={<ListerUsers/>} />
            <Route path="/admin/users/:id" element={<UserDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;