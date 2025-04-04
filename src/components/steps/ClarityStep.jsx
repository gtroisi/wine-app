import React from 'react';

// Componente per il quinto step: limpidezza del vino
const ClarityStep = ({ clarity, updateTastingData }) => {
  const handleChange = (value) => {
    updateTastingData(null, 'clarity', value);
    
    // Naviga automaticamente alla pagina successiva dopo la selezione
    setTimeout(() => {
      if (window.nextStep) window.nextStep();
    }, 300);
  };

  // Opzioni per la limpidezza
  const clarityOptions = [
    { value: 'opaco', label: 'Opaco' },
    { value: 'limpido', label: 'Limpido' }
  ];

  return (
    <div className="card">
      <h2>Limpidezza del Vino</h2>
      
      <div className="option-buttons">
        {clarityOptions.map((option) => (
          <button
            key={option.value}
            className={`option-button ${clarity === option.value ? 'selected' : ''}`}
            onClick={() => handleChange(option.value)}
          >
            <div className={`clarity-sample ${option.value}`}></div>
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ClarityStep;