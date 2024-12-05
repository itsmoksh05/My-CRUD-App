import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationPopup from '../components/ConfirmationPopup';
import LogoutSuccessCard from '../components/LogoutSuccessCard';

const Logout = () => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccessCard, setShowSuccessCard] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    setShowSuccessCard(true);
    setTimeout(() => {
      navigate('/login');
    }, 5000);
  };

  const handleConfirmLogout = () => {
    setShowConfirmation(false);
    handleLogout();
  };

  const handleCancelLogout = () => {
    setShowConfirmation(false);
  };

  const handleCloseSuccessCard = () => {
    setShowSuccessCard(false);
  };

  return (
    <>
      <button onClick={() => setShowConfirmation(true)} className="logout-btn">
        Logout
      </button>

      {showConfirmation && (
        <ConfirmationPopup
          message="Are you sure you want to log out?"
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />
      )}

      {showSuccessCard && (
        <LogoutSuccessCard
          message="You have logged out successfully! 
          You will be Automatically Redirect to Login Page"
          onClose={handleCloseSuccessCard}
        />
      )}
    </>
  );
};

export default Logout;
