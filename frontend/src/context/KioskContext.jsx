import { createContext, useContext, useState } from 'react';

const KioskContext = createContext();

export function KioskProvider({ children }) {
  const [step, setStep] = useState('LANGUAGE_SELECT'); // LANGUAGE_SELECT | VOICE_RECORDING | REVIEW_DRAFT
  const [language, setLanguage] = useState('hi');
  const [transcript, setTranscript] = useState('');
  const [legalDraft, setLegalDraft] = useState(null);
  const [pdfPath, setPdfPath] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const resetKiosk = () => {
    setStep('LANGUAGE_SELECT');
    setLanguage('hi');
    setTranscript('');
    setLegalDraft(null);
    setPdfPath(null);
    setIsLoading(false);
  };

  return (
    <KioskContext.Provider value={{
      step, setStep,
      language, setLanguage,
      transcript, setTranscript,
      legalDraft, setLegalDraft,
      pdfPath, setPdfPath,
      isLoading, setIsLoading,
      resetKiosk
    }}>
      {children}
    </KioskContext.Provider>
  );
}

export const useKiosk = () => useContext(KioskContext);