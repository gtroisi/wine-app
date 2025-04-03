import React from 'react';

// Componente per le prospettive di consumo del vino
const ConsumptionStep = ({ consumption, updateTastingData }) => {
  const handleChange = (value) => {
    updateTastingData(null, 'consumption', value);
    // Naviga automaticamente alla pagina del resoconto finale dopo la selezione
    // Riduciamo il timeout per evitare problemi di rendering
    setTimeout(() => {
      if (window.nextStep) window.nextStep();
    }, 100);
  };

  // Opzioni per le prospettive di consumo
  const consumptionOptions = [
    { value: 'daBeveSubito', label: 'Da bere subito' },
    { value: 'breviProspettive', label: 'Brevi prospettive' },
    { value: 'medieProspettive', label: 'Medie prospettive' },
    { value: 'lungheProspettive', label: 'Lunghe prospettive' }
  ];

  return (
    <div className="card">
      <h2>Prospettive di Consumo</h2>
      
      <div className="option-buttons">
        {consumptionOptions.map((option) => (
          <button
            key={option.value}
            className={`option-button ${consumption === option.value ? 'selected' : ''}`}
            onClick={() => handleChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ConsumptionStep;