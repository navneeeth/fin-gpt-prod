import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer.js';
import './MenuPage4.css';
import axios from 'axios';

const MenuPage4 = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const timestamp = new Date().toISOString();
      const questionNumberArray = [1, 2, 3, 4, 5];
      const type_variable = "Optimization Queries";
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

export default MenuPage4;