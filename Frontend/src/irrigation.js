import React, { useState } from 'react';
import axios from 'axios';
import './App.css';  // Import CSS for styling

const Irrigation = () => {
  const [cropType, setCropType] = useState('');
  const [cropDays, setCropDays] = useState('');
  const [soilMoisture, setSoilMoisture] = useState('');
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [prediction, setPrediction] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      CropType: cropType,
      CropDays: parseInt(cropDays),
      SoilMoisture: parseFloat(soilMoisture),
      Temperature: parseFloat(temperature),
      Humidity: parseFloat(humidity),
    };

    try {
      const response = await axios.post('http://127.0.0.1:5000/predictirrigation', payload);
      setPrediction(response.data.IrrigationStatus);
    } catch (error) {
      console.error("Error getting prediction:", error);
    }
  };

  return (
    <div className="prediction-form-container">
      <h1>Irrigation Prediction System</h1>
      <form className="prediction-form" onSubmit={handleSubmit}>
        <label>Crop Type:</label>
        <input
          type="text"
          value={cropType}
          onChange={(e) => setCropType(e.target.value)}
          required
        />
        
        <label>Crop Days:</label>
        <input
          type="number"
          value={cropDays}
          onChange={(e) => setCropDays(e.target.value)}
          required
        />
        
        <label>Soil Moisture:</label>
        <input
          type="number"
          step="0.01"
          value={soilMoisture}
          onChange={(e) => setSoilMoisture(e.target.value)}
          required
        />
        
        <label>Temperature:</label>
        <input
          type="number"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
          required
        />
        
        <label>Humidity:</label>
        <input
          type="number"
          step="0.01"
          value={humidity}
          onChange={(e) => setHumidity(e.target.value)}
          required
        />
        
        <button type="submit">Get Prediction</button>
      </form>

      {prediction && (
        <div className="prediction-result">
          <h2>{prediction}</h2>
        </div>
      )}
    </div>
  );
};

export default Irrigation;