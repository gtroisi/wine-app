import React from 'react';

// Componente per la sapidità percepita del vino
const SapidityStep = ({ sapidity, updateTastingData }) => {
  const handleChange = (value) => {
    updateTastingData(null, 'sapidity', value);
    // Naviga automaticamente alla pagina successiva dopo la selezione
    setTimeout(() => {
      if (window.nextStep) window.nextStep();
    }, 300);
  };

  // Opzioni per la sapidità percepita
  const sapidityOptions = [
    { value: 'nonAvvertibile', label: 'Non avvertibile' },
    { value: 'contenuto', label: 'Contenuto' },
    { value: 'sapido', label: 'Sapido' },
    { value: 'piuCheSapido', label: 'Più che sapido' }
  ];

  return (
    <div className="card">
      <h2>Sapidità Percepita</h2>
      
      <div className="option-buttons">
        {sapidityOptions.map((option) => (
          <button
            key={option.value}
            className={`option-button ${sapidity === option.value ? 'selected' : ''}`}
            onClick={() => handleChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SapidityStep;