"use client";

import { AlertTriangle, DollarSign, Calendar } from "lucide-react";
import { mockMaroonedData } from "@/lib/mock-data";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function MaroonedView() {
  const data = mockMaroonedData;

  const handleSettleDebt = () => {
    alert("Settling debt...");
    // In a real app, this would open a payment flow
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-xl p-5 text-white shadow-lg">
        <div className="flex items-start">
          <AlertTriangle className="h-10 w-10 mr-3" />
          <div>
            <h2 className="text-xl font-bold mb-1">You've Been Marooned</h2>
            <p className="text-white/80">
              Due to missed payments, you've been temporarily blacklisted from joining new circles
            </p>
          </div>
        </div>
      </div>

      <Card className="p-4">
        <h3 className="text-lg font-medium mb-4">Outstanding Debt Summary</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
              Missed Payments
            </h4>
            {data.missedPayments.map((payment, i) => (
              <div 
                key={i}
                className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 flex justify-between items-center"
              >
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-red-500" />
                  <span className="text-sm">{formatDate(payment.date)}</span>
                </div>
                <span className="font-medium">
                  {formatCurrency(payment.amount)}
                </span>
              </div>
            ))}
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm">Principal</span>
              <span>{formatCurrency(data.outstandingDebt.principal)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Interest</span>
              <span>{formatCurrency(data.outstandingDebt.interest)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Penalty Fees</span>
              <span className="text-red-600 dark:text-red-400">
                {formatCurrency(data.outstandingDebt.penalty)}
              </span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-medium">
              <span>Total Owed</span>
              <span>{formatCurrency(data.outstandingDebt.total)}</span>
            </div>
          </div>
          
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
            <h4 className="font-medium mb-2">Required Lock Deposit</h4>
            <div className="flex justify-between items-center">
              <div className="text-sm text-slate-600 dark:text-slate-300">
                Security deposit for rejoining
              </div>
              <span className="font-medium">{formatCurrency(data.lockDeposit)}</span>
            </div>
            <p className="text-xs text-amber-700 dark:text-amber-400 mt-2">
              This deposit will be locked for your next 2 circles and returned if you remain in good standing
            </p>
          </div>
          
          <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4">
            <h4 className="font-medium mb-2">Total Payment Required</h4>
            <div className="text-2xl font-bold text-center my-2">
              {formatCurrency(data.outstandingDebt.total + data.lockDeposit)}
            </div>
            <Button 
              onClick={handleSettleDebt} 
              className="w-full mt-2"
            >
              Settle Debt
            </Button>
          </div>
        </div>
      </Card>
      
      <div className="text-center text-sm text-slate-500 dark:text-slate-400">
        <p>Questions about your account status?</p>
        <Button variant="link" className="p-0 h-auto text-blue-600 dark:text-blue-400">
          Contact Support
        </Button>
      </div>
    </div>
  );
}