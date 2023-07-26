import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer.js';
import './HomePage.css'; //

const MenuPage5 = () => {
  return (
    <div className="container">
      <button className="back-button">
        <Link to="/" className="back-link">
          Back to Home
        </Link>
      </button>
      <h1>Scenario Analysis</h1>
      <p>Users can explore hypothetical scenarios and evaluate the potential
         impact on their portfolios. They can ask "what-if" questions related to market events, 
         changes in asset prices, or modifications to their investment strategies. 
         The model can simulate the effects of different scenarios and
         provide insights on the portfolio's performance under those conditions.</p>
         <p>Example user queries:<ul>
          <li>"What would be the impact on my portfolio if the stock market crashes by 20%?"</li>
          <li>"How would my portfolio perform if I increase my allocation to bonds by 10%?"</li>
          <li>"What happens to my portfolio if I add a new asset with a specific expected return and volatility?"</li>
          </ul></p>
          <Footer/>
    </div>
  );
};

export default MenuPage5;
