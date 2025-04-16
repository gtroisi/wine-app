import React from 'react';
import SliderInput from '../common/SliderInput';
import { useEffect } from 'react';

// Componente per la qualità del vino (nuova versione)
const NewQualityStep = ({ quality, updateTastingData }) => {
  // Opzioni per la qualità con punteggi associati
  const qualityOptions = [
    { value: 1, label: 'Accettabile', score: 14 },
    { value: 2, label: 'Accettabile', score: 15 },
    { value: 3, label: 'Fine', score: 16 },
    { value: 4, label: 'Fine', score: 17 },
    { value: 5, label: 'Più che fine', score: 18 },
    { value: 6, label: 'Più che fine', score: 19 },
    { value: 7, label: 'Eccellente', score: 20 }
  ];

  useEffect(() => {
    if (!quality) {
      const defaultOption = qualityOptions.find(opt => opt.value === 1);
      updateTastingData(null, 'quality', {
        value: defaultOption.value,
        score: defaultOption.score,
        label: defaultOption.label
      });
    }
  }, [quality]);

  // Valore corrente dello slider
  const currentValue = quality ? quality.value : 1;
  
  // Funzione per gestire il cambio di valore dello slider
  const handleChange = (value) => {
    const option = qualityOptions.find(opt => opt.value === value);
    if (option) {
      updateTastingData(null, 'quality', { 
        value: option.value, 
        score: option.score,
        label: option.label
      });
    }
  };

  return (
    <div className="card">
      <h2>Qualità Olfattiva</h2>
      
      <SliderInput
        value={currentValue}
        min={1}
        max={7}
        onChange={handleChange}
        options={qualityOptions}
      />
    </div>
  );
};

export default NewQualityStep;