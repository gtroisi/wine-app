import React from 'react';

// Componente per il tannino del vino
const TanninStep = ({ tannin, updateTastingData }) => {
  const handleChange = (value) => {
    updateTastingData(null, 'tannin', value);
    
    // Naviga automaticamente alla pagina successiva dopo la selezione
    setTimeout(() => {
      if (window.nextStep) window.nextStep();
    }, 300);
  };

  // Opzioni per il tannino
  const tanninOptions = [
    { value: 'amaro', label: 'Amaro' },
    { value: 'vegetale', label: 'Vegetale' },
    { value: 'maturo', label: 'Maturo' },
    { value: 'raffinato', label: 'Raffinato' }
  ];

  return (
    <div className="card">
      <h2>Tannino</h2>
      
      <div className="option-buttons">
        {tanninOptions.map((option) => (
          <button
            key={option.value}
            className={`option-button ${tannin === option.value ? 'selected' : ''}`}
            onClick={() => handleChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TanninStep;