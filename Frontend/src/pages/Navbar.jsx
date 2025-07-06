/** @format */

import React, { useState } from "react";
import "./Navbar.css";
import logo from "../assets/Bhanulogo.png";

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
            <a href='/home'>Home</a>
          </li>
          <li>
            <a href='/about'>About</a>
          </li>
          <li>
            <a href='/contact'>Contact</a>
          </li>
          <li>
            <a href='/signin'>Signin</a>
          </li>
          <li>
            <button className='signup-btn'>Sign Up</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
