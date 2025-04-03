import React from 'react';
import './SliderInput.css';

// Componente riutilizzabile per slider con colorazione variabile
const SliderInput = ({ value, min, max, onChange, options, showLabels = true }) => {
  // Calcola la percentuale per la colorazione dello slider
  const percentage = ((value - min) / (max - min)) * 100;
  
  // Funzione per gestire il cambio di valore
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    onChange(newValue);
  };

  // Funzione per ottenere l'etichetta in base al valore
  const getLabel = (value) => {
    const option = options.find(opt => opt.value === value);
    return option ? option.label : value;
  };
  
  // Raggruppa le etichette con lo stesso nome
  const groupedLabels = [];
  options.forEach(option => {
    const existingGroup = groupedLabels.find(group => group.label === option.label);
    if (existingGroup) {
      existingGroup.values.push(option.value);
      existingGroup.scores.push(option.score);
    } else {
      groupedLabels.push({
        label: option.label,
        values: [option.value],
        scores: [option.score]
      });
    }
  });

  // Stile per il track dello slider con gradiente di colore
  const trackStyle = {
    background: `linear-gradient(to right, #722F37 0%, #722F37 ${percentage}%, #444 ${percentage}%, #444 100%)`
  };

  // Ottieni lo score corrente
  const currentScore = options.find(opt => opt.value === value)?.score;

  return (
    <div className="slider-container">
      {showLabels && (
        <div className="slider-labels">
          {groupedLabels.map((group) => {
            // Calcola la posizione media per le etichette raggruppate
            const avgPosition = group.values.reduce((a, b) => a + b, 0) / group.values.length;
            const positionPercentage = ((avgPosition - min) / (max - min)) * 100;
            
            return (
              <div 
                key={group.label} 
                className={`slider-label ${value >= Math.min(...group.values) ? 'active' : ''}`}
                style={{ 
                  left: `${positionPercentage}%`,
                  transform: 'translateX(-50%)'
                }}
              >
                <div className="slider-label-text">{group.label}</div>
              </div>
            );
          })}
        </div>
      )}
      
      <div className="slider-track" style={trackStyle}>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          className="slider-input"
          step="1"
        />
      </div>
      
      <div className="slider-value">
        <span>{getLabel(value)}</span>
      </div>
      
      {currentScore && (
        <div className="slider-score">
          <span className="slider-score-label">Score:</span>
          <span className="slider-value-score">{currentScore}</span>
        </div>
      )}
    </div>
  );
};

export default SliderInput;