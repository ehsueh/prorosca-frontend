"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, History, Settings, User } from "lucide-react";
import { useAuth } from "./providers/AuthProvider";

export default function Navigation() {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return null;
  }

  const tabs = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
    {
      name: "History",
      href: "/history",
      icon: History,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-lg">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between">
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(
                "flex flex-col items-center py-2 px-3 text-xs font-medium flex-1 relative",
                pathname === tab.href
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
              )}
            >
              {pathname === tab.href && (
                <span className="absolute top-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
              )}
              <tab.icon className="h-5 w-5 mb-1" />
              <span>{tab.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}