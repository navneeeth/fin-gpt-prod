import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer.js';
import './HomePage.css'; //

const MenuPage1 = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const submitQuestionAnswer = () => {
    // Perform any necessary logic with the question and answer
    console.log('Question:', question);
    console.log('Answer:', answer);
  };

  return (
    <div className="container">
      <button className="back-button">
        <Link to="/" className="back-link">
          Back to Home
        </Link>
      </button>
      <h1>Performance Analysis</h1>
      <p>Users can ask questions about the historical performance of their investment portfolios. 
        They can inquire about the overall returns, individual asset performance, 
        and compare their portfolio's performance to a benchmark or market index. 
        The model can provide insights on the portfolio's performance over different 
        time periods, highlight the best and worst-performing assets, and 
        offer suggestions for improving performance.</p>
      <p>Example user queries:
      <ul>
        <li>"How has my portfolio performed over the past year?"</li>
        <li>"What are the top-performing assets in my portfolio?"</li>
        <li>"Compare my portfolio's performance to the S&amp;P 500 index."</li>
      </ul></p>

      <div className="text-area-container">
        <textarea
          className="question-textarea"
          placeholder="Enter your question"
          value={question}
          onChange={handleQuestionChange}
          style={{ display: selectedOption === 'ask' ? 'block' : 'none' }}
        ></textarea>
        <input
          type="file"
          className="file-input"
          style={{ display: selectedOption === 'upload' ? 'block' : 'none' }}
        />
      </div>
      <div className="dropdown-container">
        <select className="dropdown-menu" value={selectedOption} onChange={handleOptionChange}>
          <option value="">Select an option</option>
          <option value="ask">Ask a question</option>
          <option value="upload">Upload a file</option>
        </select>
      </div>
      
      <div className="button-container">
        <button className="submit-button" onClick={submitQuestionAnswer}>Submit</button>
      </div>
      <Footer />
    </div>
  );
};

export default MenuPage1;
