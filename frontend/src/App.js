import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';
import HomePage from './pages/HomePage';
import About from './pages/About';
import ProtectedRoute from './pages/ProtectRoute';

function App() {

  return (


    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>} />
        <Route path='about' element={
          <ProtectedRoute>
            <About />
          </ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
