import React from 'react';

// Componente per la dimensione del vino
const DimensionStep = ({ dimension, updateTastingData }) => {
  // Opzioni per la dimensione con punteggi associati
  const dimensionOptions = [
    { value: 1, label: 'Strutturato', score: 3 },
    { value: 2, label: 'Sottile', score: 3 },
    { value: 3, label: 'Distinto', score: 5 },
    { value: 4, label: 'Suggestivo', score: 6 }
  ];

  // Valore corrente
  const currentValue = dimension ? dimension.value : null;
  
  // Funzione per gestire il cambio di valore
  const handleChange = (option) => {
    updateTastingData(null, 'dimension', { 
      value: option.value, 
      score: option.score,
      label: option.label
    });
    
    // Naviga automaticamente alla pagina successiva dopo la selezione
    setTimeout(() => {
      if (window.nextStep) window.nextStep();
    }, 300);
  };

  return (
    <div className="card">
      <h2>Dimensione</h2>
      
      <div className="option-buttons">
        {dimensionOptions.map((option) => (
          <button
            key={option.value}
            className={`option-button ${currentValue === option.value ? 'selected' : ''}`}
            onClick={() => handleChange(option)}
          >
            {option.label} ({option.score})
          </button>
        ))}
      </div>
    </div>
  );
};

export default DimensionStep;