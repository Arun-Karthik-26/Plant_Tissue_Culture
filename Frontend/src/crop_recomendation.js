import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const CropRecomend = () => {
    const [N, setN] = useState('');
    const [P, setP] = useState('');
    const [K, setK] = useState('');
    const [temperature, setTemperature] = useState('');
    const [humidity, setHumidity] = useState('');
    const [ph, setPh] = useState('');
    const [rainfall, setRainfall] = useState('');
    const [predictedCrop, setPredictedCrop] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://127.0.0.1:5000/predictcrop', {
                N: parseFloat(N),
                P: parseFloat(P),
                K: parseFloat(K),
                temperature: parseFloat(temperature),
                humidity: parseFloat(humidity),
                ph: parseFloat(ph),
                rainfall: parseFloat(rainfall),
            });
            setPredictedCrop(`🌾 Recommended Crop: ${response.data.predicted_crop}`);
        } catch (error) {
            console.error('Error predicting crop:', error);
            setError('❌ Failed to predict crop. Please try again.');
        }
    };

    return (
        <div className="app-container">
            <h1 className="title">🌱 Crop Recommendation System 🌱</h1>
            <form onSubmit={handleSubmit} className="crop-form">
                <label className="input-label">Nitrogen (N):
                    <input type="number" value={N} onChange={(e) => setN(e.target.value)} className="input-field" required />
                </label>
                <label className="input-label">Phosphorus (P):
                    <input type="number" value={P} onChange={(e) => setP(e.target.value)} className="input-field" required />
                </label>
                <label className="input-label">Potassium (K):
                    <input type="number" value={K} onChange={(e) => setK(e.target.value)} className="input-field" required />
                </label>
                <label className="input-label">Temperature (°C):
                    <input type="number" value={temperature} onChange={(e) => setTemperature(e.target.value)} className="input-field" required />
                </label>
                <label className="input-label">Humidity (%):
                    <input type="number" value={humidity} onChange={(e) => setHumidity(e.target.value)} className="input-field" required />
                </label>
                <label className="input-label">pH Level:
                    <input type="number" value={ph} onChange={(e) => setPh(e.target.value)} className="input-field" required />
                </label>
                <label className="input-label">Rainfall (mm):
                    <input type="number" value={rainfall} onChange={(e) => setRainfall(e.target.value)} className="input-field" required />
                </label>
                <button type="submit" className="submit-button">Get Recommendation</button>
            </form>
            {predictedCrop && <p className="result">{predictedCrop}</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default CropRecomend;
