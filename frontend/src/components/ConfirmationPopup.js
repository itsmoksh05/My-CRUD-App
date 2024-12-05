import React from 'react';
import '../styles/ConfirmationPopup.css';

const ConfirmationPopup = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirmation-popup">
      <div className="popup-card">
        <h3>{message}</h3>
        <div className="popup-actions">
          <button onClick={onConfirm} className="confirm-btn">Confirm</button>
          <button onClick={onCancel} className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
