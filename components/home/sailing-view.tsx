"use client";

import { useState } from "react";
import { ArrowRight, Anchor, Users, Award, Clock, Ship, Timer, Coins } from "lucide-react";
import { mockSailingData, mockActiveSails } from "@/lib/mock-data";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TransactionStatusMonitor } from "@/components/TransactionStatusMonitor";
import { formatDistanceToNow } from 'date-fns';

export function SailingView() {
  const [bidPercentage, setBidPercentage] = useState<number>(5);
  const [currentTxHash, setCurrentTxHash] = useState<string | undefined>();
  const [bidAmounts, setBidAmounts] = useState<{ [key: number]: string }>({});
  const data = mockSailingData;

  const progressPercentage = ((data.currentRound - 1) / data.totalRounds) * 100;

  const handleBidSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // In a real app, this would submit to an API and get a transaction hash
      // For demo, we'll simulate a transaction hash
      const mockTxHash = "0x123..."; // This would come from your actual transaction
      setCurrentTxHash(mockTxHash);
    } catch (error) {
      console.error("Failed to submit bid:", error);
      alert("Failed to submit bid. Please try again.");
    }
  };

  const handlePayment = async () => {
    try {
      // In a real app, this would initiate a payment transaction
      // For demo, we'll simulate a transaction hash
      const mockTxHash = "0x456..."; // This would come from your actual transaction
      setCurrentTxHash(mockTxHash);
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  const handleTransactionSuccess = () => {
    setCurrentTxHash(undefined);
    // Refresh data or update UI as needed
    alert("Transaction completed successfully!");
  };

  const handleTransactionError = (error: any) => {
    setCurrentTxHash(undefined);
    console.error("Transaction failed:", error);
    alert("Transaction failed. Please try again.");
  };

  const handleBid = (sailId: number) => {
    const bidAmount = parseFloat(bidAmounts[sailId] || "0");
    if (bidAmount <= 0) return;
    // TODO: Implement actual bid submission
    console.log(`Placing bid of ${bidAmount}% interest for sail ${sailId}`);
  };

  const handlePaymentForSail = (sailId: number) => {
    // TODO: Implement actual payment submission
    console.log(`Making payment for sail ${sailId}`);
  };

  return (
    <div className="space-y-6">
      {currentTxHash && (
        <TransactionStatusMonitor
          txHash={currentTxHash}
          onSuccess={handleTransactionSuccess}
          onError={handleTransactionError}
        />
      )}

      <h2 className="text-2xl font-bold text-slate-900 dark:text-blue-100 mb-4">
        Your Active Voyages
      </h2>
      
      {mockActiveSails.map((sail) => (
        <Card key={sail.id} className="bg-white/10 border-blue-500/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Ship className="h-5 w-5" />
                {sail.name}
              </span>
              <span className="text-sm font-normal bg-blue-500/20 px-3 py-1 rounded-full">
                Round {sail.currentRound}/{sail.totalRounds}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-blue-400" />
                <div>
                  <p className="text-sm text-slate-600 dark:text-blue-300">Next Payout</p>
                  <p className="font-medium text-slate-900 dark:text-blue-100">
                    {formatDistanceToNow(new Date(sail.nextPayoutTime), { addSuffix: true })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-400" />
                <div>
                  <p className="text-sm text-slate-600 dark:text-blue-300">Crew</p>
                  <p className="font-medium text-slate-900 dark:text-blue-100">
                    {sail.currentCrewmates}/{sail.totalCrewmates}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Coins className="h-4 w-4 text-blue-400" />
                <div>
                  <p className="text-sm text-slate-600 dark:text-blue-300">Monthly Principal</p>
                  <p className="font-medium text-slate-900 dark:text-blue-100">
                    {sail.monthlyPrincipal} ETH
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-blue-300">Highest Bid</p>
                <p className="font-medium text-slate-900 dark:text-blue-100">
                  {(sail.highestBid.amount / 100).toFixed(1)}% Interest
                </p>
              </div>
            </div>

            {sail.hasWon ? (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-4">
                <p className="text-green-600 dark:text-green-400">
                  🎉 You won round {sail.currentRound - 1}! Your interest rate for future rounds: {(sail.yourInterestRate! / 100).toFixed(1)}%
                </p>
              </div>
            ) : (
              <div className="flex gap-4 items-center">
                <Input
                  type="number"
                  placeholder="Interest rate %"
                  value={bidAmounts[sail.id] || ""}
                  onChange={(e) => setBidAmounts({ ...bidAmounts, [sail.id]: e.target.value })}
                  className="max-w-[150px] bg-white/5"
                />
                <Button 
                  onClick={() => handleBid(sail.id)}
                  variant="secondary"
                >
                  Place Bid
                </Button>
                <Button 
                  onClick={() => handlePaymentForSail(sail.id)}
                  variant="outline"
                >
                  Make Payment
                </Button>
              </div>
            )}

            <div className="mt-4 text-sm text-slate-600 dark:text-blue-300">
              Your contribution this round: {sail.yourContribution} ETH
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}