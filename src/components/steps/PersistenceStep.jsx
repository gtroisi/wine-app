import React from 'react';
import SliderInput from '../common/SliderInput';

// Componente per la persistenza del vino
const PersistenceStep = ({ persistence, updateTastingData }) => {
  // Opzioni per la persistenza con punteggi associati
  const persistenceOptions = [
    { value: 1, label: 'Accettabile', score: 10 },
    { value: 2, label: 'Accettabile', score: 11 },
    { value: 3, label: 'Persistente', score: 12 },
    { value: 4, label: 'Persistente', score: 13 },
    { value: 5, label: 'Più che persistente', score: 14 },
    { value: 6, label: 'Più che persistente', score: 15 },
    { value: 7, label: 'Lungo', score: 16 }
  ];

  // Valore corrente dello slider
  const currentValue = persistence ? persistence.value : 1;
  
  // Funzione per gestire il cambio di valore dello slider
  const handleChange = (value) => {
    const option = persistenceOptions.find(opt => opt.value === value);
    if (option) {
      updateTastingData(null, 'persistence', { 
        value: option.value, 
        score: option.score,
        label: option.label
      });
    }
  };

  return (
    <div className="card">
      <h2>Persistenza</h2>
      
      <SliderInput
        value={currentValue}
        min={1}
        max={7}
        onChange={handleChange}
        options={persistenceOptions}
      />
    </div>
  );
};

export default PersistenceStep;