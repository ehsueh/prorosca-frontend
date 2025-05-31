import { useState, useCallback } from 'react';
import { useWaitForTransactionReceipt } from '@worldcoin/minikit-react';
import { createPublicClient, http } from 'viem';
import { WorldChainService, LendingTransaction } from '@/lib/worldchain-service';

export interface TransactionState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
  transactionId: string | null;
}

export const useWorldTransaction = () => {
  const [state, setState] = useState<TransactionState>({
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: null,
    transactionId: null,
  });

  // Create World Chain client
  const client = createPublicClient({
    chain: {
      id: 10, // World Chain
      name: 'World Chain',
      network: 'world',
      nativeCurrency: {
        name: 'WLD',
        symbol: 'WLD',
        decimals: 18,
      },
      rpcUrls: {
        default: { http: ['https://rpc.world.org'] },
      },
    },
    transport: http(),
  });

  // Monitor transaction status
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    client,
    appConfig: {
      app_id: process.env.NEXT_PUBLIC_WORLD_APP_ID || '',
    },
    transactionId: state.transactionId || '',
    enabled: !!state.transactionId,
  });

  const sendTransaction = useCallback(async (transaction: LendingTransaction) => {
    setState(prev => ({ ...prev, isLoading: true, isError: false, error: null }));

    try {
      const transactionId = await WorldChainService.sendTransaction(transaction);
      setState(prev => ({ ...prev, transactionId }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isError: true,
        error: error as Error,
        isLoading: false,
      }));
    }
  }, []);

  return {
    ...state,
    isConfirming,
    isConfirmed,
    sendTransaction,
  };
}; 