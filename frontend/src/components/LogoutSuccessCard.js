import React, { useEffect } from 'react';
import '../styles/LogoutSuccessCard.css';

const LogoutSuccessCard = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="logout-success-card">
      <div className="logout-card-content">
        <h2>{message}</h2>
      </div>
    </div>
  );
};

export default LogoutSuccessCard;
