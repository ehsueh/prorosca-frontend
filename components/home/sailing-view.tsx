"use client";

import { useState } from "react";
import { ArrowRight, Anchor, Users, Award, Clock } from "lucide-react";
import { mockSailingData } from "@/lib/mock-data";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SailingView() {
  const [bidPercentage, setBidPercentage] = useState<number>(5);
  const data = mockSailingData;

  const progressPercentage = ((data.currentRound - 1) / data.totalRounds) * 100;

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Bid submitted: ${bidPercentage}%`);
    // In a real app, this would submit to an API
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-4 text-white shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold flex items-center">
            <Anchor className="h-5 w-5 mr-2" />
            Currently Sailing
          </h2>
          <span className="text-xs font-medium bg-blue-600/50 px-2 py-1 rounded-full">
            Round {data.currentRound} of {data.totalRounds}
          </span>
        </div>
        
        <Progress value={progressPercentage} className="h-2 bg-blue-600/50" />
        
        <div className="flex justify-between mt-3 text-sm">
          <span>Round {data.currentRound}</span>
          <span>{data.roundsRemaining} rounds remaining</span>
        </div>
      </div>

      <Card className="p-4">
        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">
          Last Round Recap
        </h3>
        <div className="bg-blue-50 dark:bg-slate-800 rounded-lg p-3 mb-3">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-slate-600 dark:text-slate-300">Awarded Amount</span>
            <span className="font-medium">{formatCurrency(data.lastRound.awardedAmount)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-slate-600 dark:text-slate-300">Winning Interest</span>
            <span className="font-medium text-emerald-600 dark:text-emerald-400">
              {data.lastRound.winningInterest}%
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-slate-600 dark:text-slate-300">Winning Crew Member</span>
            <span className="font-medium">{data.lastRound.winningMember}</span>
          </div>
        </div>

        {!data.hasWon ? (
          <form onSubmit={handleBidSubmit} className="mt-4">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
              Your Bid for This Round
            </h3>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                min="0"
                max="20"
                step="0.1"
                value={bidPercentage}
                onChange={(e) => setBidPercentage(parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="text-lg font-medium">%</span>
            </div>
            <div className="mt-2 text-xs text-slate-500">
              Lower bids have a better chance of winning, but reduce your payout.
            </div>
            <Button className="w-full mt-3" type="submit">
              Submit Bid
            </Button>
          </form>
        ) : (
          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg mt-3">
            <p className="text-emerald-700 dark:text-emerald-300 font-medium">
              You won in round {data.currentRound - 2}!
            </p>
            <p className="text-sm text-emerald-600/80 dark:text-emerald-400/80 mt-1">
              Your awarded amount: {formatCurrency(data.lastRound.awardedAmount)}
            </p>
          </div>
        )}
      </Card>

      <Card className="p-4">
        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">
          Next Payment Due
        </h3>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold">
              {formatCurrency(data.nextPayment.amount)}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Due {formatDate(data.nextPayment.dueDate)}
            </p>
          </div>
          <Button>Pay Now</Button>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">
            <Users className="h-4 w-4 inline mr-1" /> Crew Members
          </h3>
          <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
            {data.crewMembers.length} sailors
          </span>
        </div>
        <ul className="divide-y divide-slate-100 dark:divide-slate-800">
          {data.crewMembers.map((member) => (
            <li key={member.id} className="py-2 flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 mr-2">
                  {member.name.substring(0, 1).toUpperCase()}
                </div>
                <span className={member.name === "You" ? "font-medium" : ""}>
                  {member.name}
                  {member.isCaptain && (
                    <span className="ml-1 text-xs bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded">
                      Captain
                    </span>
                  )}
                </span>
              </div>
              {member.hasWon && <Award className="h-4 w-4 text-emerald-500" />}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}