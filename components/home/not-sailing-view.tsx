"use client";

import { useState } from "react";
import { ArrowRight, Anchor, DollarSign, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type OnboardingStep = "intro" | "form" | "matching" | "bid";

interface NotSailingViewProps {
  onJoinSail: (formData: {
    monthlyBudget: number;
    desiredLoanAmount: number;
    urgency: number;
  }) => Promise<void>;
}

export function NotSailingView({ onJoinSail }: NotSailingViewProps) {
  const [step, setStep] = useState<OnboardingStep>("intro");
  const [formData, setFormData] = useState({
    budget: "200",
    currency: "USDC",
    loanTarget: "2400",
    urgency: "sooner-than-later",
    projectDescription: "",
  });
  const [initialBid, setInitialBid] = useState("7.5");

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCurrencyChange = (value: string) => {
    setFormData((prev) => ({ ...prev, currency: value }));
  };

  const handleLoanTargetChange = (value: string) => {
    setFormData((prev) => ({ ...prev, loanTarget: value }));
  };

  const handleUrgencyChange = (value: string) => {
    setFormData((prev) => ({ ...prev, urgency: value }));
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep("matching");

    try {
      await onJoinSail({
        monthlyBudget: Number(formData.budget),
        desiredLoanAmount: Number(formData.loanTarget),
        urgency: Number(formData.urgency),
      });

      // Simulate matching delay for demo purposes
      setTimeout(() => {
        setStep("bid");
      }, 2000);
    } catch (error) {
      toast.error("Failed to join circle. Please try again.");
      setStep("form");
    }
  };

  const handleSubmitBid = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Joining circle with initial bid: ${initialBid}%`);
    // In a real app, this would submit to an API
  };

  // Intro screen
  if (step === "intro") {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl p-6 text-white shadow-lg text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
            <Anchor className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold mb-2">Not Currently Sailing</h2>
          <p className="text-slate-300 mb-4">
            Join a savings circle to start your voyage toward financial goals
          </p>
          <Button
            onClick={() => setStep("form")}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Set Sail <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-medium">How It Works</h3>

          <Card className="p-4">
            <div className="flex items-start">
              <div className="h-7 w-7 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 mr-3 shrink-0">
                1
              </div>
              <div>
                <h4 className="font-medium mb-1">Join a Crew</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  We&apos;ll match you with other sailors with similar savings goals
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-start">
              <div className="h-7 w-7 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 mr-3 shrink-0">
                2
              </div>
              <div>
                <h4 className="font-medium mb-1">Bid in Rounds</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Every month, the lowest bidder wins the pot minus their bid percentage
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-start">
              <div className="h-7 w-7 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 mr-3 shrink-0">
                3
              </div>
              <div>
                <h4 className="font-medium mb-1">Keep Contributing</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Continue making monthly payments until everyone in the circle has won
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Onboarding form
  if (step === "form") {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-4">Set Your Sailing Parameters</h2>

        <form onSubmit={handleSubmitForm}>
          <Card className="p-4 mb-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="budget">Monthly Contribution</Label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-4 w-4 text-slate-400" />
                  </div>
                  <Input
                    id="budget"
                    name="budget"
                    type="number"
                    required
                    className="pl-9"
                    placeholder="200"
                    value={formData.budget}
                    onChange={handleFormChange}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <Select
                      value={formData.currency}
                      onValueChange={handleCurrencyChange}
                    >
                      <SelectTrigger className="w-20 border-0">
                        <SelectValue placeholder="USDC" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USDC">USDC</SelectItem>
                        <SelectItem value="USDT">USDT</SelectItem>
                        <SelectItem value="DAI">DAI</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="loanTarget">Desired Loan Target</Label>
                <Select
                  value={formData.loanTarget}
                  onValueChange={handleLoanTargetChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select amount" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1200">$1,200 (6 months)</SelectItem>
                    <SelectItem value="2400">$2,400 (12 months)</SelectItem>
                    <SelectItem value="4800">$4,800 (24 months)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-slate-500 mt-1">
                  This is approximately the amount you&apos;ll receive when you win
                </p>
              </div>
              
              <div>
                <Label htmlFor="projectDescription">About Your Project</Label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleFormChange}
                  placeholder="Tell us about the project you&apos;re founding... (optional)"
                  className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <p className="text-xs text-slate-500 mt-1">
                  This helps the captain find match crewmates you can sail and synergize with!
                </p>
              </div>


              <div>
                <Label>Urgency</Label>
                <RadioGroup
                  defaultValue={formData.urgency}
                  onValueChange={handleUrgencyChange}
                  className="grid grid-cols-3 gap-2 mt-2"
                >
                  <div>
                    <RadioGroupItem
                      value="now"
                      id="urgency-now"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="urgency-now"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-950/50 dark:hover:border-blue-800 peer-data-[state=checked]:bg-blue-50 dark:peer-data-[state=checked]:bg-blue-950/50 peer-data-[state=checked]:border-blue-500 dark:peer-data-[state=checked]:border-blue-500"
                    >
                      <Clock className="h-4 w-4 mb-1" />
                      <span className="text-xs">Now</span>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem
                      value="sooner-than-later"
                      id="urgency-soon"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="urgency-soon"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-950/50 dark:hover:border-blue-800 peer-data-[state=checked]:bg-blue-50 dark:peer-data-[state=checked]:bg-blue-950/50 peer-data-[state=checked]:border-blue-500 dark:peer-data-[state=checked]:border-blue-500"
                    >
                      <Clock className="h-4 w-4 mb-1" />
                      <span className="text-xs">Soon</span>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem
                      value="dont-care"
                      id="urgency-later"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="urgency-later"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-950/50 dark:hover:border-blue-800 peer-data-[state=checked]:bg-blue-50 dark:peer-data-[state=checked]:bg-blue-950/50 peer-data-[state=checked]:border-blue-500 dark:peer-data-[state=checked]:border-blue-500"
                    >
                      <Clock className="h-4 w-4 mb-1" />
                      <span className="text-xs">Anytime</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </Card>

          <div className="space-y-2">
            <Button type="submit" className="w-full">
              Commit & Pay First Round
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setStep("intro")}
            >
              Go Back
            </Button>
          </div>
        </form>
      </div>
    );
  }

  // Matching screen
  if (step === "matching") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-bold mb-2">Finding Your Crew</h2>
        <p className="text-slate-500 dark:text-slate-400 text-center max-w-xs">
          We&apos;re matching you with sailors who share similar saving goals and timeframes...
        </p>
      </div>
    );
  }

  // Initial bid screen
  if (step === "bid") {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <h2 className="text-xl font-bold mb-2">Crew Found!</h2>
          <p className="text-white/80 mb-4">
            You&apos;ve been matched with a crew of 5 sailors
          </p>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="flex justify-between mb-2">
              <span>Monthly Contribution</span>
              <span className="font-medium">${formData.budget}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Circle Duration</span>
              <span className="font-medium">5 months</span>
            </div>
            <div className="flex justify-between">
              <span>Total Circle Value</span>
              <span className="font-medium">${parseInt(formData.budget) * 5 * 5}</span>
            </div>
          </div>
        </div>

        <Card className="p-4">
          <h3 className="text-lg font-bold mb-4">Set Your Initial Bid</h3>
          <form onSubmit={handleSubmitBid}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="initialBid">Bid Percentage</Label>
                <div className="relative mt-1">
                  <Input
                    id="initialBid"
                    type="number"
                    step="0.1"
                    min="0"
                    max="20"
                    value={initialBid}
                    onChange={(e) => setInitialBid(e.target.value)}
                    className="pr-8"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center">
                    <span className="text-slate-500">%</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Higher bids have a better chance of winning, but it also means you will be paying more interest!
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <h4 className="font-medium text-sm mb-2">If you win with this bid:</h4>
                <div className="flex justify-between text-sm">
                  <span>You&apos;ll receive</span>
                  <span className="font-medium">
                    ${(parseInt(formData.budget) * 5 * (1 - parseFloat(initialBid) / 100)).toFixed(2)}
                  </span>
                </div>
              </div>

              <Button type="submit" className="w-full">
                Set Bid & Join Circle
              </Button>
            </div>
          </form>
        </Card>
      </div>
    );
  }

  return null;
}