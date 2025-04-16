import React from 'react';
import { useContext } from 'react';

// Componente per il terzo step: riflessi del vino
const ReflectionStep = ({ reflection, updateTastingData }) => {
  const handleChange = (value) => {
    updateTastingData(null, 'reflection', value);
    // Naviga automaticamente alla pagina successiva dopo la selezione
    setTimeout(() => {
      if (window.nextStep) window.nextStep();
    }, 300);
  };

  // Ottieni il tipo di vino dal contesto o dalle props
  const wineType = window.tastingData?.wineInfo?.type || '';

  // Opzioni per i riflessi in base al tipo di vino
  const getReflectionOptions = () => {
    switch (wineType) {
      case 'rosso':
        return [
          { value: 'violacei', label: 'Violacei' },
          { value: 'aranciati', label: 'Aranciati' },
          { value: 'nessuno', label: 'Nessun riflesso' }
        ];
      case 'bianco':
        return [
          { value: 'verdolini', label: 'Verdolini' },
          { value: 'dorati', label: 'Dorati' },
          { value: 'nessuno', label: 'Nessun riflesso' }
        ];
      case 'rosato':
        return [
          { value: 'ramati', label: 'Ramati' },
          { value: 'aranciati', label: 'Aranciati' },
          { value: 'nessuno', label: 'Nessun riflesso' }
        ];
      case 'spumante':
        return [
          { value: 'verdolini', label: 'Verdolini' },
          { value: 'dorati', label: 'Dorati' },
          { value: 'nessuno', label: 'Nessun riflesso' }
        ];
      default:
        return [
          { value: 'violacei', label: 'Violacei' },
          { value: 'aranciati', label: 'Aranciati' },
          { value: 'verdolini', label: 'Verdolini' },
          { value: 'dorati', label: 'Dorati' },
          { value: 'ramati', label: 'Ramati' },
          { value: 'nessuno', label: 'Nessun riflesso' }
        ];
    }
  };

  const reflectionOptions = getReflectionOptions();

  return (
    <div className="card">
      <h2>Riflessi del Vino</h2>
      <div className="option-buttons">
        {reflectionOptions.map((option) => (
          <button
            key={option.value}
            className={`option-button ${reflection === option.value ? 'selected' : ''}`}
            onClick={() => handleChange(option.value)}
          >
            <div className={`reflection-sample ${option.value}`}></div>
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReflectionStep;