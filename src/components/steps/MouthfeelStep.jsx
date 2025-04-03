import React from 'react';

// Componente per la chiusura di bocca del vino
const MouthfeelStep = ({ mouthfeel, updateTastingData }) => {
  // Opzioni per la chiusura di bocca
  const mouthfeelOptions = [
    { value: 1, label: 'Imprecisa' },
    { value: 2, label: 'Buona' },
    { value: 3, label: 'Precisa' },
    { value: 4, label: 'Elegante' }
  ];

  // Valore corrente
  const currentValue = mouthfeel ? mouthfeel.value : null;
  
  // Funzione per gestire il cambio di valore
  const handleChange = (option) => {
    updateTastingData(null, 'mouthfeel', { 
      value: option.value,
      label: option.label
    });
    
    // Naviga automaticamente alla pagina successiva dopo la selezione
    setTimeout(() => {
      if (window.nextStep) window.nextStep();
    }, 300);
  };

  return (
    <div className="card">
      <h2>Chiusura di Bocca</h2>
      
      <div className="option-buttons">
        {mouthfeelOptions.map((option) => (
          <button
            key={option.value}
            className={`option-button ${currentValue === option.value ? 'selected' : ''}`}
            onClick={() => handleChange(option)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MouthfeelStep;