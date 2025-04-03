import { useState } from 'react';
import WineInfoStep from './steps/WineInfoStep';
import ColorStep from './steps/ColorStep';
import ReflectionStep from './steps/ReflectionStep';
import ColorDensityStep from './steps/ColorDensityStep';
import ClarityStep from './steps/ClarityStep';
import BrightnessStep from './steps/BrightnessStep';
import PerlageStep from './steps/PerlageStep';
import OlfactiveStep from './steps/OlfactiveStep';
import ComplexityStep from './steps/ComplexityStep';
import NewQualityStep from './steps/NewQualityStep';
import SugarStep from './steps/SugarStep';
import AlcoholStep from './steps/AlcoholStep';
import AcidityStep from './steps/AcidityStep';
import TanninStep from './steps/TanninStep';
import BalanceStep from './steps/BalanceStep';
import PersistenceStep from './steps/PersistenceStep';
import SapidityStep from './steps/SapidityStep';
import MouthfeelStep from './steps/MouthfeelStep';
import TasteQualityStep from './steps/TasteQualityStep';
import DimensionStep from './steps/DimensionStep';
import ConsumptionStep from './steps/ConsumptionStep';
import ResultStep from './steps/ResultStep';

// Componente principale per la scheda di degustazione vini
const WineTastingForm = () => {
  // Stato per tenere traccia dello step corrente nel flusso
  const [currentStep, setCurrentStep] = useState(0);
  
  // Stato per memorizzare tutti i dati della scheda di degustazione
  const [tastingData, setTastingData] = useState({
    // Step 1: Informazioni di base sul vino
    wineInfo: {
      name: '',
      winery: '',
      region: '',
      year: '',
      type: '' // rosso, bianco, rosato, spumante
    },
    // Step 2: Colore
    color: '',
    // Step 3: Riflesso
    reflection: '',
    // Step 4: Densità cromatica (solo per rossi)
    colorDensity: '',
    // Step 5: Limpidezza
    clarity: '',
    // Step 6: Vivacità
    brightness: '',
    // Step 7: Perlage (solo per spumanti)
    perlage: '',
    // Step 8: Analisi olfattiva (selezione multipla)
    olfactiveNotes: [],
    // Step 9: Complessità
    complexity: null,
    // Step 10: Qualità
    quality: null,
    // Step 11: Zucchero
    sugar: '',
    // Step 12: Alcool
    alcohol: '',
    // Step 13: Acidità
    acidity: '',
    // Step 14: Tannino
    tannin: '',
    // Step 15: Equilibrio
    balance: null,
    // Step 16: Persistenza
    persistence: null,
    // Step 17: Sapidità percepita
    sapidity: '',
    // Step 18: Chiusura di bocca
    mouthfeel: null,
    // Step 19: Qualità gustativa
    tasteQuality: null,
    // Step 20: Dimensione
    dimension: null,
    // Step 21: Prospettive di consumo
    consumption: ''
  });

  // Calcolo del punteggio finale
  const calculateScore = () => {
    // Implementazione del calcolo del punteggio basato sui dati inseriti
    let score = 0;
    
    // Punteggi per analisi olfattiva con controlli di sicurezza
    if (tastingData?.complexity?.score) score += tastingData.complexity.score;
    if (tastingData?.quality?.score) score += tastingData.quality.score;
    
    // Punteggi per analisi gustativa con controlli di sicurezza
    if (tastingData?.balance?.score) score += tastingData.balance.score;
    if (tastingData?.persistence?.score) score += tastingData.persistence.score;
    if (tastingData?.tasteQuality?.score) score += tastingData.tasteQuality.score;
    if (tastingData?.dimension?.score) score += tastingData.dimension.score;
    
    // Assicuriamoci che il punteggio sia un numero valido
    return isNaN(score) ? 0 : score;
  };

  // Funzione per aggiornare i dati della scheda
  const updateTastingData = (category, field, value) => {
    if (category) {
      setTastingData(prev => {
        const newData = {
          ...prev,
          [category]: {
            ...prev[category],
            [field]: value
          }
        };
        // Rendi disponibile i dati globalmente per altri componenti
        window.tastingData = newData;
        return newData;
      });
    } else {
      setTastingData(prev => {
        const newData = {
          ...prev,
          [field]: value
        };
        // Rendi disponibile i dati globalmente per altri componenti
        window.tastingData = newData;
        return newData;
      });
    }
  };
  
  // Inizializza i dati globali
  window.tastingData = tastingData;

  // Funzione per passare allo step successivo
  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };
  
  // Esponi la funzione nextStep globalmente per permettere la navigazione automatica
  window.nextStep = nextStep;

  // Funzione per tornare allo step precedente
  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  // Funzione per determinare quali step mostrare in base al tipo di vino
  const getStepsForWineType = () => {
    const baseSteps = [
      // Step 1: Informazioni di base sul vino
      <WineInfoStep 
        key="wine-info" 
        wineInfo={tastingData.wineInfo} 
        updateTastingData={updateTastingData} 
      />,
      // Step 2: Colore
      <ColorStep 
        key="color" 
        wineType={tastingData.wineInfo.type} 
        color={tastingData.color} 
        updateTastingData={updateTastingData} 
      />,
      // Step 3: Riflesso
      <ReflectionStep 
        key="reflection" 
        reflection={tastingData.reflection} 
        updateTastingData={updateTastingData} 
      />,
      // Step 5: Limpidezza (salta la densità cromatica per non-rossi)
      <ClarityStep 
        key="clarity" 
        clarity={tastingData.clarity} 
        updateTastingData={updateTastingData} 
      />,
      // Step 6: Vivacità
      <BrightnessStep 
        key="brightness" 
        brightness={tastingData.brightness} 
        updateTastingData={updateTastingData} 
      />,
      // Step 8: Analisi olfattiva
      <OlfactiveStep 
        key="olfactive" 
        olfactiveNotes={tastingData.olfactiveNotes} 
        updateTastingData={updateTastingData} 
      />,
      // Step 9: Complessità
      <ComplexityStep 
        key="complexity" 
        complexity={tastingData.complexity} 
        updateTastingData={updateTastingData} 
      />,
      // Step 10: Qualità
      <NewQualityStep 
        key="quality" 
        quality={tastingData.quality} 
        updateTastingData={updateTastingData} 
      />,
      // Step 11: Zucchero
      <SugarStep 
        key="sugar" 
        sugar={tastingData.sugar} 
        updateTastingData={updateTastingData} 
      />,
      // Step 12: Alcool
      <AlcoholStep 
        key="alcohol" 
        alcohol={tastingData.alcohol} 
        updateTastingData={updateTastingData} 
      />,
      // Step 13: Acidità
      <AcidityStep 
        key="acidity" 
        acidity={tastingData.acidity} 
        updateTastingData={updateTastingData} 
      />,
      // Step 14: Tannino
      <TanninStep 
        key="tannin" 
        tannin={tastingData.tannin} 
        updateTastingData={updateTastingData} 
      />,
      // Step 15: Equilibrio
      <BalanceStep 
        key="balance" 
        balance={tastingData.balance} 
        updateTastingData={updateTastingData} 
      />,
      // Step 16: Persistenza
      <PersistenceStep 
        key="persistence" 
        persistence={tastingData.persistence} 
        updateTastingData={updateTastingData} 
      />,
      // Step 17: Sapidità percepita
      <SapidityStep 
        key="sapidity" 
        sapidity={tastingData.sapidity} 
        updateTastingData={updateTastingData} 
      />,
      // Step 18: Chiusura di bocca
      <MouthfeelStep 
        key="mouthfeel" 
        mouthfeel={tastingData.mouthfeel} 
        updateTastingData={updateTastingData} 
      />,
      // Step 19: Qualità gustativa
      <TasteQualityStep 
        key="taste-quality" 
        tasteQuality={tastingData.tasteQuality} 
        updateTastingData={updateTastingData} 
      />,
      // Step 20: Dimensione
      <DimensionStep 
        key="dimension" 
        dimension={tastingData.dimension} 
        updateTastingData={updateTastingData} 
      />,
      // Step 20: Prospettive di consumo
      <ConsumptionStep 
        key="consumption" 
        consumption={tastingData.consumption} 
        updateTastingData={updateTastingData} 
      />,
      // Step 21: Risultato
      <ResultStep 
        key="result" 
        tastingData={tastingData} 
        score={calculateScore()} 
      />
    ];

    // Aggiungi step specifici in base al tipo di vino
    const customSteps = [...baseSteps];
    
    // Inserisci la densità cromatica dopo il riflesso solo per i vini rossi
    if (tastingData.wineInfo.type === 'rosso') {
      customSteps.splice(3, 0, 
        <ColorDensityStep 
          key="color-density" 
          colorDensity={tastingData.colorDensity} 
          updateTastingData={updateTastingData} 
        />
      );
    }
    
    // Inserisci il perlage dopo la vivacità solo per gli spumanti
    if (tastingData.wineInfo.type === 'spumante') {
      customSteps.splice(5, 0, 
        <PerlageStep 
          key="perlage" 
          perlage={tastingData.perlage} 
          updateTastingData={updateTastingData} 
        />
      );
    }
    
    return customSteps;
  };

  // Array di componenti per ogni step del flusso
  const steps = getStepsForWineType();

  // Verifica se lo step corrente può essere mostrato
  const canShowCurrentStep = () => {
    // Se siamo al primo step, mostralo sempre
    if (currentStep === 0) return true;
    
    // Se il tipo di vino non è selezionato e siamo oltre il primo step, non mostrare
    if (currentStep > 0 && !tastingData.wineInfo.type) return false;
    
    return true;
  };

  // Verifica se possiamo procedere allo step successivo
  const canProceed = () => {
    switch (currentStep) {
      case 0: // WineInfo
        return tastingData.wineInfo.name && 
               tastingData.wineInfo.winery && 
               tastingData.wineInfo.region && 
               tastingData.wineInfo.year && 
               tastingData.wineInfo.type;
      case 1: // Color
        return tastingData.color !== '';
      case 2: // Reflection
        return tastingData.reflection !== '';
      // Verifica se siamo all'ultimo step (Consumption) e se è stato selezionato un valore
      case steps.length - 2: // ConsumptionStep (penultimo step)
        return tastingData.consumption !== '';
      // Per gli altri step, controlla in base al tipo di vino
      default:
        return true;
    }
  };

  return (
    <div className="wine-tasting-form">
      <h1 className="main-title">Scheda di<br />Degustazione Vini</h1>
      
      {/* Mostra lo step corrente se può essere mostrato */}
      {canShowCurrentStep() ? steps[currentStep] : (
        <div className="error-message">
          <p>Per favore, completa le informazioni sul vino prima di procedere.</p>
          <button onClick={() => setCurrentStep(0)}>Torna alle Informazioni</button>
        </div>
      )}
      
      {/* Pulsanti di navigazione */}
      <div className="navigation-buttons">
        {currentStep > 0 && (
          <button className="prev-button" onClick={prevStep}>Indietro</button>
        )}
        
        {currentStep < steps.length - 1 ? (
          <button 
            className="next-button" 
            onClick={nextStep} 
            disabled={!canProceed()}
          >
            Avanti
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default WineTastingForm;