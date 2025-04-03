import React from 'react';

// Componente per il secondo step: colore del vino
const ColorStep = ({ wineType, color, updateTastingData }) => {
  const handleChange = (value) => {
    updateTastingData(null, 'color', value);
    // Naviga automaticamente alla pagina successiva dopo la selezione
    setTimeout(() => {
      if (window.nextStep) window.nextStep();
    }, 300);
  };

  // Opzioni di colore in base alla tipologia di vino
  const getColorOptions = () => {
    switch (wineType) {
      case 'bianco':
      case 'spumante':
        return [
          { value: 'paglierino', label: 'Paglierino' },
          { value: 'dorato', label: 'Dorato' },
          { value: 'aranciato', label: 'Aranciato' }
        ];
      case 'rosato':
        return [
          { value: 'cerasuolo', label: 'Cerasuolo' },
          { value: 'ramato', label: 'Ramato' }
        ];
      case 'rosso':
        return [
          { value: 'porpora', label: 'Porpora' },
          { value: 'rubino', label: 'Rubino' },
          { value: 'granato', label: 'Granato' }
        ];
      default:
        return [];
    }
  };

  const colorOptions = getColorOptions();

  return (
    <div className="card">
      <h2>Colore del Vino</h2>
      <div className="option-buttons">
        {colorOptions.map((option) => (
          <button
            key={option.value}
            className={`option-button ${color === option.value ? 'selected' : ''}`}
            onClick={() => handleChange(option.value)}
          >
            <div className={`color-sample ${option.value}`}></div>
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorStep;