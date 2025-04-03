import React from 'react';
// Importa le immagini dalla cartella assets
import cupoPng from '../../assets/cupo.png';
import vivacePng from '../../assets/vivace.png';
import luminosoPng from '../../assets/luminoso.png';

// Componente per il sesto step: vivacità del vino
const BrightnessStep = ({ brightness, updateTastingData }) => {
  const handleChange = (value) => {
    updateTastingData(null, 'brightness', value);
    // Naviga automaticamente alla pagina successiva dopo la selezione
    setTimeout(() => {
      if (window.nextStep) window.nextStep();
    }, 300);
  };

  // Opzioni per la vivacità con le immagini
  const brightnessOptions = [
    { value: 'cupo', label: 'Cupo', image: cupoPng },
    { value: 'vivace', label: 'Vivace', image: vivacePng },
    { value: 'luminoso', label: 'Luminoso', image: luminosoPng }
  ];

  return (
    <div className="card">
      <h2>Vivacità del Vino</h2>
      <div className="wine-type-options">
        {brightnessOptions.map((option) => (
          <img
            key={option.value}
            src={option.image}
            alt={option.label}
            className={`wine-bottle-img ${brightness === option.value ? 'selected' : ''}`}
            onClick={() => handleChange(option.value)}
          />
        ))}
      </div>
    </div>
  );
};

export default BrightnessStep;