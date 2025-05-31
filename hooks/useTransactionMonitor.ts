import { useNotification, useTransactionPopup } from "@blockscout/app-sdk";

export function useTransactionMonitor() {
  const { openTxToast } = useNotification();
  const { openPopup } = useTransactionPopup();

  const monitorTransaction = async (txHash: string) => {
    try {
      // Worldcoin is on Optimism, chainId = "10"
      await openTxToast("10", txHash);
    } catch (error) {
      console.error("Failed to monitor transaction:", error);
    }
  };

  const viewTransactionHistory = (address?: string) => {
    openPopup({
      chainId: "10", // Optimism
      address, // Optional: specific address
    });
  };

  return {
    monitorTransaction,
    viewTransactionHistory,
  };
} 