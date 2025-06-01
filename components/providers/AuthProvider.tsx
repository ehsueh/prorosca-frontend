"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isSignedIn: boolean;
  setIsSignedIn: (value: boolean) => void;
  signInWithWallet: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const signInWithWallet = async () => {
    // In development, always sign in
    if (process.env.NODE_ENV === 'development') {
      console.log('Development mode: signing in directly');
      setIsSignedIn(true);
      return;
    }

    // Production authentication code would go here
    setIsSignedIn(true);
  };

  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn, signInWithWallet }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 