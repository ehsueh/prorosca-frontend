'use client';

import { ReactNode, useEffect } from 'react';
import { MiniKit } from '@worldcoin/minikit-js';

interface SafeMiniKitProviderProps {
  children: ReactNode;
  appId?: string;
}

export function SafeMiniKitProvider({ children, appId }: SafeMiniKitProviderProps) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development' && !MiniKit.isInstalled()) {
      try {
        MiniKit.install(appId || process.env.NEXT_PUBLIC_APP_ID || '');
      } catch (error) {
        console.error('Failed to install MiniKit:', error);
      }
    }
  }, [appId]);

  return <>{children}</>;
} 