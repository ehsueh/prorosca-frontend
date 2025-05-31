"use client";

import { useState } from "react";
import { Settings as SettingsIcon, AlertCircle, Moon, Sun } from "lucide-react";
import { mockSettingsData } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "next-themes";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState(mockSettingsData);
  
  const handleMaxInterestChange = (value: number[]) => {
    setSettings((prev) => ({ ...prev, maxInterestWillingToBid: value[0] }));
  };
  
  const handleSwitchChange = (field: string, checked: boolean) => {
    setSettings((prev) => ({ ...prev, [field]: checked }));
  };
  
  const handleSelectChange = (field: string, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleSaveSettings = () => {
    alert("Settings saved!");
    // In a real app, this would save to an API
  };
  
  return (
    <div className="p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
          <SettingsIcon className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
          Settings
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Configure your sailing preferences
        </p>
      </header>

      <div className="space-y-6">
        <Card className="p-4">
          <h2 className="text-lg font-medium mb-4">Risk Preferences</h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="max-interest">Maximum Interest Willing to Bid</Label>
                <span className="text-sm font-medium">{settings.maxInterestWillingToBid}%</span>
              </div>
              <Slider
                id="max-interest"
                min={0}
                max={20}
                step={0.5}
                value={[settings.maxInterestWillingToBid]}
                onValueChange={handleMaxInterestChange}
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                This sets an upper limit on your bids to prevent overbidding
              </p>
            </div>
            
            <div>
              <Label htmlFor="risk-preference" className="mb-2 block">Risk Preference</Label>
              <Select 
                value={settings.riskPreference} 
                onValueChange={(value) => handleSelectChange("riskPreference", value)}
              >
                <SelectTrigger id="risk-preference">
                  <SelectValue placeholder="Select risk level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Stable">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                      Stable - Lower risk, lower reward
                    </div>
                  </SelectItem>
                  <SelectItem value="Balanced">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      Balanced - Moderate risk and reward
                    </div>
                  </SelectItem>
                  <SelectItem value="Bold">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
                      Bold - Higher risk, higher reward
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Influences the types of circles you'll be matched with
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <h2 className="text-lg font-medium mb-4">App Preferences</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="notifications" className="mb-1 block">Notifications</Label>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Receive alerts about bids, payments, and results
                </p>
              </div>
              <Switch
                id="notifications"
                checked={settings.notificationsEnabled}
                onCheckedChange={(checked) => handleSwitchChange("notificationsEnabled", checked)}
              />
            </div>
            
            <div>
              <Label htmlFor="currency" className="mb-2 block">Default Currency</Label>
              <Select 
                value={settings.defaultCurrency} 
                onValueChange={(value) => handleSelectChange("defaultCurrency", value)}
              >
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USDC">USDC</SelectItem>
                  <SelectItem value="USDT">USDT</SelectItem>
                  <SelectItem value="DAI">DAI</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="language" className="mb-2 block">Language</Label>
              <Select 
                value={settings.language} 
                onValueChange={(value) => handleSelectChange("language", value)}
              >
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="mb-2 block">Theme</Label>
              <div className="flex space-x-2">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  size="sm"
                  className="flex-1"
                  onClick={() => setTheme("light")}
                >
                  <Sun className="h-4 w-4 mr-2" />
                  Light
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  size="sm"
                  className="flex-1"
                  onClick={() => setTheme("dark")}
                >
                  <Moon className="h-4 w-4 mr-2" />
                  Dark
                </Button>
                <Button
                  variant={theme === "system" ? "default" : "outline"}
                  size="sm"
                  className="flex-1"
                  onClick={() => setTheme("system")}
                >
                  System
                </Button>
              </div>
            </div>
          </div>
        </Card>
        
        <div className="bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-lg p-4 flex">
          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-3 shrink-0" />
          <div>
            <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-1">Important Notice</h3>
            <p className="text-sm text-amber-700 dark:text-amber-400">
              Changing risk preferences will only affect future circles you join, not ones you&apos;re currently participating in.
            </p>
          </div>
        </div>
        
        <Button className="w-full" onClick={handleSaveSettings}>
          Save Settings
        </Button>
      </div>
    </div>
  );
}