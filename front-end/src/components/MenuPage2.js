import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer.js';
import './MenuPage2.css';
import axios from 'axios';

const MenuPage2 = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const timestamp = new Date().toISOString();
      const questionNumberArray = [1, 2, 3, 4, 5];
      const type_variable = "Risk Assessment ";
      const website_name = "https://fingpt-backend-07a26388d3cf.herokuapp.com/"; // Define your website name here

      const requests = questionNumberArray.map((questionNumber) =>
        axios.post(`${website_name}/get-data`, { // Use the website_name variable in the URL
          timestamp,
          question_number: questionNumber,
          type: type_variable,
        })
      );
      console.log("Request made");
      const responses = await axios.all(requests);
      const updatedQuestions = responses.reduce((acc, response) => {
        if (response.data.status === 'success') {
          response.data.showAnswer = false; // Add showAnswer property
          acc.push(response.data);
        }
        return acc;
      }, []);
      setQuestions(updatedQuestions);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const toggleAnswer = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].showAnswer = !updatedQuestions[index].showAnswer;
    setQuestions(updatedQuestions);
  };

  return (
    <div className="container">
      <button className="back-button">
        <Link to="/" className="back-link">
          Back to Home
        </Link>
      </button>
      <h1>Risk Assessment</h1>
      <p>Users can evaluate the risk associated with their investment portfolios.</p>
      <p>
        They can ask questions about the portfolio's volatility, exposure to different asset classes, and diversification.
      </p>
      <p>
        The model can provide risk metrics such as standard deviation, beta, and correlation coefficients, and offer insights
        on the portfolio's risk profile and potential vulnerabilities.
      </p>
      <p>Example user queries:
      <ul>
        <li>"What is the volatility of my portfolio?"</li>
        <li>"How diversified is my portfolio across different sectors?"</li>
        <li>"What is the correlation between stocks A and B in my portfolio?"</li>
      </ul></p>
      <div className="questions-container">
        {questions.map((question, index) => (
          <div key={index} className="question-container">
            <div className="question" onClick={() => toggleAnswer(index)}>
              {question.question}
            </div>
            {question.showAnswer && <div className="answer">{question.answer}</div>}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default MenuPage2;
