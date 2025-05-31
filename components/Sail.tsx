import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SailProps {
  id: number;
  name: string;
  monthlyPrincipal: number;
  crewmatesCount: number;
  currentRound: number;
  highestBid: number;
  topBidder: string;
  isSailing: boolean;
  startTime: Date;
  nextPayoutTime: Date;
  captain: string;
  onPlaceBid: (sailId: number, amount: number) => void;
  onAbandonShip: (sailId: number) => void;
}

export function Sail({
  id,
  name,
  monthlyPrincipal,
  crewmatesCount,
  currentRound,
  highestBid,
  topBidder,
  isSailing,
  startTime,
  nextPayoutTime,
  captain,
  onPlaceBid,
  onAbandonShip,
}: SailProps) {
  const [bidAmount, setBidAmount] = useState<number>(0);
  
  const timeLeft = new Date(nextPayoutTime).getTime() - new Date().getTime();
  const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return (
    <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-2 border-blue-500/20">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-blue-100">{name}</CardTitle>
          <Badge variant={isSailing ? "default" : "destructive"}>
            {isSailing ? "⛵ Sailing" : "⚓ Anchored"}
          </Badge>
        </div>
        <CardDescription className="text-blue-200">
          Captain: {captain}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-blue-300">Monthly Principal</div>
            <div className="text-right font-mono">{monthlyPrincipal} ETH</div>
            <div className="text-blue-300">Crew Size</div>
            <div className="text-right">{crewmatesCount} sailors</div>
            <div className="text-blue-300">Current Round</div>
            <div className="text-right">{currentRound} of {crewmatesCount}</div>
            <div className="text-blue-300">Highest Bid</div>
            <div className="text-right font-mono">{highestBid} ETH</div>
            <div className="text-blue-300">Top Bidder</div>
            <div className="text-right truncate">{topBidder}</div>
          </div>
          
          {isSailing && (
            <div className="mt-4 p-3 bg-blue-900/30 rounded-lg">
              <div className="text-sm text-blue-200 mb-2">Next Port: {daysLeft}d {hoursLeft}h</div>
              <div className="flex gap-2">
                <input
                  type="number"
                  min={highestBid}
                  step="0.01"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(Number(e.target.value))}
                  className="flex-1 px-3 py-2 bg-blue-950/50 border border-blue-500/30 rounded-md text-blue-100"
                  placeholder="Bid amount in ETH"
                />
                <Button 
                  onClick={() => onPlaceBid(id, bidAmount)}
                  disabled={bidAmount <= highestBid}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Place Bid
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {captain === topBidder && isSailing && (
          <Button 
            variant="destructive" 
            onClick={() => onAbandonShip(id)}
            className="w-full"
          >
            🏴‍☠️ Abandon Ship
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}