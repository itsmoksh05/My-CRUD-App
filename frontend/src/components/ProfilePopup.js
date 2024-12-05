import React, { useState } from 'react';
import '../styles/ProfilePopup.css';
import profileIcon from '../assets/user.png';
import Logout from '../pages/Logout';

const ProfilePopup = ({ username }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <div className="profile-section">
      <img
        src={profileIcon}
        alt="Profile"
        className="profile-icon"
        onClick={togglePopup}
      />

      {isPopupVisible && (
        <div className="profile-popup">
          <p>{username}</p>
          <Logout />
        </div>
      )}
    </div>
  );
};

export default ProfilePopup;
