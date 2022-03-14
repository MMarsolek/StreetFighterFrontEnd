import { Link, useNavigate } from "react-router-dom";
import React from 'react';
import logo from '../styles/images/Sf5logo.webp'
import '../styles/style.css'


function NavBar() {
  const navigation = useNavigate();

  const myStyle = {
    paddingBottom: '1px',
    margin: '0',
    width: '100vw',
    background: 'linear-gradient(#f51313, #ffd2a8,#f31919 )',
    borderBottom:' darkgrey solid 1px',
    position: 'fixed',
    display : 'flex',
    justifyContent:'space-between',
    top: '0',
    zIndex: '1'
  }

  const mySubStyle={
    justifyContent:'space-between',
    paddingLeft: '2rem',
    paddingRight: '2rem'
  }
  const token = window.localStorage.getItem('token');
  if(token){
    const tokenData = JSON.parse(atob(token.split('.')[1]));
    if (tokenData.exp > new Date()/1000) {
      return (
        <nav className="navbar" style={myStyle}>
          <section>
            <Link to="/">
              <img src={logo} alt='Street Fighter logo' height={'60vh'}>
              </img>
            </Link>
          </section>
          <section>
            <Link  style={mySubStyle} to="/">Character Selection</Link>
            <Link  style={mySubStyle} to="/resources">Resources</Link>
            <Link  style={mySubStyle} to="/profile">{tokenData.metadata.userName}</Link>
            <a  style={mySubStyle}onClick={() => {
              window.localStorage.removeItem('token');
              window.localStorage.removeItem('userInfo');
              navigation('/login');
            }}>Log Out</a>

          </section>
        </nav>
      );
    }
  }

  return (
    <nav className="navbar" style={myStyle}>
      <section>
        <Link to="/">
          <img src={logo} alt='Street Fighter logo' height={'70rem'}>
          </img>
        </Link>
      </section>
      <section>
      <Link  style={mySubStyle}to="/">Character Selection</Link>
      <Link  style={mySubStyle}to="/resources">Resources</Link>
      <Link  style={mySubStyle}to="/login">Log in</Link>
      </section>
    </nav>
  );
}

export default NavBar;
