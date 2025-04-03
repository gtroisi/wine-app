import React from 'react';

// Componente per l'acidità del vino
const AcidityStep = ({ acidity, updateTastingData }) => {
  const handleChange = (value) => {
    updateTastingData(null, 'acidity', value);
    
    // Naviga automaticamente alla pagina successiva dopo la selezione
    setTimeout(() => {
      if (window.nextStep) window.nextStep();
    }, 300);
  };

  // Opzioni per l'acidità
  const acidityOptions = [
    { value: 'contenuto', label: 'Contenuto' },
    { value: 'fresco', label: 'Fresco' },
    { value: 'piuCheFresco', label: 'Più che fresco' },
    { value: 'moltoFresco', label: 'Molto fresco' }
  ];

  return (
    <div className="card">
      <h2>Acidità</h2>
      
      <div className="option-buttons">
        {acidityOptions.map((option) => (
          <button
            key={option.value}
            className={`option-button ${acidity === option.value ? 'selected' : ''}`}
            onClick={() => handleChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AcidityStep;