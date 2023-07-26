import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer.js';
import './MenuPage1.css';
import axios from 'axios';

const MenuPage1 = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const timestamp = new Date().toISOString();
      const questionNumberArray = [1, 2, 3, 4, 5];
      const type_variable = "Performance Analysis";
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

export default MenuPage1;