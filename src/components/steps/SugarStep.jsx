import React from 'react';

// Componente per il contenuto di zucchero del vino
const SugarStep = ({ sugar, updateTastingData }) => {
  const handleChange = (value) => {
    updateTastingData(null, 'sugar', value);
    
    // Naviga automaticamente alla pagina successiva dopo la selezione
    setTimeout(() => {
      if (window.nextStep) window.nextStep();
    }, 300);
  };

  // Opzioni per il contenuto di zucchero
  const sugarOptions = [
    { value: 'secco', label: 'Secco' },
    { value: 'tendenteAlDolce', label: 'Tendente al dolce' },
    { value: 'dolce', label: 'Dolce' },
    { value: 'moltoDolce', label: 'Molto dolce' }
  ];

  return (
    <div className="card">
      <h2>Zucchero</h2>
      
      <div className="option-buttons">
        {sugarOptions.map((option) => (
          <button
            key={option.value}
            className={`option-button ${sugar === option.value ? 'selected' : ''}`}
            onClick={() => handleChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SugarStep;