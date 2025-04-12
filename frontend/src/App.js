import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Navbar } from "./fixed/Navbar";
import { Footer } from "./fixed/Footer";

import './App.css'

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} ></Route>
      

    </Routes>
    <Footer/>
    </BrowserRouter>
  );
}
export default App; 