import React, { useState } from 'react';

// Componente per l'analisi olfattiva del vino
const OlfactiveStep = ({ olfactiveNotes, updateTastingData }) => {
  // Stato locale per gestire le selezioni multiple
  const [selectedNotes, setSelectedNotes] = useState(olfactiveNotes || []);

  const handleChange = (value) => {
    // Logica per gestire la selezione multipla
    const updatedNotes = selectedNotes.includes(value)
      ? selectedNotes.filter(note => note !== value) // Rimuovi se già selezionato
      : [...selectedNotes, value]; // Aggiungi se non selezionato
    
    setSelectedNotes(updatedNotes);
    updateTastingData(null, 'olfactiveNotes', updatedNotes);
  };

  // Opzioni per l'analisi olfattiva (macro famiglie)
  const olfactiveOptions = [
    { value: 'fruttato', label: 'Fruttato' },
    { value: 'floreale', label: 'Floreale' },
    { value: 'vegetale', label: 'Vegetale' },
    { value: 'minerale', label: 'Minerale' },
    { value: 'erbeAromatiche', label: 'Erbe Aromatiche' },
    { value: 'speziato', label: 'Speziato' },
    { value: 'tostato', label: 'Tostato' },
    { value: 'balsamico', label: 'Balsamico' },
    { value: 'etereo', label: 'Etereo' }
  ];

  return (
    <div className="card">
      <h2>Sentori</h2>
      
      <div className="option-buttons">
        {olfactiveOptions.map((option) => (
          <button
            key={option.value}
            className={`option-button ${selectedNotes.includes(option.value) ? 'selected' : ''}`}
            onClick={() => handleChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OlfactiveStep;