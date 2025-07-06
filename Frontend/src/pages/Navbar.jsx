/** @format */

import React, { useState } from "react";
import "./Navbar.css";
import logo from "../assets/Bhanulogo.png";
import { Link } from "react-router-dom"; // Add this at the top

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className='navbar'>
      <nav className='navbar-container'>
        {/* Logo */}
        <div className='navbar-logo'>
          <img src={logo} alt='Bhanu Clinic Logo' className='logo-img' />
          <h1>Bhanu Clinic</h1>
        </div>

        {/* Hamburger Icon */}
        <div className='hamburger' onClick={() => setMenuOpen(!menuOpen)}>
          <span className={menuOpen ? "bar open" : "bar"}></span>
          <span className={menuOpen ? "bar open" : "bar"}></span>
          <span className={menuOpen ? "bar open" : "bar"}></span>
        </div>

        {/* Links */}
        <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <li>
            <a href='/'>Home</a>
          </li>
          <li>
            <a href='/about'>About</a>
          </li>
          <li>
            <a href='/contact'>Contact</a>
          </li>
          <li>
            <a href='/login'>Signin</a>
          </li>

          <li>
            <Link to='/register' className='signup-btn'>
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
