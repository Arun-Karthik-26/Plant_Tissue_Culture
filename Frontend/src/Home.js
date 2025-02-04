import React from 'react';
import { useNavigate } from 'react-router-dom';
import './h.css';

const Home = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/login');
  };

  return (
    <div className="home-container">
      <header>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#farmers">Farming</a></li>
            <li><a href="#research">Research</a></li>
            <li><a href="#feedback">Feedback</a></li>
          </ul>
        </nav>
      </header>
      <div className="hero-section">
        <div className="content">
          <h1>Plant Tissue Culture</h1>
          <p>Your guide to understanding and implementing plant tissue culture techniques.</p>
          <button className="explore-button" onClick={handleExploreClick}>Explore More</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
