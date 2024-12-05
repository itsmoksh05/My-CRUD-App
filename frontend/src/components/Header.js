import React from 'react';
import '../styles/Header.css';

const Header = ({ onCreate, onRead, onUpdate, onDelete }) => {
  return (
    <header className="header">
      <h1>My CRUD App</h1>
      <div className="header-buttons">
        <button onClick={onCreate}>Create</button>
        <button onClick={onRead}>Read</button>
        <button onClick={onUpdate}>Update</button>
        <button onClick={onDelete}>Delete</button>
      </div>  
    </header>
  );
};

export default Header;
