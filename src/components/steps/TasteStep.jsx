import React from 'react';

// Componente per il gusto del vino
const TasteStep = ({ taste, updateTastingData }) => {
  const handleChange = (value) => {
    updateTastingData(null, 'taste', value);
    // Naviga automaticamente alla pagina successiva dopo la selezione
    setTimeout(() => {
      if (window.nextStep) window.nextStep();
    }, 300);
  };

  // Opzioni per il gusto
  const tasteOptions = [
    { value: 'secco', label: 'Secco' },
    { value: 'abboccato', label: 'Abboccato' },
    { value: 'amabile', label: 'Amabile' },
    { value: 'dolce', label: 'Dolce' },
    { value: 'morbido', label: 'Morbido' },
    { value: 'fresco', label: 'Fresco' },
    { value: 'sapido', label: 'Sapido' },
    { value: 'tannico', label: 'Tannico' }
  ];

  return (
    <div className="card">
      <h2>Gusto del Vino</h2>
      
      <div className="option-buttons">
        {tasteOptions.map((option) => (
          <button
            key={option.value}
            className={`option-button ${taste === option.value ? 'selected' : ''}`}
            onClick={() => handleChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TasteStep;