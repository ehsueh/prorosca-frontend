'use client';

import { useEffect } from 'react';
import { useTransactionStatus } from '@/hooks/useTransactionStatus';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

interface TransactionStatusMonitorProps {
  txHash?: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export function TransactionStatusMonitor({
  txHash,
  onSuccess,
  onError
}: TransactionStatusMonitorProps) {
  const { monitorTransaction, showTransactionStatus } = useTransactionStatus();

  useEffect(() => {
    if (txHash) {
      monitorTransaction(txHash)
        .then(() => {
          onSuccess?.();
        })
        .catch((error) => {
          onError?.(error);
        });
    }
  }, [txHash, monitorTransaction, onSuccess, onError]);

  // Function to get transaction link for Optimism
  const getTransactionLink = (hash: string) => {
    return `https://optimistic.etherscan.io/tx/${hash}`;
  };

  if (!txHash) return null;

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
      <div className="flex items-center gap-2">
        <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
        <span className="text-sm">Monitoring transaction status...</span>
      </div>
      
      <div className="text-xs text-slate-500 break-all text-center">
        Transaction Hash: {txHash}
      </div>

      <Button
        variant="outline"
        size="sm"
        className="text-xs"
        onClick={() => window.open(getTransactionLink(txHash), '_blank')}
      >
        View on Etherscan
      </Button>
    </div>
  );
} 