/** @format */

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "../src/pages/Hero";
import CaseSheetForm from "./Components/CaseSheetForm";
import CasesList from "./Components/CasesList";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";

function App() {
  return (
    <Router>  
      <Navbar />    
      <Routes>
        <Route path='/' element={<Hero />} />
        
        <Route path='/addcase' element={<CaseSheetForm />} />
        <Route path='/cases' element={<CasesList />} />
        {/* other routes */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
