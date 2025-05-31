import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockHistoricalSails } from "@/lib/mock-data";
import { Ship, Timer, Users, Coins, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';

export function HistoryView() {
  const getStatusIcon = (status: 'active' | 'completed' | 'abandoned') => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'active':
        return <Ship className="h-5 w-5 text-blue-500" />;
      case 'abandoned':
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusClass = (status: "active" | "completed" | "abandoned") => {
    switch (status) {
      case "active":
        return "border-blue-500/50";
      case "completed":
        return "border-emerald-500/50";
      case "abandoned":
        return "border-amber-500/50";
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-blue-100 mb-4">
        Past Voyages
      </h2>
      
      {mockHistoricalSails.map((sail) => (
        <Card key={sail.id} className={`${getStatusClass(sail.status)} border-2`}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Ship className="h-5 w-5" />
                {sail.name}
              </span>
              <span className="flex items-center gap-2 text-sm font-normal">
                {getStatusIcon(sail.status)}
                {sail.status.charAt(0).toUpperCase() + sail.status.slice(1)}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-blue-400" />
                <div>
                  <p className="text-sm text-slate-600 dark:text-blue-300">Duration</p>
                  <p className="font-medium text-slate-900 dark:text-blue-100">
                    {format(new Date(sail.startTime), 'MMM d')} - {format(new Date(sail.nextPayoutTime), 'MMM d')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-400" />
                <div>
                  <p className="text-sm text-slate-600 dark:text-blue-300">Crew Size</p>
                  <p className="font-medium text-slate-900 dark:text-blue-100">
                    {sail.totalCrewmates} members
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
                <p className="text-sm text-slate-600 dark:text-blue-300">Your Interest Rate</p>
                <p className="font-medium text-slate-900 dark:text-blue-100">
                  {(sail.yourInterestRate! / 100).toFixed(1)}%
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-blue-300">
              <div>Total Rounds: {sail.totalRounds}</div>
              <div>Completed Rounds: {sail.currentRound}</div>
              {sail.hasWon && (
                <div className="text-green-600 dark:text-green-400">
                  🏆 Won round {sail.roundWinner === "You" ? sail.currentRound : sail.currentRound - 1}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 