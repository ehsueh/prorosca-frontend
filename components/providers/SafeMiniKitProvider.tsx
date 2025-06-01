'use client';

import { ReactNode } from 'react';

interface SafeMiniKitProviderProps {
  children: ReactNode;
  appId?: string;
}

export function SafeMiniKitProvider({ children }: SafeMiniKitProviderProps) {
  // In development, just render children without the provider
  if (process.env.NODE_ENV === 'development') {
    return <>{children}</>;
  }

  // For production, you would add back the MiniKit integration
  return <>{children}</>;
} 