"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { mockUserState } from "@/lib/mock-data";
import { LandingPage } from '@/components/landing/LandingPage';
import { useAuth } from '@/components/providers/AuthProvider';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ship, Users, History, PlusCircle } from "lucide-react";
import { SailingView } from "@/components/home/sailing-view";
import { NotSailingView } from "@/components/home/not-sailing-view";
import { MaroonedView } from "@/components/home/marooned-view";
import { CrewIncidentView } from "@/components/home/crew-incident-view";
import { worldchain } from '@/lib/chains';
import { toast } from 'sonner';
import { MiniKit } from "@worldcoin/minikit-js";
import { ABI, CONTRACT_ADDRESS } from '@/lib/abi'

type UserState = "sailing" | "not-sailing" | "marooned" | "crew-incident";

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const stateParam = searchParams.get("state") as UserState | null;
  const [userState, setUserState] = useState<UserState>("sailing");
  const [stats, setStats] = useState({
    totalSails: 0,
    totalFunds: 0,
    activeSails: 0,
    successfulVoyages: 0
  });

  useEffect(() => {
    // For demo/testing purposes: Get state from URL or mock data
    if (stateParam && ["sailing", "not-sailing", "marooned", "crew-incident"].includes(stateParam)) {
      setUserState(stateParam);
    } else {
      // In a real app, this would come from an API call or auth state
      setUserState(mockUserState.state as UserState);
    }
  }, [stateParam]);

  useEffect(() => {
    // TODO: Replace with actual contract calls
    const fetchStats = async () => {
      // Mock stats for now
      setStats({
        totalSails: 42,
        totalFunds: 156.8,
        activeSails: 12,
        successfulVoyages: 30
      });
    };

    fetchStats();
  }, []);

  if (!isSignedIn) {
    return <LandingPage stats={stats} />;
  }

  const options = [
    {
      title: "Apply for Funding",
      description: "Submit your application to join a funding circle",
      icon: <Users className="h-8 w-8 text-slate-900 dark:text-green-400" />,
      onClick: () => router.push("/join"),
      color: "from-green-500/20 to-green-600/20"
    },
    {
      title: "Active Voyages",
      description: "View and manage your active funding circles",
      icon: <Ship className="h-8 w-8 text-slate-900 dark:text-purple-400" />,
      onClick: () => setUserState("sailing"),
      color: "from-purple-500/20 to-purple-600/20"
    },
    {
      title: "Sailing History",
      description: "View your past voyages and transactions",
      icon: <History className="h-8 w-8 text-slate-900 dark:text-orange-400" />,
      onClick: () => router.push("/history"),
      color: "from-orange-500/20 to-orange-600/20"
    }
  ];

  const sendTransaction = async (formData: {
    contributionAmount: string;
    contributionCurrency: string;
    loanTargetAmount: string;
    loanTargetCurrency: string;
    urgency: string;
  }) => {
    const { commandPayload, finalPayload } = await MiniKit.commandsAsync.sendTransaction({
      transaction: [
        {
          address: CONTRACT_ADDRESS,
          abi: ABI,
          functionName: 'joinSail',
          args: [formData.contributionAmount, formData.contributionCurrency, formData.loanTargetAmount, formData.loanTargetCurrency, formData.urgency],
        },
      ],

    })

    if (finalPayload.status === 'success') {
      console.log(
        'Transaction submitted, waiting for confirmation:',
        finalPayload.transaction_id,
      );
      // setTransactionId(finalPayload.transaction_id);
    } else {
      console.error('Transaction submission failed:', finalPayload);
      // setButtonState('failed');
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 dark:from-blue-900 dark:to-blue-950">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-blue-100 mb-4">
            ProRosca Funding Circles ⛵
          </h1>
          <p className="text-xl text-slate-700 dark:text-blue-300 max-w-2xl mx-auto">
            Apply to join funding circles and get matched with the perfect crew by our AI captains. Bid for the treasure chest and sail through rounds of funding with your fellow founders.
          </p>
        </div>

        {/* Demo Controls */}
        <div className="mb-6 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg text-xs max-w-4xl mx-auto">
          <p className="font-medium text-slate-800 dark:text-blue-300 mb-2">Demo Controls:</p>
          <div className="flex flex-wrap gap-2">
            {["sailing", "not-sailing", "marooned", "crew-incident"].map((state) => (
              <button
                key={state}
                onClick={() => setUserState(state as UserState)}
                className={`px-3 py-1 rounded-full ${userState === state
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                  }`}
              >
                {state}
              </button>
            ))}
          </div>
        </div>

        {/* State-based Views */}
        <div className="max-w-4xl mx-auto">
          {userState === "sailing" && <SailingView />}
          {userState === "not-sailing" && <NotSailingView onJoinSail={sendTransaction} />}
          {userState === "marooned" && <MaroonedView />}
          {userState === "crew-incident" && <CrewIncidentView />}
        </div>

        {/* Navigation Options */}
        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {options.map((option, index) => (
              <Card
                key={index}
                className={`bg-gradient-to-br ${option.color} border-2 border-blue-500/20 hover:border-blue-500/40 transition-all cursor-pointer`}
                onClick={option.onClick}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-white/10 rounded-lg">
                      {option.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-blue-100 mb-2">
                        {option.title}
                      </h3>
                      <p className="text-slate-700 dark:text-blue-300">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 text-center">
          <div className="inline-grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/5 rounded-lg p-4">
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-blue-100">{stats.totalSails}</p>
              <p className="text-sm text-slate-700 dark:text-blue-300">Total Circles</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-blue-100">{stats.totalFunds} ETH</p>
              <p className="text-sm text-slate-700 dark:text-blue-300">Total Funds</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-blue-100">{stats.activeSails}</p>
              <p className="text-sm text-slate-700 dark:text-blue-300">Active Circles</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-blue-100">{stats.successfulVoyages}</p>
              <p className="text-sm text-slate-700 dark:text-blue-300">Successful Voyages</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 flex items-center justify-center">
      <div className="text-slate-900 dark:text-blue-100 text-xl">Loading...</div>
    </div>}>
      <HomeContent />
    </Suspense>
  );
}