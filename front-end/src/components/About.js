import React from 'react';
import { Link } from 'react-router-dom';
import './About.css'; 
import Footer from './Footer.js';

const AboutPage = () => {
  return (
    <div className="container">
        <button className="back-button">
        <Link to="/" className="back-link">
          Back to Home
        </Link>
      </button>
      <h1>About</h1>
      <div>
      <p className='middle'>It is an interactive educational platform 
        using the ChatCompletion API, where users can ask questions about financial concepts,
         investment strategies, or specific stocks.</p>
         <p className='middle'>The model can provide detailed explanations, 
         clarify complex topics, and offer insights based on historical data, helping users
         enhance their understanding of financial markets and investment principles</p></div>
         <Footer />
    </div>
  );
};

export default AboutPage;
