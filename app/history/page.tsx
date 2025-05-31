"use client";

import React, { useState } from "react";
import { Calendar, ChevronRight, ChevronDown, TrendingUp, TrendingDown, Flag, CheckCircle, XCircle } from "lucide-react";
import { mockHistoryData } from "@/lib/mock-data";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function HistoryPage() {
  const [selectedSail, setSelectedSail] = useState(null);
  
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
            <History className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
            Past Voyages
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Your completed and abandoned sailing circles
          </p>
        </header>

        <div className="space-y-4">
          {mockHistoryData.map((sail) => (
            <Card key={sail.id} className="overflow-hidden">
              <Accordion type="single" collapsible>
                <AccordionItem value={`sail-${sail.id}`} className="border-0">
                  <div className="flex items-center p-4">
                    <div className={`w-2 h-10 rounded-full mr-3 ${
                      sail.status === 'completed' ? 'bg-emerald-500' : 'bg-amber-500'
                    }`} />
                    <div className="flex-1">
                      <h3 className="font-medium">{sail.name}</h3>
                      <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(sail.startDate)} — {formatDate(sail.endDate)}
                      </div>
                    </div>
                    <div className="text-right mr-2">
                      <div className="text-sm font-medium">
                        {formatCurrency(sail.totalValue)}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {sail.totalMembers} crew
                      </div>
                    </div>
                    <AccordionTrigger className="p-0" />
                  </div>
                  
                  <AccordionContent className="px-4 pb-4 pt-0">
                    <div className="space-y-3">
                      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-600 dark:text-slate-400">Your Round</span>
                          <span className="font-medium">Round {sail.userWonRound}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600 dark:text-slate-400">Your Payout</span>
                          <span className="font-medium">
                            {formatCurrency(sail.rounds[sail.userWonRound - 1].amount)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-xs">
                              View Complete Log
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{sail.name} Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 mt-2">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                                  <p className="text-xs text-slate-500 dark:text-slate-400">Status</p>
                                  <p className="font-medium flex items-center">
                                    {sail.status === "completed" ? (
                                      <>
                                        <CheckCircle className="h-4 w-4 text-emerald-500 mr-1" /> 
                                        Completed
                                      </>
                                    ) : (
                                      <>
                                        <XCircle className="h-4 w-4 text-amber-500 mr-1" /> 
                                        Abandoned
                                      </>
                                    )}
                                  </p>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                                  <p className="text-xs text-slate-500 dark:text-slate-400">Total Value</p>
                                  <p className="font-medium">{formatCurrency(sail.totalValue)}</p>
                                </div>
                              </div>
                              
                              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                                <h4 className="font-medium mb-2">Round by Round</h4>
                                <div className="space-y-2">
                                  {sail.rounds.map((round) => (
                                    <div 
                                      key={round.round}
                                      className={`p-2 rounded-lg border ${
                                        round.winner === "You" 
                                          ? "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50" 
                                          : "border-slate-200 dark:border-slate-700"
                                      }`}
                                    >
                                      <div className="flex justify-between items-center">
                                        <div>
                                          <div className="font-medium flex items-center">
                                            <Flag className="h-3 w-3 mr-1" />
                                            Round {round.round}
                                            {round.winner === "You" && (
                                              <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-1.5 py-0.5 rounded">
                                                Your Win
                                              </span>
                                            )}
                                          </div>
                                          <div className="text-xs text-slate-500 dark:text-slate-400">
                                            Winner: {round.winner}
                                          </div>
                                        </div>
                                        <div className="text-right">
                                          <div className="font-medium">{formatCurrency(round.amount)}</div>
                                          <div className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center justify-end">
                                            <TrendingDown className="h-3 w-3 mr-0.5" />
                                            {round.interest}%
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function History(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
    </svg>
  );
}