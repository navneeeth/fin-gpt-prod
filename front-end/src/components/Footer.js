import React from 'react';
import './HomePage.css'; 

function Footer() {
  return (
    <footer>
      <div className="container">
        <p className='size-note'>The ChatCompletion API can provide responses to these use cases based on the 
          information and context available up until September 2021.
          For real-time market data or specific portfolio details, 
          you may need to integrate the API with external data sources or services.</p>
        <p className='size-footer'>&copy; 2023 FinGPT. All rights reserved.</p>

      </div>
    </footer>
  );
};

export default Footer;
