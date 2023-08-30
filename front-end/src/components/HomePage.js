import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer.js';
import './HomePage.css'; // Import the separate CSS file


const HomePage = () => {
  return (
    <div className="container">
      <h1>Welcome to the FinGPT App</h1>
      <p>
        This is an educational finance app that provides various tools and 
        analysis for managing investment portfolios.
      </p>
      <div className="about">
        <Link to="/about" className="about-link">
          About
        </Link>
      </div>
        <div className="menu">
          <Link to="/menu1" className="menu-item menu1 center-text">
            Performance Analysis
          </Link>
          <Link to="/menu2" className="menu-item menu2 center-text">
            Risk Assessment
          </Link>
          <Link to="/menu3" className="menu-item menu3 center-text">
            Diversification Analysis
          </Link>
          <Link to="/menu4" className="menu-item menu4 center-text">
            Optimization Queries
          </Link>
          <Link to="/menu5" className="menu-item menu5 center-text">
            Scenario Analysis
          </Link>
        </div>
      <Footer />
    </div>
  );
};

export default HomePage;