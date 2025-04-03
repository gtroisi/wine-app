import React from 'react';

// Componente per il primo step: informazioni di base sul vino
const WineInfoStep = ({ wineInfo, updateTastingData }) => {
  const handleChange = (field, value) => {
    updateTastingData('wineInfo', field, value);
  };

  return (
    <div className="wine-info-card">
      <h2 className="wine-info-title">Informazioni sul Vino</h2>
      <div className="form-group">
        <label htmlFor="wine-name">Nome del Vino</label>
        <input
          id="wine-name"
          type="text"
          value={wineInfo.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Inserisci il nome del vino"
          className="wine-input"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="winery">Cantina</label>
        <input
          id="winery"
          type="text"
          value={wineInfo.winery}
          onChange={(e) => handleChange('winery', e.target.value)}
          placeholder="Inserisci il nome della cantina"
          className="wine-input"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="region">Regione</label>
        <input
          id="region"
          type="text"
          value={wineInfo.region}
          onChange={(e) => handleChange('region', e.target.value)}
          placeholder="Inserisci la regione di provenienza"
          className="wine-input"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="year">Annata</label>
        <input
          id="year"
          type="number"
          value={wineInfo.year}
          onChange={(e) => handleChange('year', e.target.value)}
          placeholder="Inserisci l'anno di produzione"
          min="1900"
          max={new Date().getFullYear()}
          className="wine-input"
          required
        />
      </div>

      <div className="form-group">
        <label>Tipologia</label>
        <div className="wine-type-options">
          <button 
            type="button"
            className={`wine-type-button ${wineInfo.type === 'rosso' ? 'selected' : ''}`}
            onClick={() => handleChange('type', 'rosso')}
          >
            <div className="wine-bottle rosso-bottle"></div>
            <span>Rosso</span>
          </button>
          <button 
            type="button"
            className={`wine-type-button ${wineInfo.type === 'bianco' ? 'selected' : ''}`}
            onClick={() => handleChange('type', 'bianco')}
          >
            <div className="wine-bottle bianco-bottle"></div>
            <span>Bianco</span>
          </button>
          <button 
            type="button"
            className={`wine-type-button ${wineInfo.type === 'rosato' ? 'selected' : ''}`}
            onClick={() => handleChange('type', 'rosato')}
          >
            <div className="wine-bottle rosato-bottle"></div>
            <span>Rosato</span>
          </button>
          <button 
            type="button"
            className={`wine-type-button ${wineInfo.type === 'spumante' ? 'selected' : ''}`}
            onClick={() => handleChange('type', 'spumante')}
          >
            <div className="wine-bottle spumante-bottle"></div>
            <span>Spumante</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WineInfoStep;