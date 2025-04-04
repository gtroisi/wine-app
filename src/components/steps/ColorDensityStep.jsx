import React from 'react';

// Componente per il quarto step: densità cromatica (solo per vini rossi)
const ColorDensityStep = ({ colorDensity, updateTastingData }) => {
  const handleChange = (value) => {
    updateTastingData(null, 'colorDensity', value);
    
    // Naviga automaticamente alla pagina successiva dopo la selezione
    setTimeout(() => {
      if (window.nextStep) window.nextStep();
    }, 300);
  };

  // Opzioni per la densità cromatica
  const densityOptions = [
    { value: 'trasparente', label: 'Trasparente' },
    { value: 'compatto', label: 'Compatto' }
  ];

  return (
    <div className="card">
      <h2>Densità Cromatica</h2>
      
      <div className="option-buttons">
        {densityOptions.map((option) => (
          <button
            key={option.value}
            className={`option-button ${colorDensity === option.value ? 'selected' : ''}`}
            onClick={() => handleChange(option.value)}
          >
          
              <div className={`density-sample ${option.value}`}></div>
              {option.label}
              </button>
        ))}
      </div>
    </div>
  );
};

export default ColorDensityStep;