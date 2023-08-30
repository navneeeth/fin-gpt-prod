import React from 'react';
import { Link } from 'react-router-dom';
import './Download_template.css'; 
import Footer from './Footer.js';

const Download_temp = () => {
  return (
    <div className="container">
        <button className="back-button">
        <Link to="/" className="back-link">
          Back to Home
        </Link>
      </button>
      <h1>Download Template</h1>
      <div>
      <p className='middle'>This is a standard template we are using to access your data.</p>
         <p className='middle'>You can download the template by clicking this button</p></div>
         <Footer />
    </div>
  );
};
export default Download_temp;
