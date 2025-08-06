import React from 'react';
import { FiHome } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import MiniNavbar from '../components/MiniNavbar';
import './Pages.css';

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />

      
      <main className="home-content">
        <div className="container">
          <h1>Welcome to Flora Shop</h1>
          <p>Your one-stop destination for beautiful flowers!</p>
          
          <div className="hero-section">
            <h2>Fresh Flowers, Beautiful Arrangements</h2>
            <p>Discover our wide selection of fresh flowers for every occasion.</p>
          </div>
          
          {/* Add more home page content here */}
        </div>
      </main>
    </div>
  );
};

export default Home;
