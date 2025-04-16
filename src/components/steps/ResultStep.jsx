import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './ResultStep.css';

// Opzioni per i vari parametri di degustazione
const sugarOptions = [
  { value: 'secco', label: 'Secco' },
  { value: 'tendenteAlDolce', label: 'Tendente al dolce' },
  { value: 'dolce', label: 'Dolce' },
  { value: 'moltoDolce', label: 'Molto dolce' }
];

// Opzioni per la sapidità percepita
const sapidityOptions = [
  { value: 'nonAvvertibile', label: 'Non avvertibile' },
  { value: 'contenuto', label: 'Contenuto' },
  { value: 'sapido', label: 'Sapido' },
  { value: 'piuCheSapido', label: 'Più che sapido' }
];

const alcoholOptions = [
  { value: 'contenuto', label: 'Contenuto' },
  { value: 'caldo', label: 'Caldo' },
  { value: 'piuCheCaldo', label: 'Più che caldo' },
  { value: 'moltoCaldo', label: 'Molto caldo' }
];

const acidityOptions = [
  { value: 'contenuto', label: 'Contenuto' },
  { value: 'fresco', label: 'Fresco' },
  { value: 'piuCheFresco', label: 'Più che fresco' },
  { value: 'moltoFresco', label: 'Molto fresco' }
];

const tanninOptions = [
  { value: 'amaro', label: 'Amaro' },
  { value: 'vegetale', label: 'Vegetale' },
  { value: 'maturo', label: 'Maturo' },
  { value: 'raffinato', label: 'Raffinato' }
];

// Componente per il risultato finale e il punteggio
const ResultStep = ({ tastingData, score }) => {
  const { user, saveWineData } = useAuth();
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);
  
  // Verifica che i dati siano disponibili
  useEffect(() => {
    console.log('ResultStep renderizzato con dati:', tastingData);
  }, [tastingData]);
  
  // Funzione per salvare i dati del vino
  const handleSaveData = async () => {
    setSaving(true);
    setSaveMessage(null);
    
    try {
      const { error } = await saveWineData({
        ...tastingData,
        score,
        saved_at: new Date().toISOString()
      });
      
      if (error) {
        throw error;
      }
      
      setSaveMessage({ type: 'success', text: 'Dati salvati con successo!' });
    } catch (error) {
      setSaveMessage({ type: 'error', text: `Errore: ${error.message || 'Si è verificato un errore'}` });
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="card result-card">
      <h2>Risultato della Degustazione</h2>
      
      <div className="score-display">
        <div className="score-circle">
          <span className="score-value">{score}</span>
          <span className="score-max">/100</span>
        </div>
      </div>

      <div className="score-verdict">
        <p>
          {score >= 97 ? 'Memorabile' :
          score >= 91 ? 'Eccellente' :
          score >= 86 ? 'Ottimo' :
          score >= 78 ? 'Buono' :
          score >= 70 ? 'Accettabile' :
          '—'}
        </p>
      </div>
      
      <div className="tasting-summary">
        <h3>Riepilogo della Scheda</h3>
        
        <div className="summary-section">
          <h4>Informazioni sul Vino</h4>
          {tastingData?.wineInfo?.name && <p><strong>Nome:</strong> {tastingData.wineInfo.name}</p>}
          {tastingData?.wineInfo?.winery && <p><strong>Cantina:</strong> {tastingData.wineInfo.winery}</p>}
          {tastingData?.wineInfo?.region && <p><strong>Regione:</strong> {tastingData.wineInfo.region}</p>}
          {tastingData?.wineInfo?.year && <p><strong>Annata:</strong> {tastingData.wineInfo.year}</p>}
          {tastingData?.wineInfo?.type && <p><strong>Tipologia:</strong> {tastingData.wineInfo.type.charAt(0).toUpperCase() + tastingData.wineInfo.type.slice(1)}</p>}
        </div>
        
        <div className="summary-section">
          <h4>Caratteristiche Visive</h4>
          {tastingData?.color && <p><strong>Colore:</strong> {tastingData.color.charAt(0).toUpperCase() + tastingData.color.slice(1)}</p>}
          {tastingData?.reflection && <p><strong>Riflesso:</strong> {tastingData.reflection.charAt(0).toUpperCase() + tastingData.reflection.slice(1)}</p>}
          {tastingData?.wineInfo?.type === 'rosso' && tastingData?.colorDensity && (
            <p><strong>Densità cromatica:</strong> {tastingData.colorDensity.charAt(0).toUpperCase() + tastingData.colorDensity.slice(1)}</p>
          )}
          {tastingData?.clarity && <p><strong>Limpidezza:</strong> {tastingData.clarity.charAt(0).toUpperCase() + tastingData.clarity.slice(1)}</p>}
          {tastingData?.brightness && <p><strong>Vivacità:</strong> {tastingData.brightness.charAt(0).toUpperCase() + tastingData.brightness.slice(1)}</p>}
          {tastingData?.wineInfo?.type === 'spumante' && tastingData?.perlage && (
            <p><strong>Perlage:</strong> {tastingData.perlage.charAt(0).toUpperCase() + tastingData.perlage.slice(1)}</p>
          )}
        </div>
        
        <div className="summary-section">
          <h4>Caratteristiche Olfattive e Gustative</h4>
          {tastingData?.olfactiveNotes && tastingData.olfactiveNotes.length > 0 && (
            <p>
              <strong>Sentori:</strong> {tastingData.olfactiveNotes.map(note => 
                note.charAt(0).toUpperCase() + note.slice(1)
              ).join(', ')}
            </p>
          )}
          {tastingData?.complexity?.label && (
          <p className="score-item">
            <strong>Complessità:</strong>
            <span className="label-score">
              <span className="label-text">{tastingData.complexity.label}</span>
              <span className="score-badge">{tastingData.complexity.score}</span>
            </span>
          </p>
        )}
          {tastingData?.quality?.label && (
            <p className="score-item">
              <strong>Qualità Olfattiva:</strong>
              <span className="label-score">
                <span className="label-text">{tastingData.quality.label}</span>
                <span className="score-badge">{tastingData.quality.score}</span>
              </span>
            </p>
          )}
          {tastingData?.sugar && <p><strong>Zucchero:</strong> {sugarOptions.find(opt => opt.value === tastingData.sugar)?.label || tastingData.sugar}</p>}
          {tastingData?.sapidity && <p><strong>Sapidità:</strong> {sapidityOptions.find(opt => opt.value === tastingData.sapidity)?.label || tastingData.sapidity}</p>}
          {tastingData?.alcohol && <p><strong>Alcool:</strong> {alcoholOptions.find(opt => opt.value === tastingData.alcohol)?.label || tastingData.alcohol}</p>}
          {tastingData?.acidity && <p><strong>Acidità:</strong> {acidityOptions.find(opt => opt.value === tastingData.acidity)?.label || tastingData.acidity}</p>}
          {tastingData?.tannin && <p><strong>Tannino:</strong> {tanninOptions.find(opt => opt.value === tastingData.tannin)?.label || tastingData.tannin}</p>}
          
          {tastingData?.balance?.label && (
            <p className="score-item">
              <strong>Equilibrio:</strong>
              <span className="label-score">
                <span className="label-text">{tastingData.balance.label}</span>
                <span className="score-badge">{tastingData.balance.score}</span>
              </span>
            </p>
          )}
          {tastingData?.balance?.label && (
            <p className="score-item">
              <strong>Persistenza:</strong>
              <span className="label-score">
                <span className="label-text">{tastingData.persistence.label}</span>
                <span className="score-badge">{tastingData.persistence.score}</span>
              </span>
            </p>
          )}
          {tastingData?.tasteQuality?.label && (
            <p className="score-item">
              <strong>Qualità Gustativa:</strong>
              <span className="label-score">
                <span className="label-text">{tastingData.tasteQuality.label}</span>
                <span className="score-badge">{tastingData.tasteQuality.score}</span>
              </span>
            </p>
          )}
          {tastingData?.tasteQuality?.label && (
            <p className="score-item">
              <strong>Dimensione:</strong>
              <span className="label-score">
                <span className="label-text">{tastingData.dimension.label}</span>
                <span className="score-badge">{tastingData.dimension.score}</span>
              </span>
            </p>
          )}
        </div>
      </div>
      
      {saveMessage && (
        <div className={`save-message ${saveMessage.type}`}>
          {saveMessage.text}
        </div>
      )}
      
      <div className="actions">
        {user && (
          <button 
            className="save-button" 
            onClick={handleSaveData} 
            disabled={saving}
          >
            {saving ? 'Salvataggio...' : 'Salva Scheda'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ResultStep;