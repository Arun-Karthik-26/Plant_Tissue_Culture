import React, { useState } from 'react';
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
    description:
      'Select a healthy tissue (such as leaves, stems, or buds) from the plant. This initial selection is crucial for ensuring successful growth in later stages.',
    image: 'step1.webp', // Replace with the actual image path
  },
  {
    title: 'Step 2: Sterilization',
    description:
      'Remove contaminants from the selected tissue. This step prevents fungal or bacterial growth by employing sterilization techniques.',
    image: 'step2.webp', // Replace with the actual image path
  },
  {
    title: 'Step 3: Media Preparation',
    description:
      'Prepare nutrient-rich media to support plant growth. This nutrient mix plays a critical role in the success of the tissue culture process.',
    image: 'step3.webp', // Replace with the actual image path
  },
  {
    title: 'Step 4: Inoculation',
    description:
      'Place the sterilized tissue onto the prepared media. Handle the tissue carefully to avoid contamination.',
    image: 'step4.webp', // Replace with the actual image path
  },
  {
    title: 'Step 5: Incubation',
    description:
      'Maintain the tissue in a controlled environment with optimal temperature and humidity. The incubation period is essential for plant growth.',
    image: 'step5.webp', // Replace with the actual image path
  },
  {
    title: 'Step 6: Multiplication',
    description:
      'Divide the growing tissue into smaller sections to create multiple identical plants. This step improves efficiency.',
    image: 'step6.webp', // Replace with the actual image path
  },
  {
    title: 'Step 7: Rooting and Acclimatization',
    description:
      'Transplant the rooted plantlets into soil or growth media and gradually adapt them to external conditions.',
    image: 'step7.webp', // Replace with the actual image path
  },
];

const Process = () => {
  const [showSteps, setShowSteps] = useState(false);

  const handleStartProcess = () => {
    setShowSteps(true);
  };

  return (
    <div className="process-container">
      <h1 className="title">{introduction.title}</h1>
      {!showSteps ? (
        <div className="introduction-section">
          <img src={introduction.image} alt={introduction.title} className="intro-image" />
          <div className="intro-content">
            <p>{introduction.description}</p>
            <button className="start-button" onClick={handleStartProcess}>
              Start Process
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="section-title">Step-by-Step Procedure of Plant Tissue Culture</h2>
          <div className="cards">
            {steps.map((step, index) => (
              <div className="card" key={index}>
                <img src={step.image} alt={step.title} className="card-image" />
                <div className="card-content">
                  <h2>{step.title}</h2>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Process;
