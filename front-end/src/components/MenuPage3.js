import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer.js';
import './HomePage.css'; //

const MenuPage3 = () => {
  return (
    <div className="container">
      <button className="back-button">
        <Link to="/" className="back-link">
          Back to Home
        </Link>
      </button>
      <h1>Diversification Analysis</h1>
      <p>Users can assess the diversification of their portfolios and understand if 
        they are adequately spread across different asset classes, sectors, or geographic regions. 
        The model can analyze the allocation of assets, identify potential 
        concentration risks, and suggest adjustments to 
        improve diversification.</p>
        <p>Example user queries:<ul>
          <li>"How is my portfolio diversified across asset classes?"</li>
          <li>"Am I overexposed to a particular sector in my portfolio?"</li>
          <li>"What is the geographic allocation of my portfolio?"</li>
          </ul></p>
          <Footer />
    </div>
  );
};

export default MenuPage3;
