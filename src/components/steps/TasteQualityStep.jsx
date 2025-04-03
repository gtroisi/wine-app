import React from 'react';
import SliderInput from '../common/SliderInput';

// Componente per la qualità gustativa del vino
const TasteQualityStep = ({ tasteQuality, updateTastingData }) => {
  // Opzioni per la qualità gustativa con punteggi associati
  const qualityOptions = [
    { value: 1, label: 'Accettabile', score: 18 },
    { value: 2, label: 'Accettabile', score: 19 },
    { value: 3, label: 'Fine', score: 20 },
    { value: 4, label: 'Fine', score: 21 },
    { value: 5, label: 'Più che fine', score: 22 },
    { value: 6, label: 'Più che fine', score: 23 },
    { value: 7, label: 'Eccellente', score: 24 }
  ];

  // Valore corrente dello slider
  const currentValue = tasteQuality ? tasteQuality.value : 1;
  
  // Funzione per gestire il cambio di valore dello slider
  const handleChange = (value) => {
    const option = qualityOptions.find(opt => opt.value === value);
    if (option) {
      updateTastingData(null, 'tasteQuality', { 
        value: option.value, 
        score: option.score,
        label: option.label
      });
    }
    
    
  };

  return (
    <div className="card">
      <h2>Qualità Gustativa</h2>
      
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

export default TasteQualityStep;