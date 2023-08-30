import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer.js';
import './MenuPage2.css';
import './HomePage.css';
import axios from 'axios';

const MenuPage2 = () => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const type_variable = "Performance Analysis";
  const website_name = "https://fingpt-backend-07a26388d3cf.herokuapp.com/"; // Define your website name here
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [fileUploaded, setFileUploaded] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [apiKeyVerified, setApiKeyVerified] = useState(false);
  const [question, setQuestion] = useState('');

  const fetchData = async () => {
    try {
      const timestamp = new Date().toISOString();
      const questionNumberArray = [1, 2, 3, 4, 5];
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

  const toggleAnswer = (index)=> {
    const updatedQuestions = [...questions];
    updatedQuestions[index].showAnswer = !updatedQuestions[index].showAnswer;
    setQuestions(updatedQuestions);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file.type === 'text/csv') {
      // The file is a CSV file
      setSelectedFile(file);
      setErrorMessage('');
    } else {
      // The file is not a CSV file
      setSelectedFile(null);
      setErrorMessage('Please choose a CSV file.');
    }
  };

  const handleFileUpload = async () => {
    
    if (selectedFile && apiKeyVerified) {
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('page_name', type_variable); // Replace with the actual page name
        formData.append('openai-id', apiKey); // Replace with the actual OpenAI key
  
        const response = await fetch(`${website_name}/validate-file`, {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
  
        if (data.status === 'success') {
          console.log("successfull");
          setFileUploaded(true);
        } else {
          console.log('API call returned an error:', data.error);
        }
      } catch (error) {
        console.error('Error during API call:', error);
      }
    } else {
      console.log('No file selected or API key not verified.');
    }
  }
  const handleOpenAIKeyChange = (event) => {
    const key = event.target.value;
    setApiKey(key);
    setApiKeyVerified(false); // Reset the API key verification status when the key is changed
  };

  const verifyOpenAIKey = async () => {
    // Your OpenAI API key validation logic here
    // For example, you can make an API call to validate the key
    // and set apiKeyVerified based on the response
    const isValidKey = validateOpenAIKey(apiKey);
    setApiKeyVerified(isValidKey);
  };

  const validateOpenAIKey = async (key) => {
    try {
      const response = await fetch(`${website_name}/validate-openai-id`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'openai-id': key }),
      });

      const data = await response.json();
  
      if (data.status === 'success') {
        console.log("API key verified");
        return true;
      } else {
        console.log("API key  not verified")
        return false;
      }
    } catch (error) {
      console.error('Error validating OpenAI key:', error);
      return false;
    }
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };
  const handleAskQuestion = () => {
    // Handle asking the question here
    // You can make an API call to your backend to get the answer using the question and selectedFile
    console.log('Question:', question);
    console.log('Selected File:', selectedFile);
    // Implement the logic to get the answer and show it to the user
  };

  return (
    <div className="container">
      <button className="back-button">
        <Link to="/Home" className="back-link">
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
      <p></p>

      {!apiKeyVerified ? (
        <div>
          <input
            type="text"
            placeholder="Enter your OpenAI key"
            value={apiKey}
            onChange={handleOpenAIKeyChange}
          />
          <button onClick={verifyOpenAIKey}>Verify Key</button>
        </div>
      ) : (
        <div>
          <input className="submit-button:hover" type="file" onChange={handleFileChange} />
          <button className="submit-button" onClick={handleFileUpload}>
            {fileUploaded ? 'File Uploaded' : 'Upload'}
          </button>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      )}
      {fileUploaded && (
        <div>
          <h2>Ask a Question:</h2>
          <input
            type="text"
            placeholder="Enter your question here"
            value={question}
            onChange={handleQuestionChange}
          />
          <button onClick={handleAskQuestion}>Ask</button>
        </div>
      )}
      <Footer />
    </div>
  );
};
export default MenuPage2;
