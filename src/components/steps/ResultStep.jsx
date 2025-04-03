import React, { useEffect } from 'react';

// Componente per il risultato finale e il punteggio
const ResultStep = ({ tastingData, score }) => {
  // Verifica che i dati siano disponibili
  useEffect(() => {
    console.log('ResultStep renderizzato con dati:', tastingData);
  }, [tastingData]);
  return (
    <div className="card result-card">
      <h2>Risultato della Degustazione</h2>
      
      <div className="score-display">
        <div className="score-circle">
          <span className="score-value">{score}</span>
          <span className="score-max">/100</span>
        </div>
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
              <strong>Analisi Olfattiva:</strong> {tastingData.olfactiveNotes.map(note => 
                note.charAt(0).toUpperCase() + note.slice(1)
              ).join(', ')}
            </p>
          )}
          {tastingData?.complexity?.value && (
            <p>
              <strong>Complessità:</strong> {tastingData.complexity.value.charAt(0).toUpperCase() + tastingData.complexity.value.slice(1)} 
              <span className="score-badge">{tastingData.complexity.score}</span>
            </p>
          )}
          {tastingData?.quality?.value && (
            <p>
              <strong>Qualità:</strong> {tastingData.quality.value.includes('piuChe') ? 'Più che ' : ''}
              {tastingData.quality.value.includes('fine') ? 'Fine' : 
                tastingData.quality.value.includes('accettabile') ? 'Accettabile' : 'Eccellente'} 
              <span className="score-badge">{tastingData.quality.score}</span>
            </p>
          )}
          {tastingData?.sugar && <p><strong>Zucchero:</strong> {tastingData.sugar.charAt(0).toUpperCase() + tastingData.sugar.slice(1)}</p>}
          {tastingData?.alcohol && <p><strong>Alcool:</strong> {tastingData.alcohol.charAt(0).toUpperCase() + tastingData.alcohol.slice(1)}</p>}
          {tastingData?.acidity && <p><strong>Acidità:</strong> {tastingData.acidity.charAt(0).toUpperCase() + tastingData.acidity.slice(1)}</p>}
          {tastingData?.tannin && <p><strong>Tannino:</strong> {tastingData.tannin.charAt(0).toUpperCase() + tastingData.tannin.slice(1)}</p>}
          {tastingData?.balance?.value && (
            <p>
              <strong>Equilibrio:</strong> {tastingData.balance.value.includes('inFaseDi') ? 'In fase di equilibrio' : 
                tastingData.balance.value.includes('bilanciato') ? 'Bilanciato' : 
                tastingData.balance.value.includes('equilibrato') ? 'Equilibrato' : 'Squilibrato'} 
              <span className="score-badge">{tastingData.balance.score}</span>
            </p>
          )}
          {tastingData?.tasteQuality?.label && (
            <p>
              <strong>Qualità Gustativa:</strong> {tastingData.tasteQuality.label}
              <span className="score-badge">{tastingData.tasteQuality.score}</span>
            </p>
          )}
        </div>
      </div>
      
      <div className="actions">
        <button className="print-button" onClick={() => window.print()}>Stampa Scheda</button>
        <button className="share-button" onClick={() => alert('Funzionalità di condivisione in arrivo!')}>Condividi</button>
      </div>
    </div>
  );
};

export default ResultStep;