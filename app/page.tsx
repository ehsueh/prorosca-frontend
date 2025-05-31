"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SailingView } from "@/components/home/sailing-view";
import { NotSailingView } from "@/components/home/not-sailing-view";
import { MaroonedView } from "@/components/home/marooned-view";
import { CrewIncidentView } from "@/components/home/crew-incident-view";
import { mockUserState } from "@/lib/mock-data";
import { LandingPage } from '@/components/landing/LandingPage';
import { Sail } from '@/components/Sail';
import { CreateSail } from '@/components/CreateSail';
import { useAuth } from '@/components/providers/AuthProvider';

type UserState = "sailing" | "not-sailing" | "marooned" | "crew-incident";

interface SailData {
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
}

function HomeContent() {
  const searchParams = useSearchParams();
  const { isSignedIn } = useAuth();
  // For demo purposes, allow state to be changed via URL parameter
  const stateParam = searchParams.get("state") as UserState | null;
  
  const [userState, setUserState] = useState<UserState>("sailing");
  const [sails, setSails] = useState<SailData[]>([]);
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

  const handleCreateSail = (sailData: {
    name: string;
    monthlyPrincipal: number;
    crewmatesCount: number;
    durationInDays: number;
  }) => {
    const newSail: SailData = {
      id: sails.length + 1,
      name: sailData.name,
      monthlyPrincipal: sailData.monthlyPrincipal,
      crewmatesCount: sailData.crewmatesCount,
      currentRound: 0,
      highestBid: 0,
      topBidder: '',
      isSailing: true,
      startTime: new Date(),
      nextPayoutTime: new Date(Date.now() + sailData.durationInDays * 24 * 60 * 60 * 1000),
      captain: '0x1234...', // This will be the connected wallet address
    };

    setSails([...sails, newSail]);
  };

  const handlePlaceBid = (sailId: number, amount: number) => {
    setSails(sails.map(sail => {
      if (sail.id === sailId) {
        return {
          ...sail,
          highestBid: amount,
          topBidder: '0x1234...', // This will be the connected wallet address
        };
      }
      return sail;
    }));
  };

  const handleAbandonShip = (sailId: number) => {
    setSails(sails.map(sail => {
      if (sail.id === sailId) {
        return {
          ...sail,
          isSailing: false,
        };
      }
      return sail;
    }));
  };

  if (!isSignedIn) {
    return <LandingPage stats={stats} />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-100 mb-4">
            ProRosca Funding Sails ⛵
          </h1>
          <p className="text-xl text-blue-300 max-w-2xl mx-auto">
            Join AI-captained funding circles, bid for the treasure chest, and sail through rounds of funding with your fellow founders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold text-blue-100 mb-6">Launch New Sail</h2>
            <CreateSail onCreateSail={handleCreateSail} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-blue-100 mb-6">Active Sails</h2>
            <div className="space-y-6">
              {sails.map(sail => (
                <Sail
                  key={sail.id}
                  {...sail}
                  onPlaceBid={handlePlaceBid}
                  onAbandonShip={handleAbandonShip}
                />
              ))}
              {sails.length === 0 && (
                <div className="text-center p-8 bg-white/5 rounded-lg border-2 border-blue-500/20">
                  <p className="text-blue-300">No sails launched yet. Be the first captain! 🚢</p>
                </div>
              )}
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
      <div className="text-blue-100 text-xl">Loading...</div>
    </div>}>
      <HomeContent />
    </Suspense>
  );
}