import { useState, useEffect } from 'react';
import { MiniKit } from '@worldcoin/minikit-js';

export interface WorldAuthState {
  isInstalled: boolean;
  error: Error | null;
}

export const useWorldAuth = () => {
  const [authState, setAuthState] = useState<WorldAuthState>({
    isInstalled: false,
    error: null,
  });

  useEffect(() => {
    try {
      const installed = MiniKit.isInstalled();
      setAuthState({ isInstalled: installed, error: null });
    } catch (error) {
      setAuthState({ isInstalled: false, error: error as Error });
    }
  }, []);

  return authState;
}; 