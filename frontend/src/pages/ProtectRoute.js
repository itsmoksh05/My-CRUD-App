import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      alert("Not Authorized !!!");
      setIsAuthorized(false);
    }
  }, [token]);

  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
