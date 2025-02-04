import React, { useState, useEffect } from 'react';
import './Process.css';

const introduction = {
  title: 'What is Plant Tissue Culture?',
  description:
    'Plant tissue culture is a technique used to grow plants in a controlled environment without soil. It allows rapid multiplication of identical plants from small tissues. This method is widely used for research, agriculture, and germplasm conservation, promoting disease-free propagation and developing new plant varieties.',
  image: 'intro.webp', // Replace with the actual image path
};

const steps = [
  { 
    title: 'Step 1: Tissue Selection', 
    description: 'Select a healthy tissue (such as leaves, stems, or buds) from the plant. The chosen tissue should be free from diseases and defects to ensure healthy growth. This initial selection is crucial for ensuring successful growth in later stages.', 
    image: 'step1.webp' 
  },
  { 
    title: 'Step 2: Sterilization', 
    description: 'Remove contaminants from the selected tissue. This step is essential to prevent fungal or bacterial growth. The sterilization process includes cleaning with chemicals such as ethanol or bleach to kill any microorganisms.', 
    image: 'step2.webp' 
  },
  { 
    title: 'Step 3: Media Preparation', 
    description: 'Prepare nutrient-rich media to support plant growth. This nutrient mix provides essential minerals, vitamins, and plant hormones that encourage tissue growth and development.', 
    image: 'step3.webp' 
  },
  { 
    title: 'Step 4: Inoculation', 
    description: 'Place the sterilized tissue onto the prepared media. This requires sterile handling techniques to avoid recontamination, and is a key step for ensuring the tissue starts to grow.', 
    image: 'step4.webp' 
  },
  { 
    title: 'Step 5: Incubation', 
    description: 'Maintain the tissue in a controlled environment with optimal temperature, light, and humidity. Proper incubation conditions are essential for healthy plant growth.', 
    image: 'step5.webp' 
  },
  { 
    title: 'Step 6: Multiplication', 
    description: 'Divide the growing tissue into smaller sections to create multiple identical plants. This step involves cutting and transferring sections to new media for further growth, improving efficiency.', 
    image: 'step6.webp' 
  },
  { 
    title: 'Step 7: Rooting and Acclimatization', 
    description: 'Transplant the rooted plantlets into soil or a different growth medium and gradually adapt them to external conditions. Acclimatization prepares the plants for outdoor environments.', 
    image: 'step7.webp' 
  },
];

const Process = () => {
  const [showSteps, setShowSteps] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleStartProcess = () => {
    setShowSteps(true);
    setCurrentStep(0);
  };

  useEffect(() => {
    if (showSteps && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep((prevStep) => prevStep + 1);
      }, 5000); // Move to the next step every 5 seconds
      return () => clearTimeout(timer);
    }
  }, [showSteps, currentStep]);

  return (
    <div className="process-container">
      <h1 className="title">{introduction.title}</h1>
      {!showSteps ? (
        <div className="introduction-section">
          <div className="intro-left">
            <img src={introduction.image} alt={introduction.title} className="intro-image" />
          </div>
          <div className="intro-right">
            <p>{introduction.description}</p>
            <button className="start-button" onClick={handleStartProcess}>
              Start Process
            </button>
          </div>
        </div>
      ) : (
        <div className="step-section">
          <h2 className="section-title">{steps[currentStep].title}</h2>
          <div className="step-content">
            <img src={steps[currentStep].image} alt={steps[currentStep].title} className="step-image" />
            <p className="step-description">{steps[currentStep].description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Process;
