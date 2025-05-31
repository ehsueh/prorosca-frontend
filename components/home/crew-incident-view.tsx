"use client";

import { AlertCircle, Anchor, ShieldAlert, LifeBuoy } from "lucide-react";
import { mockIncidentData, mockSailingData } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function CrewIncidentView() {
  const data = { ...mockIncidentData, circle: mockSailingData };
  
  const handleCoverLoss = () => {
    alert("Covering the loss as captain...");
    // In a real app, this would trigger a transaction
  };
  
  const handleAbandonShip = () => {
    alert("Abandoning ship...");
    // In a real app, this would trigger the circle dissolution
  };

  const isCaptain = true; // In a real app, this would be determined by user state

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-amber-500 to-red-600 rounded-xl p-5 text-white shadow-lg">
        <div className="flex items-start">
          <ShieldAlert className="h-10 w-10 mr-3" />
          <div>
            <h2 className="text-xl font-bold mb-1">Crew Incident Alert</h2>
            <p className="text-white/80">
              A crew member has missed their payment and action is required
            </p>
          </div>
        </div>
      </div>

      <Alert variant="destructive" className="border-red-300 bg-red-50 dark:bg-red-950 dark:border-red-800">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle>Payment Default</AlertTitle>
        <AlertDescription>
          <span className="font-medium">{data.defaulter}</span> has missed their payment for round {data.defaultRound}
        </AlertDescription>
      </Alert>

      <Card className="p-4">
        <h3 className="text-lg font-medium mb-4">Incident Details</h3>
        
        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-slate-600 dark:text-slate-300">Defaulter</span>
            <span className="font-medium">{data.defaulter}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-slate-600 dark:text-slate-300">Default Amount</span>
            <span className="font-medium">{formatCurrency(data.defaultAmount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-slate-600 dark:text-slate-300">Default Round</span>
            <span className="font-medium">{data.defaultRound} of {data.circle.totalRounds}</span>
          </div>
        </div>

        {isCaptain ? (
          <div>
            <h3 className="text-lg font-medium mb-3">Captain's Decision Required</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              As the captain, you must decide how to handle this incident:
            </p>
            
            <div className="space-y-4">
              <div className="border border-emerald-200 dark:border-emerald-800 rounded-lg p-4 bg-emerald-50 dark:bg-emerald-950/50">
                <h4 className="font-medium flex items-center mb-2">
                  <Anchor className="h-4 w-4 mr-2 text-emerald-600 dark:text-emerald-400" />
                  Cover the Loss
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  Pay {formatCurrency(data.defaultAmount)} to keep the circle running. You'll earn:
                </p>
                <ul className="text-sm space-y-1 mb-3">
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2"></span>
                    Captain's Bounty: {formatCurrency(data.captainBounty)}
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2"></span>
                    +1 Anchor (reputation points)
                  </li>
                </ul>
                <Button 
                  onClick={handleCoverLoss} 
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  Cover the Loss
                </Button>
              </div>
              
              <div className="border border-red-200 dark:border-red-800 rounded-lg p-4 bg-red-50 dark:bg-red-950/50">
                <h4 className="font-medium flex items-center mb-2">
                  <LifeBuoy className="h-4 w-4 mr-2 text-red-600 dark:text-red-400" />
                  Abandon Ship
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  Dissolve the circle early. This will:
                </p>
                <ul className="text-sm space-y-1 mb-3">
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 mr-2"></span>
                    Return remaining funds to all members
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 mr-2"></span>
                    Blacklist {data.defaulter} until repayment
                  </li>
                  <li className="flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 mr-2"></span>
                    Count as an &quot;Abandoned Sail&quot; for all
                  </li>
                </ul>
                <Button 
                  onClick={handleAbandonShip} 
                  variant="outline"
                  className="w-full border-red-300 text-red-700 hover:bg-red-100 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
                >
                  Abandon Ship
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-medium mb-3">Awaiting Captain's Decision</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              The captain is reviewing this incident and will decide whether to:
            </p>
            
            <div className="space-y-3">
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <h4 className="font-medium">Cover the Loss</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Pay the defaulted amount to keep the circle running
                </p>
              </div>
              
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <h4 className="font-medium">Abandon Ship</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Dissolve the circle and return remaining funds
                </p>
              </div>
            </div>
            
            <div className="mt-4 animate-pulse bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 flex items-center">
              <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Waiting for captain&apos;s response...
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}