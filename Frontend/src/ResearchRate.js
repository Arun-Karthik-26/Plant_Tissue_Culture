import React, { useState } from 'react';
import axios from 'axios';
import './ResearchRate.css';

function ResearchRate() {
    const [formData, setFormData] = useState({
        Explant_Type: '',
        Plant_Species: '',
        Medium_Composition: '',
        Temperature: '',
        Humidity: '',
        Light_Intensity: '',
        Culture_Duration: ''
    });

    const [prediction, setPrediction] = useState(null);
    const [predictedPercentageRange, setPredictedPercentageRange] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            const response = await axios.post('http://127.0.0.1:5000/predictrate', formData);
            setPrediction(response.data.predicted_class);
            setPredictedPercentageRange(response.data.predicted_percentage_range);
        } catch (error) {
            console.error("Error making prediction request", error);
            setPrediction('Error');
            setPredictedPercentageRange('');
        }
    };

    return (
        <div className="research-rate-container">
            <h2 className="research-rate-title">Plant Tissue Culture Prediction</h2>
            <form className="research-rate-form" onSubmit={handleSubmit}>
            <div className="form-group">
                    <label>Explant Type:</label>
                    <select
                        name="Explant_Type"
                        className="research-rate-input"
                        value={formData.Explant_Type}
                        onChange={handleChange}
                    >
                        <option value="">Select Explant Type</option>
                        <option value="Leaf">Leaf</option>
                        <option value="Stem">Stem</option>
                        <option value="Root">Root</option>
                        {/* Add more options as needed */}
                    </select>
                </div>

                <div className="form-group">
                    <label>Plant Species:</label>
                    <input
                        type="text"
                        name="Plant_Species"
                        className="research-rate-input"
                        value={formData.Plant_Species}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Medium Composition:</label>
                    <input
                        type="text"
                        name="Medium_Composition"
                        className="research-rate-input"
                        value={formData.Medium_Composition}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Temperature (°C):</label>
                    <input
                        type="number"
                        name="Temperature"
                        className="research-rate-input"
                        value={formData.Temperature}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Humidity (%):</label>
                    <input
                        type="number"
                        name="Humidity"
                        className="research-rate-input"
                        value={formData.Humidity}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Light Intensity (lux):</label>
                    <input
                        type="number"
                        name="Light_Intensity"
                        className="research-rate-input"
                        value={formData.Light_Intensity}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Culture Duration (days):</label>
                    <input
                        type="number"
                        name="Culture_Duration"
                        className="research-rate-input"
                        value={formData.Culture_Duration}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="research-rate-button">Predict</button>
            </form>

            {prediction !== null && (
                <div className="research-rate-result">
                    <h3>Predicted Regeneration Success Rate Class: {prediction}</h3>
                    <h4>Estimated Success Rate: {predictedPercentageRange}</h4>
                </div>
            )}
        </div>
    );
}

export default ResearchRate;
