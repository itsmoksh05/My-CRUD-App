import React, { useState } from 'react';
import Header from '../components/Header';
import MainContent from '../components/MainContent';
import '../styles/HomePage.css';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

const HomePage = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleCreate = () => setActiveComponent('create');
  const handleRead = () => setActiveComponent('read');
  const handleUpdate = () => setActiveComponent('update');
  const handleDelete = () => setActiveComponent('delete');


  return (
    <div className="home-page">

      <NavBar nav='About' />
      <Header
        onCreate={handleCreate}
        onRead={handleRead}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
      <MainContent activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      <Footer />
    </div>
  );
};

export default HomePage;
