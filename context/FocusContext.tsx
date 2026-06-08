import React, { createContext, useContext, useState } from 'react';

type FocusState = 'deep' | 'normal' | 'distracted' | 'low-energy';
type Soundscape = 'none' | 'rain' | 'white-noise' | 'cafe' | 'deep-space';

interface FocusContextType {
  focusState: FocusState;
  setFocusState: (s: FocusState) => void;
  soundscape: Soundscape;
  setSoundscape: (s: Soundscape) => void;
  isDeepWork: boolean;
  setIsDeepWork: (b: boolean) => void;
}

const FocusContext = createContext<FocusContextType>({} as FocusContextType);

export const FocusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [focusState, setFocusState] = useState<FocusState>('normal');
  const [soundscape, setSoundscape] = useState<Soundscape>('none');
  const [isDeepWork, setIsDeepWork] = useState(false);
  return (
    <FocusContext.Provider value={{ focusState, setFocusState, soundscape, setSoundscape, isDeepWork, setIsDeepWork }}>
      {children}
    </FocusContext.Provider>
  );
};

export const useFocusContext = () => useContext(FocusContext);
