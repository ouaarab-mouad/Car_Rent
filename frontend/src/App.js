import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Listing } from "./pages/Listing";
import { Navbar } from "./fixed/Navbar";
import { SearchFilter } from "./pages/SearchFilter";
import { Footer } from "./fixed/Footer";
import './App.css';
import { ListerUsers } from "./pages/Admin/ListerUsers";
import { UserDetails } from "./pages/Admin/UserDetails";
import { PrivateRoute } from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import { Login } from "./pages/Auth/Login";
import { Register } from "./pages/Auth/Register";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/listing" element={<Listing />} />
              <Route path="/search" element={<SearchFilter />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected routes */}
              <Route path="/admin/users" element={
                <PrivateRoute>
                  <ListerUsers />
                </PrivateRoute>
              } />
              <Route path="/admin/users/:id" element={
                <PrivateRoute>
                  <UserDetails />
                </PrivateRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;