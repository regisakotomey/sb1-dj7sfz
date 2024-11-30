'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import WelcomeDialog from '@/components/welcome/WelcomeDialog';
import { hasUserData } from '@/lib/storage';

interface WelcomeContextType {
  showWelcome: boolean;
  hideWelcome: () => void;
}

const WelcomeContext = createContext<WelcomeContextType>({
  showWelcome: false,
  hideWelcome: () => {},
});

export function WelcomeProvider({ children }: { children: React.ReactNode }) {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Check if it's the first visit
    if (!hasUserData()) {
      setShowWelcome(true);
    }
  }, []);

  const hideWelcome = () => {
    setShowWelcome(false);
  };

  return (
    <WelcomeContext.Provider value={{ showWelcome, hideWelcome }}>
      {children}
      {showWelcome && <WelcomeDialog onComplete={hideWelcome} />}
    </WelcomeContext.Provider>
  );
}

export function useWelcome() {
  return useContext(WelcomeContext);
}