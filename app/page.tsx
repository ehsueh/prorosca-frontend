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
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { worldchain } from '@/lib/chains';
import { toast } from 'sonner';

// ABI for the joinSail function
const SailABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "contributionAmount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "contributionCurrency",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "loanTargetAmount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "loanTargetCurrency",
        "type": "address"
      },
      {
        "internalType": "uint8",
        "name": "urgency",
        "type": "uint8"
      }
    ],
    "name": "joinSail",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

// Contract address - replace with your actual contract address
const SAIL_CONTRACT_ADDRESS = "0x..."; // Replace with your contract address

// Currency addresses - replace with actual token addresses
const CURRENCY_ADDRESSES = {
  USDC: "0x...", // Replace with USDC address
  USDT: "0x...", // Replace with USDT address
  DAI: "0x..."  // Replace with DAI address
} as const;

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

  const { writeContract, data: hash } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
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
      title: "Create Circle",
      description: "Start a new funding circle and invite others to join",
      icon: <PlusCircle className="h-8 w-8 text-slate-900 dark:text-blue-400" />,
      onClick: () => router.push("/create"),
      color: "from-blue-500/20 to-blue-600/20"
    },
    {
      title: "Join Circle",
      description: "Browse and join existing funding circles",
      icon: <Users className="h-8 w-8 text-slate-900 dark:text-green-400" />,
      onClick: () => router.push("/join"),
      color: "from-green-500/20 to-green-600/20"
    },
    {
      title: "Active Circles",
      description: "View and manage your active funding circles",
      icon: <Ship className="h-8 w-8 text-slate-900 dark:text-purple-400" />,
      onClick: () => router.push("/active"),
      color: "from-purple-500/20 to-purple-600/20"
    },
    {
      title: "History",
      description: "View your past funding circles and transactions",
      icon: <History className="h-8 w-8 text-slate-900 dark:text-orange-400" />,
      onClick: () => router.push("/history"),
      color: "from-orange-500/20 to-orange-600/20"
    }
  ];

  const handleJoinSail = async (formData: {
    contributionAmount: string;
    contributionCurrency: string;
    loanTargetAmount: string;
    loanTargetCurrency: string;
    urgency: string;
  }) => {
    try {
      // Convert urgency string to number (0: now, 1: sooner-than-later, 2: dont-care)
      const urgencyMap = {
        'now': 0,
        'sooner-than-later': 1,
        'dont-care': 2
      };
      
      const urgencyValue = urgencyMap[formData.urgency as keyof typeof urgencyMap] || 1;

      // Convert amounts to wei (18 decimals)
      const contributionAmount = BigInt(parseFloat(formData.contributionAmount) * 1e18);
      const loanTargetAmount = BigInt(parseFloat(formData.loanTargetAmount) * 1e18);

      writeContract({
        address: SAIL_CONTRACT_ADDRESS as `0x${string}`,
        abi: SailABI,
        functionName: 'joinSail',
        args: [
          contributionAmount,
          CURRENCY_ADDRESSES[formData.contributionCurrency as keyof typeof CURRENCY_ADDRESSES] as `0x${string}`,
          loanTargetAmount,
          CURRENCY_ADDRESSES[formData.loanTargetCurrency as keyof typeof CURRENCY_ADDRESSES] as `0x${string}`,
          urgencyValue
        ],
      });

      if (isConfirmed) {
        toast.success('Transaction confirmed');
        // Update UI or redirect as needed
      }

    } catch (error) {
      console.error('Failed to join sail:', error);
      toast.error('Failed to join sail. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-blue-100 mb-4">
            ProRosca Funding Circles ⛵
          </h1>
          <p className="text-xl text-slate-700 dark:text-blue-300 max-w-2xl mx-auto">
            Join funding circles, bid for the treasure chest, and sail through rounds of funding with your fellow founders.
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
                className={`px-3 py-1 rounded-full ${
                  userState === state
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
          {userState === "not-sailing" && <NotSailingView onJoinSail={handleJoinSail} />}
          {userState === "marooned" && <MaroonedView />}
          {userState === "crew-incident" && <CrewIncidentView />}
        </div>

        {/* Navigation Options */}
        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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