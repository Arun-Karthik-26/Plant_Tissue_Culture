import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About'; // Assuming Process.js contains your farmers' content
import Login from './Login'; // Create this component as needed
import './h.css'; // Your styles
import Register from './Register'; // Cr
import FeedBack from './FeedBack';
import Farm from './Farm';
import Homee from './Homee';
import Researchs from './Researchs';
import ResearchMedia from './ResearchMedia';
import ResearchRate from './ResearchRate';
import Navbar from './Navbar';
import CropRecomend from './crop_recomendation';
import Irrigation from './irrigation';

const App = () => {
  return (
    <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/homee" element={<Homee />} />
            <Route path="/about" element={<About />} />
            <Route path="/farmers" element={<Farm/>} />
            <Route path="/researchMedia" element={<ResearchMedia />} />
            <Route path="/researchRate" element={<ResearchRate />} />
            <Route path="/feedBack" element={<FeedBack />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/researchs" element={<Researchs />} />
            <Route path="/nav" element={<Navbar/>} />
            <Route path="/RecommendationCrop" element={<CropRecomend/>} />
            <Route path="/GetIrrigation" element={<Irrigation/>} />
          </Routes>
    </Router>
  );
};

export default App;
