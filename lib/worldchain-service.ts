import { MiniKit } from '@worldcoin/minikit-js';
import { WORLD_CHAIN_ID } from './worldchain';

export interface LendingTransaction {
  amount: string;
  recipient: string;
  deadline: number;
}

// ABI for the lending contract
const LENDING_ABI = [
  {
    inputs: [
      { name: 'amount', type: 'uint256' },
      { name: 'recipient', type: 'address' },
      { name: 'deadline', type: 'uint256' }
    ],
    name: 'lend',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  }
];

export class WorldChainService {
  static async sendTransaction(transaction: LendingTransaction) {
    if (!MiniKit.isInstalled()) {
      throw new Error('World App is not installed');
    }

    try {
      // Send transaction through World App
      const { commandPayload, finalPayload } = await MiniKit.commandsAsync.sendTransaction({
        transaction: [{
          address: process.env.NEXT_PUBLIC_LENDING_CONTRACT_ADDRESS as string,
          abi: LENDING_ABI,
          functionName: 'lend',
          args: [
            transaction.amount,
            transaction.recipient,
            transaction.deadline.toString()
          ],
          value: transaction.amount
        }],
      });

      if (finalPayload.status === 'error') {
        throw new Error('Transaction failed');
      }

      return finalPayload.transaction_id;
    } catch (error) {
      console.error('Failed to send transaction:', error);
      throw error;
    }
  }

  static async getTransactionStatus(transactionId: string) {
    if (!MiniKit.isInstalled()) {
      throw new Error('World App is not installed');
    }

    try {
      const response = await fetch(
        `https://developer.worldcoin.org/api/v2/minikit/transaction/${transactionId}?app_id=${process.env.NEXT_PUBLIC_WORLD_APP_ID}&type=transaction`,
        { method: 'GET' }
      );
      
      const data = await response.json();
      return data.transactionStatus;
    } catch (error) {
      console.error('Failed to get transaction status:', error);
      throw error;
    }
  }
} 