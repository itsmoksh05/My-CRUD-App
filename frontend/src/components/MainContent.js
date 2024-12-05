import React from 'react';
import CreateItemForm from './MainContent/CreateItemForm';
import ReadItems from './MainContent/ReadItems';
import UpdateItem from './MainContent/UpdateItem';
import DeleteItem from './MainContent/DeleteItem';
import '../styles/MainContent.css';

const MainContent = ({ activeComponent, setActiveComponent }) => {

  const handleBackClick = () => {
    setActiveComponent(null);
  };

  return (
    <div className="main-content crud-form">
      {activeComponent && (
        <button onClick={handleBackClick} className="back-btn">
          Back to Home
        </button>
      )}

      {activeComponent === 'create' && <CreateItemForm />}
      {activeComponent === 'read' && <ReadItems />}
      {activeComponent === 'update' && <UpdateItem />}
      {activeComponent === 'delete' && <DeleteItem />}
      {!activeComponent &&
        <div className='content'>
          <strong>Welcome to My CRUD App</strong>
          <p>Fun with CRUD Operations :</p>
          <p>C ~{'>'} Create Item </p>
          <p>R ~{'>'} Read Item </p>
          <p>U ~{'>'} Update Item </p>
          <p>D ~{'>'} Delete Item</p>
        </div>
      }
    </div>
  );
};

export default MainContent;
