import React from 'react';

// Componente per il sesto step: vivacità del vino
const BrightnessStep = ({ brightness, updateTastingData }) => {
  const handleChange = (value) => {
    updateTastingData(null, 'brightness', value);
    
    // Naviga automaticamente alla pagina successiva dopo la selezione
    setTimeout(() => {
      if (window.nextStep) window.nextStep();
    }, 300);
  };

  // Opzioni per la vivacità
  const brightnessOptions = [
    { value: 'cupo', label: 'Cupo' },
    { value: 'vivace', label: 'Vivace' },
    { value: 'luminoso', label: 'Luminoso' }
  ];

  return (
    <div className="card">
      <h2>Vivacità del Vino</h2>
      
      <div className="option-buttons">
        {brightnessOptions.map((option) => (
          <button
            key={option.value}
            className={`option-button ${brightness === option.value ? 'selected' : ''}`}
            onClick={() => handleChange(option.value)}
          >
            <div className={`brightness-sample ${option.value}`}></div>
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BrightnessStep;