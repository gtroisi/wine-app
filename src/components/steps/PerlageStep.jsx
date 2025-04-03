import React from 'react';

// Componente per il settimo step: perlage (solo per spumanti)
const PerlageStep = ({ perlage, updateTastingData }) => {
  const handleChange = (value) => {
    updateTastingData(null, 'perlage', value);
  };

  // Opzioni per il perlage
  const perlageOptions = [
    { value: 'fine', label: 'Fine' },
    { value: 'medio', label: 'Medio' },
    { value: 'grossolano', label: 'Grossolano' }
  ];

  return (
    <div className="card">
      <h2>Perlage (Grana delle Bollicine)</h2>
      <p className="info-text">Questo parametro si valuta solo per i vini spumanti</p>
      
      <div className="perlage-options">
        {perlageOptions.map((option) => (
          <div className="perlage-option" key={option.value}>
            <input
              type="radio"
              id={`perlage-${option.value}`}
              name="wine-perlage"
              value={option.value}
              checked={perlage === option.value}
              onChange={() => handleChange(option.value)}
            />
            <label htmlFor={`perlage-${option.value}`}>
              <div className={`perlage-sample ${option.value}`}></div>
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerlageStep;