import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Researchs.css'; 

const Researchs = () => {
    return (
        <div className="research-section">
            <h1>Research</h1>
            <div className="container">
                <div className="left-container predict-medium">
                    <h2>Predict Medium</h2>
                    <p>Discover the most effective methods for predicting crop yields and optimizing resources.</p>
                    <Link to="/ResearchMedia" className="btn">View Prediction Medium</Link> {/* Use Link here */}
                </div>
                <div className="right-container success-rate">
                    <h2>Regenerate Success Rate</h2>
                    <p>Learn about the strategies to enhance success rates in crop regeneration and sustainable practices.</p>
                    <Link to="/ResearchRate" className="btn">Get success rate Insights</Link> {/* Use Link here */}
                </div>
            </div>
        </div>
    );
};

export default Researchs;
