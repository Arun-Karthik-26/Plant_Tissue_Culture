import React from 'react';
import './Farm.css'; 
import { Link } from 'react-router-dom';

const Farm = () => {
    return (
        <div className="farmers-section">
            <h1>Farming</h1>
            <div className="container">
                <div className="left-container crop-recommendation">
                    <h2>Crop Recommendation</h2>
                    <p>Here you can find the best crop recommendations based on soil type, weather, and market demand.</p>
                    <Link to="/RecommendationCrop" className="btn">View Recommendations</Link> {/* Use Link here */}
                </div>
                <div className="right-container irrigation">
                    <h2>Irrigation Information</h2>
                    <p>Get insights on optimal irrigation practices for your crops, including timing and methods.</p>
                    <Link to="/GetIrrigation" className="btn">Get Irrigation Tips</Link> {/* Use Link here */}
                </div>
            </div>
        </div>
    );
};

export default Farm;
