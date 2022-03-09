import { Link } from "react-router-dom";
import React from 'react';
import logo from '../styles/images/Sf5logo.webp'
import '../styles/style.css'

function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/">
        <img src={logo} alt='Street Fighter logo' height={'75rem'}>
        </img>
      </Link>
      <Link to="/">Character Selection</Link>
      <Link to="/resources">Resources</Link>
      {/* TODO: hide this if logged in */}
      <Link to="/login">Log in or Create Account</Link>
      {/* TODO: hide this if not logged in */}
      <Link to="/profile">Profile</Link>
    </nav>
  );
}

export default NavBar;
