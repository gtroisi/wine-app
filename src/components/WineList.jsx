import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import './WineList.css';

const WineList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [wines, setWines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState('saved_at');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedWine, setSelectedWine] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Reindirizza l'utente alla pagina di login se non è autenticato
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Recupera i vini dell'utente dal database
  useEffect(() => {
    const fetchWines = async () => {
      if (!user) return;

      try {
        setLoading(true);
        setError(null);

        // Gestione speciale per campi annidati
        let query = supabase
          .from('wine_tastings')
          .select('*')
          .eq('user_id', user.id);

        // Ordina solo per campi di primo livello
        if (!sortField.includes('.')) {
          query = query.order(sortField, { ascending: sortDirection === 'asc' });
        }

        const { data, error } = await query;

        if (error) throw error;

        // Ordina manualmente per campi annidati
        let sortedData = [...(data || [])];
        if (sortField.includes('.')) {
          const [parent, child] = sortField.split('.');
          sortedData.sort((a, b) => {
            const valueA = a[parent]?.[child] || '';
            const valueB = b[parent]?.[child] || '';
            if (sortDirection === 'asc') {
              return valueA.localeCompare(valueB);
            } else {
              return valueB.localeCompare(valueA);
            }
          });
        }

        setWines(sortedData);
      } catch (err) {
        console.error('Errore nel recupero dei vini:', err);
        setError('Si è verificato un errore nel recupero dei vini. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    };

    fetchWines();
  }, [user, sortField, sortDirection]);

  // Gestisce il cambio di ordinamento
  const handleSort = (field) => {
    if (field === sortField) {
      // Se il campo è già selezionato, inverti la direzione
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Altrimenti, imposta il nuovo campo e la direzione predefinita
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Visualizza i dettagli di un vino
  const handleViewDetails = (wine) => {
    setSelectedWine(wine);
  };

  // Chiude il modale dei dettagli
  const handleCloseDetails = () => {
    setSelectedWine(null);
  };

  // Gestisce l'eliminazione di un vino
  const handleDeleteWine = async (wineId) => {
    // Chiedi conferma all'utente prima di eliminare
    if (!window.confirm('Sei sicuro di voler eliminare questo vino? Questa azione non può essere annullata.')) {
      return;
    }

    try {
      setDeleteLoading(true);
      
      // Elimina il vino dal database
      const { error } = await supabase
        .from('wine_tastings')
        .delete()
        .eq('id', wineId)
        .eq('user_id', user.id); // Assicurati che l'utente possa eliminare solo i propri vini

      if (error) throw error;

      // Aggiorna lo stato locale rimuovendo il vino eliminato
      setWines(wines.filter(wine => wine.id !== wineId));
      
      // Se il vino eliminato è quello attualmente visualizzato nei dettagli, chiudi il modale
      if (selectedWine && selectedWine.id === wineId) {
        setSelectedWine(null);
      }
    } catch (err) {
      console.error('Errore nell\'eliminazione del vino:', err);
      alert('Si è verificato un errore durante l\'eliminazione del vino. Riprova più tardi.');
    } finally {
      setDeleteLoading(false);
    }
  };

  // Formatta la data in formato leggibile
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="wine-list-container">
        <h1>I miei vini</h1>
        <p className="loading-message">Caricamento in corso...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="wine-list-container">
        <h1>I miei vini</h1>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="wine-list-container">
      <h1>I miei vini</h1>
      
      {wines.length === 0 ? (
        <p className="no-wines-message">Non hai ancora salvato nessun vino. Inizia una degustazione!</p>
      ) : (
        <div className="wine-table-container">
          <table className="wine-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('wineInfo.name')} className={sortField === 'wineInfo.name' ? `sorted-${sortDirection}` : ''}>
                  Nome {sortField === 'wineInfo.name' && <span className="sort-arrow">{sortDirection === 'asc' ? '↑' : '↓'}</span>}
                </th>
                <th onClick={() => handleSort('wineInfo.winery')} className={sortField === 'wineInfo.winery' ? `sorted-${sortDirection}` : ''}>
                  Cantina {sortField === 'wineInfo.winery' && <span className="sort-arrow">{sortDirection === 'asc' ? '↑' : '↓'}</span>}
                </th>
                <th onClick={() => handleSort('score')} className={sortField === 'score' ? `sorted-${sortDirection}` : ''}>
                  Punteggio {sortField === 'score' && <span className="sort-arrow">{sortDirection === 'asc' ? '↑' : '↓'}</span>}
                </th>
                <th onClick={() => handleSort('saved_at')} className={sortField === 'saved_at' ? `sorted-${sortDirection}` : ''}>
                  Data {sortField === 'saved_at' && <span className="sort-arrow">{sortDirection === 'asc' ? '↑' : '↓'}</span>}
                </th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {wines.map((wine) => (
                <tr key={wine.id}>
                  <td data-label="Nome">{wine.wineInfo?.name || 'N/D'}</td>
                  <td data-label="Cantina">{wine.wineInfo?.winery || 'N/D'}</td>
                  <td className="score-cell" data-label="Punteggio">
                    <div className="score-pill">
                      {wine.score || 'N/D'}
                    </div>
                  </td>
                  <td data-label="Data">{wine.saved_at ? formatDate(wine.saved_at) : 'N/D'}</td>
                  <td data-label="Azioni">
                    <div className="action-buttons">
                      <button 
                        className="view-details-button" 
                        onClick={() => handleViewDetails(wine)}
                        aria-label="Visualizza dettagli"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                      </button>
                      <button 
                        className="delete-wine-button" 
                        onClick={() => handleDeleteWine(wine.id)}
                        aria-label="Elimina vino"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedWine && (
        <div className="wine-details-modal">
          <div className="wine-details-content">
            <button className="close-modal-button" onClick={handleCloseDetails}>
              &times;
            </button>
            
            <div className="score-display">
              <div className="score-circle">
                <span className="score-value">{selectedWine.score}</span>
                <span className="score-max">/100</span>
              </div>
            </div>

            <div className="score-verdict">
              <p>
                {selectedWine.score >= 97 ? 'Memorabile' :
                selectedWine.score >= 91 ? 'Eccellente' :
                selectedWine.score >= 86 ? 'Ottimo' :
                selectedWine.score >= 78 ? 'Buono' :
                selectedWine.score >= 70 ? 'Accettabile' :
                '—'}
              </p>
            </div>
            
            <div className="tasting-summary">
              <h3>Riepilogo della Scheda</h3>
              
              <div className="summary-section">
                <h4>Informazioni sul Vino</h4>
                {selectedWine?.wineInfo?.name && <p><strong>Nome:</strong> {selectedWine.wineInfo.name}</p>}
                {selectedWine?.wineInfo?.winery && <p><strong>Cantina:</strong> {selectedWine.wineInfo.winery}</p>}
                {selectedWine?.wineInfo?.region && <p><strong>Regione:</strong> {selectedWine.wineInfo.region}</p>}
                {selectedWine?.wineInfo?.year && <p><strong>Annata:</strong> {selectedWine.wineInfo.year}</p>}
                {selectedWine?.wineInfo?.type && <p><strong>Tipologia:</strong> {selectedWine.wineInfo.type.charAt(0).toUpperCase() + selectedWine.wineInfo.type.slice(1)}</p>}
              </div>
              
              <div className="summary-section">
                <h4>Caratteristiche Visive</h4>
                {selectedWine?.color && <p><strong>Colore:</strong> {selectedWine.color.charAt(0).toUpperCase() + selectedWine.color.slice(1)}</p>}
                {selectedWine?.reflection && <p><strong>Riflesso:</strong> {selectedWine.reflection.charAt(0).toUpperCase() + selectedWine.reflection.slice(1)}</p>}
                {selectedWine?.wineInfo?.type === 'rosso' && selectedWine?.colorDensity && (
                  <p><strong>Densità cromatica:</strong> {selectedWine.colorDensity.charAt(0).toUpperCase() + selectedWine.colorDensity.slice(1)}</p>
                )}
                {selectedWine?.clarity && <p><strong>Limpidezza:</strong> {selectedWine.clarity.charAt(0).toUpperCase() + selectedWine.clarity.slice(1)}</p>}
                {selectedWine?.brightness && <p><strong>Vivacità:</strong> {selectedWine.brightness.charAt(0).toUpperCase() + selectedWine.brightness.slice(1)}</p>}
                {selectedWine?.wineInfo?.type === 'spumante' && selectedWine?.perlage && (
                  <p><strong>Perlage:</strong> {selectedWine.perlage.charAt(0).toUpperCase() + selectedWine.perlage.slice(1)}</p>
                )}
              </div>
              
              <div className="summary-section">
                <h4>Caratteristiche Olfattive e Gustative</h4>

                {selectedWine?.olfactiveNotes && selectedWine.olfactiveNotes.length > 0 && (
                  <p>
                    <strong>Sentori:</strong> {selectedWine.olfactiveNotes.map(note => 
                      note.charAt(0).toUpperCase() + note.slice(1)
                    ).join(', ')}
                  </p>
                )}
                {selectedWine?.complexity?.label && (
                  <p className="score-item">
                    <strong>Complessità:</strong>
                    <span className="label-score">
                      <span className="label-text">{selectedWine.complexity.label}</span>
                      <span className="score-badge">{selectedWine.complexity.score}</span>
                    </span>
                  </p>
                )}
                {selectedWine?.quality?.label && (
                  <p className="score-item">
                    <strong>Qualità Olfattiva:</strong>
                    <span className="label-score">
                      <span className="label-text">{selectedWine.quality.label}</span>
                      <span className="score-badge">{selectedWine.quality.score}</span>
                    </span>
                  </p>
                )}
                {selectedWine?.sugar && <p><strong>Zucchero:</strong> {selectedWine.sugar.charAt(0).toUpperCase() + selectedWine.sugar.slice(1)}</p>}
                {selectedWine?.sapidity && <p><strong>Sapidità:</strong> {selectedWine.sapidity.charAt(0).toUpperCase() + selectedWine.sapidity.slice(1)}</p>}
                {selectedWine?.alcohol && <p><strong>Alcool:</strong> {selectedWine.alcohol.charAt(0).toUpperCase() + selectedWine.alcohol.slice(1)}</p>}
                {selectedWine?.acidity && <p><strong>Acidità:</strong> {selectedWine.acidity.charAt(0).toUpperCase() + selectedWine.acidity.slice(1)}</p>}
                {selectedWine?.tannin && <p><strong>Tannino:</strong> {selectedWine.tannin.charAt(0).toUpperCase() + selectedWine.tannin.slice(1)}</p>}
                
                {selectedWine?.balance?.label && (
                  <p className="score-item">
                    <strong>Equilibrio:</strong>
                    <span className="label-score">
                      <span className="label-text">{selectedWine.balance.label}</span>
                      <span className="score-badge">{selectedWine.balance.score}</span>
                    </span>
                  </p>
                )}
                {selectedWine?.persistence?.label && (
                  <p className="score-item">
                    <strong>Persistenza:</strong>
                    <span className="label-score">
                      <span className="label-text">{selectedWine.persistence.label}</span>
                      <span className="score-badge">{selectedWine.persistence.score}</span>
                    </span>
                  </p>
                )}
                {selectedWine?.tasteQuality?.label && (
                  <p className="score-item">
                    <strong>Qualità Gustativa:</strong>
                    <span className="label-score">
                      <span className="label-text">{selectedWine.tasteQuality.label}</span>
                      <span className="score-badge">{selectedWine.tasteQuality.score}</span>
                    </span>
                  </p>
                )}
                {selectedWine?.dimension?.label && (
                  <p className="score-item">
                    <strong>Dimensione:</strong>
                    <span className="label-score">
                      <span className="label-text">{selectedWine.dimension.label}</span>
                      <span className="score-badge">{selectedWine.dimension.score}</span>
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WineList;