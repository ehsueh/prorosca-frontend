"use client";

import { HistoryView } from "@/components/home/history-view";

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 dark:from-blue-900 dark:to-blue-950">
      <div className="container mx-auto px-4 py-8">
        <HistoryView />
      </div>
    </div>
  );
}