import { Link } from "react-router-dom";
import React from 'react';
import logo from '../styles/images/Sf5logo.webp'
import '../styles/style.css'

function NavBar() {
  const token = window.localStorage.getItem('token');
  if(token){
    const tokenData = JSON.parse(atob(token.split('.')[1]));
    if (tokenData.exp > new Date()/1000) {
      return (
        <nav className="navbar">
          <Link to="/">
            <img src={logo} alt='Street Fighter logo' height={'75rem'}>
            </img>
          </Link>
          <Link to="/">Character Selection</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/profile">{tokenData.metadata.userName}</Link>
        </nav>
      );
    }
  }

  return (
    <nav className="navbar">
      <Link to="/">
        <img src={logo} alt='Street Fighter logo' height={'75rem'}>
        </img>
      </Link>
      <Link to="/">Character Selection</Link>
      <Link to="/resources">Resources</Link>
      <Link to="/login">Log in or Create Account</Link>
    </nav>
  );
}

export default NavBar;
