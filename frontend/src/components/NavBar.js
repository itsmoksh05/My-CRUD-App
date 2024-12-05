import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';
import ProfilePopup from './ProfilePopup';
import Logo from '../assets/logo-crud.webp';

function NavBar({ nav }) {

  const username = localStorage.getItem('username');
  let linkPath;

  if (nav === 'Home') {
    linkPath = '/home'
  } else if (nav === 'About') {
    linkPath = '/about';
  }

  return (
    <nav className="navbar">
      <img src={Logo} alt="Logo" className="logo" />

      <div className="profile-section">
        <Link to={linkPath} className='about'>{nav}</Link>
        <ProfilePopup username={username} />
      </div>
    </nav>
  );
}

export default NavBar;
