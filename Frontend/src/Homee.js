import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './h.css';

const Homee = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleExploreMore = () => {
    navigate('/about'); // Change this path to where you want to navigate
  };

  return (
    <div className="home-container">
      <header>
        <nav>
          <ul>
            <li><a href="/homee">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/farmers">Farming</a></li>
            <li><a href="/researchs">Research</a></li>
            <li><a href="/feedback">Feedback</a></li>
          </ul>
        </nav>
      </header>
      <div className="hero-section">
        <div className="content">
          <h1>Plant Tissue Culture</h1>
          <p>Your guide to understanding and implementing plant tissue culture techniques.</p>
          <button className="explore-button" onClick={handleExploreMore}>Explore More</button>
        </div>
      </div>
    </div>
  );
};

export default Homee;
