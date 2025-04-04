import React from 'react';

// Componente per il settimo step: perlage (solo per spumanti)
const PerlageStep = ({ perlage, updateTastingData }) => {
  const handleChange = (value) => {
    updateTastingData(null, 'perlage', value);
    
    // Naviga automaticamente alla pagina successiva dopo la selezione
    setTimeout(() => {
      if (window.nextStep) window.nextStep();
    }, 300);
  };

  // Opzioni per il perlage
  const perlageOptions = [
    { value: 'fine', label: 'Fine' },
    { value: 'medio', label: 'Medio' },
    { value: 'grossolano', label: 'Grossolano' }
  ];

  return (
    <div className="card">
      <h2>Perlage</h2>
      
      <div className="option-buttons">
        {perlageOptions.map((option) => (
          <button
            key={option.value}
            className={`option-button ${perlage === option.value ? 'selected' : ''}`}
            onClick={() => handleChange(option.value)}
          >
            <div className={`perlage-sample ${option.value}`}></div>
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PerlageStep;