import React, { useState} from 'react';
import { Link,useNavigate} from 'react-router-dom';
import Footer from './Footer.js';
import './HomePage.css'; // Import the separate CSS file


const website_name = "https://fingpt-backend-07a26388d3cf.herokuapp.com/"; // Define your website name here
const Welcome = () => {
  const [apiKey, setApiKey] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');
  
  const navigate = useNavigate();

  const handleOpenAIKeyChange = (event) => {
    const key = event.target.value;
    setApiKey(key);
    // Reset the API key verification status when the key is changed
  };
 
    const verifyOpenAIKey = async () => {
      const isValidKey = await validateOpenAIKey(apiKey);
      if (isValidKey) {
        navigate('/home');
      }
      else
      {
        setVerificationStatus('API key not verified');
        console.log("not verified");      }
    };

    /*const validateOpenAIKey = (key) => {
      // Your validation logic here
      // For example, you can check if the key has a certain length or format
      if (key === 'AAAPJ') {
        return true;
      } else {
        return false;
      }
    };*/




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
  return (
    <div className="container">
      <h1>Welcome to the FinGPT App</h1>
      <p>
        This is an educational finance app that provides various tools and 
        analysis for managing investment portfolios.
      </p>
      <p> PLEASE PROVIDE YOUR OPEN AI API KEY TO PROCEED FURTHER AND SEE THE MENU</p>
      <div className="about">
        <Link to="/about" className="about-link">
          About
        </Link>
      </div>
  <div>
    <input
      style={{ color: 'blue' }}
      type="text"
      placeholder="Enter your OpenAI key"
      value={apiKey}
      onChange={handleOpenAIKeyChange}
    />
     <button onClick={verifyOpenAIKey}>Verify Key</button>
     <p>{verificationStatus}</p> {/* Display verification status */}
    </div>
      <Footer />
    </div>

  );
};

export default Welcome;
