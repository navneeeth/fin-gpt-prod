import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';
import Footer from './Footer.js';
import picture from '../images/SamplePic.png';

const AboutPage = () => {
  return (
    <div className="container">
      <button className="back-button">
        <Link to="/Home" className="back-link">
          Back to Home
        </Link>
      </button>
      <h1>About</h1>
      <div>
        <p className="download">
          It is an interactive educational platform using the ChatCompletion API,
          where users can ask questions about financial concepts, investment strategies,
          or specific stocks.
        </p>
        <p className="download">
          The model can provide detailed explanations, clarify complex topics, and offer
          insights based on historical data, helping users enhance their understanding of
          financial markets and investment principles.
        </p>
        <p className="download">
          We have curated a template for you. You can download the CSV and see what an
          example investment portfolio looks like.
        </p>
        <a
          className="download"
          href="/sample.csv" // Replace with the actual path to your CSV file
          download="sample.csv"
        >
          Download CSV
        </a>
        <img
          src={picture} // Use the imported image variable
          alt="About"
          className="about-image"
        />
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
