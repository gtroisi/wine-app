import React from 'react';
import SliderInput from '../common/SliderInput';
import { useEffect } from 'react';

// Componente per l'equilibrio del vino
const BalanceStep = ({ balance, updateTastingData }) => {
  // Opzioni per l'equilibrio con punteggi associati
  const balanceOptions = [
    { value: 1, label: 'Squilibrato', score: 12 },
    { value: 2, label: 'Squilibrato', score: 13 },
    { value: 3, label: 'In fase di equilibrio', score: 14 },
    { value: 4, label: 'In fase di equilibrio', score: 15 },
    { value: 5, label: 'Bilanciato', score: 16 },
    { value: 6, label: 'Bilanciato', score: 17 },
    { value: 7, label: 'Equilibrato', score: 18 }
  ];

  useEffect(() => {
    if (!balance) {
      const defaultOption = balanceOptions.find(opt => opt.value === 1);
      updateTastingData(null, 'balance', {
        value: defaultOption.value,
        score: defaultOption.score,
        label: defaultOption.label
      });
    }
  }, [balance]);

  // Valore corrente dello slider
  const currentValue = balance ? balance.value : 1;
  
  // Funzione per gestire il cambio di valore dello slider
  const handleChange = (value) => {
    const option = balanceOptions.find(opt => opt.value === value);
    if (option) {
      updateTastingData(null, 'balance', { 
        value: option.value, 
        score: option.score,
        label: option.label
      });
    }
  };

  return (
    <div className="card">
      <h2>Equilibrio</h2>
      
      <SliderInput
        value={currentValue}
        min={1}
        max={7}
        onChange={handleChange}
        options={balanceOptions}
      />
    </div>
  );
};


export default BalanceStep;