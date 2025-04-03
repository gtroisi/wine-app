import React from 'react';

// Componente per il contenuto di alcool del vino
const AlcoholStep = ({ alcohol, updateTastingData }) => {
  const handleChange = (value) => {
    updateTastingData(null, 'alcohol', value);
    // Naviga automaticamente alla pagina successiva dopo la selezione
    setTimeout(() => {
      if (window.nextStep) window.nextStep();
    }, 300);
  };

  // Opzioni per il contenuto di alcool
  const alcoholOptions = [
    { value: 'contenuto', label: 'Contenuto' },
    { value: 'caldo', label: 'Caldo' },
    { value: 'piuCheCaldo', label: 'Più che caldo' },
    { value: 'moltoCaldo', label: 'Molto caldo' }
  ];

  return (
    <div className="card">
      <h2>Alcool</h2>
      
      <div className="option-buttons">
        {alcoholOptions.map((option) => (
          <button
            key={option.value}
            className={`option-button ${alcohol === option.value ? 'selected' : ''}`}
            onClick={() => handleChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AlcoholStep;