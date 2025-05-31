import { useNotification } from "@blockscout/app-sdk";
import { useCallback } from "react";

export type TransactionStatus = 'pending' | 'success' | 'error';

interface TransactionStatusHook {
  monitorTransaction: (txHash: string) => Promise<void>;
  showTransactionStatus: (status: TransactionStatus, txHash: string, message?: string) => void;
}

export function useTransactionStatus(): TransactionStatusHook {
  const { openTxToast } = useNotification();

  const showTransactionStatus = useCallback((
    status: TransactionStatus,
    txHash: string,
    message?: string
  ) => {
    // Worldcoin is on Optimism, chainId = "10"
    openTxToast("10", txHash);
  }, [openTxToast]);

  const monitorTransaction = useCallback(async (txHash: string) => {
    try {
      // Initial pending status
      showTransactionStatus('pending', txHash, 'Transaction submitted');

      // The Blockscout SDK will automatically handle the status updates
      // and show appropriate toasts for pending, success, and error states
      await openTxToast("10", txHash);
    } catch (error) {
      console.error('Error monitoring transaction:', error);
      showTransactionStatus('error', txHash, 'Failed to monitor transaction');
    }
  }, [openTxToast, showTransactionStatus]);

  return {
    monitorTransaction,
    showTransactionStatus,
  };
} 