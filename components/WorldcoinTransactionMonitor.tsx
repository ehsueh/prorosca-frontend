'use client';

import { useTransactionMonitor } from '@/hooks/useTransactionMonitor';
import { Button } from '@/components/ui/button';
import { Share2, History } from 'lucide-react';

interface WorldcoinTransactionMonitorProps {
  txHash?: string;
  address?: string;
}

export function WorldcoinTransactionMonitor({ txHash, address }: WorldcoinTransactionMonitorProps) {
  const { monitorTransaction, viewTransactionHistory } = useTransactionMonitor();

  // Start monitoring when txHash is provided
  if (txHash) {
    monitorTransaction(txHash);
  }

  return (
    <div className="flex gap-2">
      {address && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => viewTransactionHistory(address)}
          className="flex items-center"
        >
          <History className="h-4 w-4 mr-2" />
          View History
        </Button>
      )}
      {txHash && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => monitorTransaction(txHash)}
          className="flex items-center"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Monitor Transaction
        </Button>
      )}
    </div>
  );
} 