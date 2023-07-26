import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer.js';
import './MenuPage3.css';
import axios from 'axios';

const MenuPage3 = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const timestamp = new Date().toISOString();
      const questionNumberArray = [1, 2, 3, 4, 5];
      const type_variable = "Diversification Analysis";
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

export default MenuPage3;