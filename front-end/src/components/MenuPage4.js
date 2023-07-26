import React from 'react';
import { Link } from 'react-router-dom';

const MenuPage4 = () => {
  return (
    <div className="container">
      <button className="back-button">
        <Link to="/" className="back-link">
          Back to Home
        </Link>
      </button>
      <h1>Optimization Queries</h1>
      <p>Users can seek suggestions on optimizing their portfolios based on their investment goals, risk tolerance, and market trends. The model can provide recommendations on asset allocation, rebalancing strategies, 
        and potential investment opportunities aligned with the user's 
        preferences</p>
        <p>
        Example user queries:<ul>
          <li>"How should I rebalance my portfolio to align with my target asset allocation?"</li>
          <li>  "What are some investment opportunities I should consider based on current market trends?"</li>
          <li>"How can I optimize my portfolio for income generation?"</li>
        </ul>
        </p>
    </div>
  );
};

export default MenuPage4;
