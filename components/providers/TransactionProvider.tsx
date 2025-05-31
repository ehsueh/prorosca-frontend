'use client';

import React from 'react';
import { NotificationProvider, TransactionPopupProvider } from "@blockscout/app-sdk";

export function TransactionProvider({ children }: { children: React.ReactNode }) {
  return (
    <NotificationProvider>
      <TransactionPopupProvider>
        {children}
      </TransactionPopupProvider>
    </NotificationProvider>
  );
} 