import { Link, useNavigate } from "react-router-dom";
import React from 'react';
import logo from '../styles/images/Sf5logo.webp'
import home from '../styles/images/home.png'
import about from '../styles/images/about.png'
import login from '../styles/images/login.png'
import logout from '../styles/images/logout.png'
import profile from '../styles/images/profile.png'
import useMediaQuery from '../utils/screensize'


import '../styles/style.css'


function NavBar() {


  const navigation = useNavigate();
  const isMobile = useMediaQuery('(max-width: 700px)');
  const isTablet = useMediaQuery('(max-width: 1025px)');

  const myStyle = {
    paddingBottom: isMobile ? '-2rem' : '1px',
    margin:  '0',
    width: '101vw',
    background: 'linear-gradient(#f51313, #ffd2a8,#f31919 )',
    borderBottom:' darkgrey solid 1px',
    position: 'fixed',
    display : 'flex',
    justifyContent: isMobile ?  'center' : '',
    top: '0',
    zIndex: '1'
  }

  const hidden = {
    display : isMobile ? 'none' : 'inline',
  }

  const mySubStyle={
    justifyContent:'space-between',
    display : isMobile ? 'inline-block' : 'row',
    paddingLeft: isMobile ? '.5rem' : isTablet ? '' : '2rem',
    paddingRight: isMobile ? '.5rem' : isTablet ? '4rem' : '2rem',
    fontSize: isMobile ? '1rem' : 'large',
  }
  const token = window.localStorage.getItem('token');
  if(token){
    const tokenData = JSON.parse(atob(token.split('.')[1]));
    if (tokenData.exp > new Date()/1000) {
      return (
        <nav className="navbar" style={myStyle}>
          <section>
            <Link to="/">
              <img src={logo} alt='Street Fighter logo' style={hidden} height='60vh'>
              </img>
            </Link>
          </section>
          <section>
            {/* TODO: character select borked between 701 and 756 px screen width, inclusive */}
            <Link  style={mySubStyle} to="/">{ isMobile ? <div> <img src={home} height='35rem' /> </div> : 'Characters' }</Link>
            <Link  style={mySubStyle} to="/resources">{isMobile ? <div> <img src={about} height='35rem'/> </div> : 'Links'}</Link>
            <Link  style={mySubStyle} to="/profile">{isMobile ? <div> <img src={profile} height='35rem'/> </div> : 'Profile'}</Link>
            <a  style={mySubStyle}onClick={() => {
              window.localStorage.removeItem('token');
              window.localStorage.removeItem('userInfo');
              navigation('/login');
            }}>{isMobile ? <div> <img src={logout} height='35rem'/> </div> : 'Log Out'}</a>
          </section>
        </nav>
      );
    }
  }

  return (
    <nav className="navbar" style={myStyle}>
      <section>
        <Link to="/">
          <img src={logo} alt='Street Fighter logo'style={hidden} height={'60vh'}>
          </img>
        </Link>
      </section>
      <section>
      <Link  style={mySubStyle}to="/">{ isMobile ? <div> <img src={home} height='35rem'/> </div> :'Character Selection'}</Link>
      <Link  style={mySubStyle}to="/resources">{ isMobile ? <div> <img src={about} height='35rem'/> </div> :'Resources'}</Link>
      <Link  style={mySubStyle}to="/login">{ isMobile ? <div> <img src={login} height='35rem'/> </div> :'Log in'}</Link>
      </section>
    </nav>
  );
}

export default NavBar;
