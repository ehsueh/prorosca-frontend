"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SailingView } from "@/components/home/sailing-view";
import { NotSailingView } from "@/components/home/not-sailing-view";
import { MaroonedView } from "@/components/home/marooned-view";
import { CrewIncidentView } from "@/components/home/crew-incident-view";
import { mockUserState } from "@/lib/mock-data";
import { Home } from "lucide-react";

type UserState = "sailing" | "not-sailing" | "marooned" | "crew-incident";

export default function Home() {
  const searchParams = useSearchParams();
  // For demo purposes, allow state to be changed via URL parameter
  const stateParam = searchParams.get("state") as UserState | null;
  
  const [userState, setUserState] = useState<UserState>("sailing");
  
  useEffect(() => {
    // For demo/testing purposes: Get state from URL or mock data
    if (stateParam && ["sailing", "not-sailing", "marooned", "crew-incident"].includes(stateParam)) {
      setUserState(stateParam);
    } else {
      // In a real app, this would come from an API call or auth state
      setUserState(mockUserState.state);
    }
  }, [stateParam]);

  // Show the appropriate view based on user's current state
  return (
    <div className="p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
          <Home className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
          Home
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Sail Together, Save Together
        </p>
      </header>

      {/* For demo purposes, add state selector */}
      <div className="mb-6 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg text-xs">
        <p className="font-medium text-blue-800 dark:text-blue-300 mb-2">Demo Controls:</p>
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

      {userState === "sailing" && <SailingView />}
      {userState === "not-sailing" && <NotSailingView />}
      {userState === "marooned" && <MaroonedView />}
      {userState === "crew-incident" && <CrewIncidentView />}
    </div>
  );
}