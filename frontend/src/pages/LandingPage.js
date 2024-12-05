import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css'

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="outer-box">
        <h1>
          Welcome to <strong>
            <svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
              <text x="50%" y="50%" text-anchor="middle" dy=".35em" font-size="10rem" font-family="Arial">
                My-CRUD-App
              </text>
            </svg>
          </strong>
        </h1>
        <p>Your one-stop app for managing items securely.</p>
        <div>
          <Link to="/login" className="btn">Login</Link>
          <Link to="/signup" className="btn">Sign Up</Link>
        </div>
      </div>
    </div>


  );
};

export default LandingPage;
