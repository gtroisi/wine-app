import React from 'react';
import cupoPng from '../../assets/cupo.png';
import vivacePng from '../../assets/vivace.png';
import luminosoPng from '../../assets/luminoso.png';

const BrightnessStep = ({ brightness, updateTastingData }) => {
  const handleChange = (value) => {
    updateTastingData(null, 'brightness', value);
    setTimeout(() => {
      if (window.nextStep) window.nextStep();
    }, 300);
  };

  const brightnessOptions = [
    { value: 'cupo', label: 'Cupo', image: cupoPng },
    { value: 'vivace', label: 'Vivace', image: vivacePng },
    { value: 'luminoso', label: 'Luminoso', image: luminosoPng }
  ];

  return (
    <div className="card">
      <h2>Vivacità del Vino</h2>
      <div className="option-buttons">
        {brightnessOptions.map((option) => (
          <button
            key={option.value}
            className={`option-button brightness-box ${brightness === option.value ? 'selected' : ''}`}
            onClick={() => handleChange(option.value)}
          >
            <img src={option.image} alt={option.label} className="brightness-img" />
            <span className="brightness-label">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BrightnessStep;