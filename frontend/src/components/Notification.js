import React, { useState, useEffect } from 'react';
import '../styles/Notification.css';

const Notification = ({ type = 'info', message, duration = 5000, onClose }) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, duration);

    const progressInterval = setInterval(() => {
      setProgress((prev) => prev - 100 / (duration / 100));
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [duration, onClose]);

  const notificationClass = `notification-${type}`;

  if (!visible) return null;

  return (
    <div className={notificationClass}>
      <button className="close-btn" onClick={() => { setVisible(false); onClose(); }}>✕</button>
      <p className='notification-message'>{message}</p>
      <div className="loading-line" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default Notification;
