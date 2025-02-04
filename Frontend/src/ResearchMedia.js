import React, { useState } from 'react';
import axios from 'axios';
import './research.css'; // Import the CSS file for styles

const ResearchMedia = () => {
    const [nutrientRequirement, setNutrientRequirement] = useState('');
    const [hormoneRequirement, setHormoneRequirement] = useState('');
    const [temperature, setTemperature] = useState('');
    const [pHLevel, setPHLevel] = useState('');
    const [lightIntensity, setLightIntensity] = useState('');
    const [contaminationSensitivity, setContaminationSensitivity] = useState('');
    const [plantValue, setPlantValue] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    const plants = {
        Orchid: 1,
        Rose: 2,
        Tomato: 3,
        Bamboo: 4,
        Cactus: 5,
        Fern: 6,
        Wheat: 7,
        Mango: 8,
        Apple: 9,
        Tulip: 10,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const inputData = {
            Plant_name: parseInt(plantValue, 10),
            Nutrient_Requirement: parseFloat(nutrientRequirement),
            Hormone_Requirement: parseFloat(hormoneRequirement),
            Temperature: parseFloat(temperature),
            pH_Level: parseFloat(pHLevel),
            Light_Intensity: parseFloat(lightIntensity),
            Contamination_Sensitivity: parseInt(contaminationSensitivity, 10),
        };

        try {
            const response = await axios.post('http://127.0.0.1:5000/predict', inputData);
            setResult(`Recommended Media: ${response.data.recommended_media}`);
        } catch (error) {
            console.error('Error predicting media:', error);
            setError(error.response ? error.response.data.error : 'Unknown error');
            setResult('');
        }
    };

    return (
        <div className="app-container">
            <h1 className="title">Medium Prediction</h1>
            <form onSubmit={handleSubmit} className="input-form">
                <select
                    value={plantValue}
                    onChange={(e) => setPlantValue(e.target.value)}
                    required
                    className="input-field"
                >
                    <option value="" disabled>Select a Plant</option>
                    {Object.entries(plants).map(([name, value]) => (
                        <option key={value} value={value}>
                            {name}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    placeholder="Nutrient Requirement (mg/L)"
                    value={nutrientRequirement}
                    onChange={(e) => setNutrientRequirement(e.target.value)}
                    required
                    className="input-field"
                />

                <input
                    type="number"
                    placeholder="Hormone Requirement (mg/L)"
                    value={hormoneRequirement}
                    onChange={(e) => setHormoneRequirement(e.target.value)}
                    required
                    className="input-field"
                />

                <input
                    type="number"
                    placeholder="Temperature (°C)"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                    required
                    className="input-field"
                />

                <input
                    type="number"
                    placeholder="pH Level"
                    value={pHLevel}
                    onChange={(e) => setPHLevel(e.target.value)}
                    required
                    className="input-field"
                />

                <input
                    type="number"
                    placeholder="Light Intensity (lux)"
                    value={lightIntensity}
                    onChange={(e) => setLightIntensity(e.target.value)}
                    required
                    className="input-field"
                />

                <input
                    type="number"
                    placeholder="Contamination Sensitivity"
                    value={contaminationSensitivity}
                    onChange={(e) => setContaminationSensitivity(e.target.value)}
                    required
                    className="input-field"
                />

                <button type="submit" className="submit-button">
                    Predict
                </button>
            </form>

            {result && <p className="result">{result}</p>}
            {error && <p className="error">{error}</p>} 
        </div>
    );
};

export default ResearchMedia;
