"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { MiniKit } from '@worldcoin/minikit-js';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isSignedIn: boolean;
  setIsSignedIn: (value: boolean) => void;
  signInWithWallet: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check localStorage on initial load
    const storedAuth = localStorage.getItem('isSignedIn');
    if (storedAuth === 'true') {
      setIsSignedIn(true);
    }
  }, []);

  const navigateToHome = async () => {
    try {
      if (process.env.NODE_ENV === 'development') {
        router.push('/');
        return;
      }

      // In World App's WebView, use history API for smoother navigation
      if (MiniKit.isInstalled()) {
        window.history.replaceState({}, '', '/');
        // Force a reload to ensure the app state is updated
        window.location.reload();
      } else {
        // Fallback to regular navigation
        router.push('/');
      }
    } catch (error) {
      console.error('Navigation error:', error);
      // Last resort fallback
      window.location.href = '/';
    }
  };

  const signInWithWallet = async () => {
    try {
      // In development, always sign in
      if (process.env.NODE_ENV === 'development') {
        console.log('Development mode: signing in directly');
        setIsSignedIn(true);
        localStorage.setItem('isSignedIn', 'true');
        await navigateToHome();
        return;
      }

      const res = await fetch(`/api/nonce`);
      const { nonce } = await res.json();

      const { commandPayload: generateMessageResult, finalPayload } = await MiniKit.commandsAsync.walletAuth({
        nonce: nonce,
        requestId: '0',
        expirationTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        notBefore: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
        statement: 'This is my statement and here is a link https://worldcoin.com/apps',
      });

      if (finalPayload.status === 'error') {
        console.error('Authentication failed:', finalPayload);
        return;
      }

      const response = await fetch('/api/complete-siwe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payload: finalPayload,
          nonce,
        }),
      });

      const responseJson = await response.json();
      console.log('responseJson:', responseJson);
      
      if (responseJson.status === 'success') {
        setIsSignedIn(true);
        localStorage.setItem('isSignedIn', 'true');
        
        // Navigate using the updated navigation helper
        await navigateToHome();
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn, signInWithWallet }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 