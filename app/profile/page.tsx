"use client";

import { User, Sailboat, AnchorIcon, Award, LifeBuoy, Share2 } from "lucide-react";
import { mockProfileData } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfilePage() {
  const data = mockProfileData;
  
  return (
    <div className="p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
          <User className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
          Profile
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Your sailing achievements and history
        </p>
      </header>
      
      <div className="space-y-6">
        <div className="text-center">
          <div className="h-20 w-20 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 text-2xl font-bold mx-auto mb-3">
            {data.accountAddress.substring(0, 1)}
          </div>
          <h2 className="text-lg font-bold">{data.accountAddress}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Sailor since {formatDate(data.joinDate)}
          </p>
          <Button variant="outline" size="sm" className="mt-2">
            <Share2 className="h-4 w-4 mr-1" /> Share Profile
          </Button>
        </div>
        
        <Tabs defaultValue="metrics">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="metrics" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-3 flex flex-col items-center justify-center text-center">
                <Sailboat className="h-6 w-6 text-blue-600 dark:text-blue-400 mb-1" />
                <h3 className="text-2xl font-bold">{data.totalSails}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Total Sails</p>
              </Card>
              
              <Card className="p-3 flex flex-col items-center justify-center text-center">
                <Award className="h-6 w-6 text-emerald-600 dark:text-emerald-400 mb-1" />
                <h3 className="text-2xl font-bold">{data.successfulSails}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Successful Sails</p>
              </Card>
              
              <Card className="p-3 flex flex-col items-center justify-center text-center">
                <LifeBuoy className="h-6 w-6 text-amber-600 dark:text-amber-400 mb-1" />
                <h3 className="text-2xl font-bold">{data.abandonedSails}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Abandoned Sails</p>
              </Card>
              
              <Card className="p-3 flex flex-col items-center justify-center text-center">
                <AnchorIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mb-1" />
                <h3 className="text-2xl font-bold">{data.anchorsEarned}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Anchors Earned</p>
              </Card>
            </div>
            
            <Card className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Nautical Miles Sailed</h3>
                <span className="text-sm font-bold">{data.nauticalMiles.toLocaleString()}</span>
              </div>
              <div className="h-3 bg-blue-100 dark:bg-blue-900 rounded-full mb-1 overflow-hidden">
                <div 
                  className="h-full bg-blue-600 dark:bg-blue-400 rounded-full"
                  style={{ width: `${Math.min((data.nauticalMiles / 20000) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Total value received through sailing circles
              </p>
            </Card>
            
            <Card className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Merit Points</h3>
                <span className="text-sm font-bold">{data.meritPoints}</span>
              </div>
              <div className="h-3 bg-emerald-100 dark:bg-emerald-900 rounded-full mb-1 overflow-hidden">
                <div 
                  className="h-full bg-emerald-600 dark:bg-emerald-400 rounded-full"
                  style={{ width: `${Math.min((data.meritPoints / 1000) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Earned through on-time payments and successful circles
              </p>
            </Card>
          </TabsContent>
          
          <TabsContent value="achievements" className="space-y-3 mt-4">
            <Card className="p-4 border-l-4 border-l-blue-500">
              <div className="flex">
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 mr-3 shrink-0">
                  <Sailboat className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium">First Voyage</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Completed your first full savings circle
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className={`p-4 border-l-4 ${data.anchorsEarned > 0 ? "border-l-emerald-500" : "border-l-slate-300 dark:border-l-slate-700 opacity-60"}`}>
              <div className="flex">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center mr-3 shrink-0 ${
                  data.anchorsEarned > 0 
                    ? "bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                }`}>
                  <AnchorIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium">
                    Captain&apos;s Courage
                    {data.anchorsEarned === 0 && <span className="text-xs ml-2 text-slate-500">Locked</span>}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Covered for a defaulting crew member as captain
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className={`p-4 border-l-4 ${data.totalSails >= 3 ? "border-l-indigo-500" : "border-l-slate-300 dark:border-l-slate-700 opacity-60"}`}>
              <div className="flex">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center mr-3 shrink-0 ${
                  data.totalSails >= 3 
                    ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                }`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6">
                    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" strokeWidth={1.5} />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">
                    Seasoned Sailor
                    {data.totalSails < 3 && <span className="text-xs ml-2 text-slate-500">Locked</span>}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Completed at least 3 savings circles
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className={`p-4 border-l-4 ${data.nauticalMiles >= 10000 ? "border-l-amber-500" : "border-l-slate-300 dark:border-l-slate-700 opacity-60"}`}>
              <div className="flex">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center mr-3 shrink-0 ${
                  data.nauticalMiles >= 10000 
                    ? "bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-300"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                }`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 22V15" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">
                    10K Nautical Miles
                    {data.nauticalMiles < 10000 && <span className="text-xs ml-2 text-slate-500">Locked</span>}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Sailed over 10,000 nautical miles (USD value)
                  </p>
                  {data.nauticalMiles < 10000 && (
                    <div className="mt-1">
                      <Progress value={(data.nauticalMiles / 10000) * 100} className="h-1" />
                      <p className="text-xs text-slate-500 mt-1">
                        {Math.round((data.nauticalMiles / 10000) * 100)}% complete
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}