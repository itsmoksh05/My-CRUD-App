import React from 'react';
import '../styles/About.css';
import NavBar from '../components/NavBar';

const About = () => {
  return (
    <div className="about-page">
      <NavBar nav='Home' />
      <header className="about-header">
        <h1>About My CRUD App</h1>
        <p>Your one-stop solution for managing items effortlessly</p>
      </header>

      <main className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            My CRUD App is designed to help users perform essential item management tasks with ease. From creating to
            reading, updating, and deleting items, we strive to make each step simple, secure, and user-friendly.
          </p>
        </section>
        <section className="about-section">
          <h2>Features</h2>
          <ul>
            <li>Create new items with necessary details</li>
            <li>Read and view items in an organized list</li>
            <li>Update existing items with just a few clicks</li>
            <li>Delete items easily when no longer needed</li>
          </ul>
        </section>
        <section className="about-section">
          <h2>Contact Us</h2>
          <p>
            Have any questions or feedback? Feel free to reach out to us at <a href="mailto:abc@example.com">abc@example.com</a>.
          </p>
        </section>
      </main>

      <footer className="about-footer">
        <p>&copy; 2024 My CRUD App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
