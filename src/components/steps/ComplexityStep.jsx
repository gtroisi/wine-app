import React from 'react';
import SliderInput from '../common/SliderInput';
import { useEffect } from 'react';

// Componente per la complessità del vino
const ComplexityStep = ({ complexity, updateTastingData }) => {
  // Opzioni per la complessità con punteggi associati
  const complexityOptions = [
    { value: 1, label: 'Facile', score: 12 },
    { value: 2, label: 'Facile', score: 13 },
    { value: 3, label: 'Complesso', score: 14 },
    { value: 4, label: 'Più che complesso', score: 15 },
    { value: 5, label: 'Ampio', score: 16 }
  ];

  useEffect(() => {
    if (!complexity) {
      const defaultOption = complexityOptions.find(opt => opt.value === 1);
      updateTastingData(null, 'complexity', {
        value: defaultOption.value,
        score: defaultOption.score,
        label: defaultOption.label
      });
    }
  }, [complexity]);
  
  // Valore corrente dello slider
  const currentValue = complexity ? complexity.value : 1;
  
  // Funzione per gestire il cambio di valore dello slider
  const handleChange = (value) => {
    const option = complexityOptions.find(opt => opt.value === value);
    if (option) {
      updateTastingData(null, 'complexity', { 
        value: option.value, 
        score: option.score,
        label: option.label
      });
    }
  };

  return (
    <div className="card">
      <h2>Complessità del Vino</h2>
      
      <SliderInput
        value={currentValue}
        min={1}
        max={5}
        onChange={handleChange}
        options={complexityOptions}
      />
    </div>
  );
};

export default ComplexityStep;