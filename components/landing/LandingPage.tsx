import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface Stats {
  totalSails: number;
  totalFunds: number;
  activeSails: number;
  successfulVoyages: number;
}

interface LandingPageProps {
  onConnect: () => void;
  stats: Stats;
}

export function LandingPage({ onConnect, stats }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950">
      <div className="container mx-auto px-4 py-8 md:py-16 relative overflow-hidden">
        {/* Background waves animation */}
        <div className="absolute inset-0 wave-bg" />

        {/* Hero Section */}
        <div className="relative z-10 text-center mb-8 md:mb-16">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-blue-100 mb-4 md:mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Set Sail for Success
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl text-blue-300 max-w-2xl mx-auto mb-6 md:mb-8 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join AI-captained funding circles, bid for the treasure chest, and sail through rounds of funding with your fellow founders.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Button 
              size="lg" 
              className="bg-blue-500 hover:bg-blue-600 text-base sm:text-lg px-6 py-5 sm:px-8 sm:py-6"
              onClick={onConnect}
            >
              🏴‍☠️ Connect Wallet to Join the Crew
            </Button>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto px-2"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="bg-white/10 backdrop-blur-lg border-blue-500/20">
            <CardContent className="p-4 md:p-6 text-center">
              <h3 className="text-blue-300 text-xs sm:text-sm font-medium mb-1 md:mb-2">Total Sails</h3>
              <p className="text-2xl md:text-3xl font-bold text-blue-100">{stats.totalSails}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-lg border-blue-500/20">
            <CardContent className="p-4 md:p-6 text-center">
              <h3 className="text-blue-300 text-xs sm:text-sm font-medium mb-1 md:mb-2">Total Funds</h3>
              <p className="text-2xl md:text-3xl font-bold text-blue-100">{stats.totalFunds} ETH</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-lg border-blue-500/20">
            <CardContent className="p-4 md:p-6 text-center">
              <h3 className="text-blue-300 text-xs sm:text-sm font-medium mb-1 md:mb-2">Active Sails</h3>
              <p className="text-2xl md:text-3xl font-bold text-blue-100">{stats.activeSails}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-lg border-blue-500/20">
            <CardContent className="p-4 md:p-6 text-center">
              <h3 className="text-blue-300 text-xs sm:text-sm font-medium mb-1 md:mb-2">Successful Voyages</h3>
              <p className="text-2xl md:text-3xl font-bold text-blue-100">{stats.successfulVoyages}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Section */}
        <motion.div 
          className="mt-12 md:mt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto px-2"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="bg-white/5 backdrop-blur-lg border-blue-500/10">
            <CardContent className="p-4 md:p-6">
              <div className="text-2xl md:text-3xl mb-3 md:mb-4">🤖</div>
              <h3 className="text-lg md:text-xl font-semibold text-blue-100 mb-2">AI Captains</h3>
              <p className="text-sm md:text-base text-blue-300">Smart contracts powered by AI strategies manage risk and match members by industry.</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 backdrop-blur-lg border-blue-500/10">
            <CardContent className="p-4 md:p-6">
              <div className="text-2xl md:text-3xl mb-3 md:mb-4">⚓</div>
              <h3 className="text-lg md:text-xl font-semibold text-blue-100 mb-2">Non-dilutive Funding</h3>
              <p className="text-sm md:text-base text-blue-300">Get the capital you need without giving up equity. Bid for funding rounds on your terms.</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 backdrop-blur-lg border-blue-500/10 sm:col-span-2 md:col-span-1">
            <CardContent className="p-4 md:p-6">
              <div className="text-2xl md:text-3xl mb-3 md:mb-4">🌊</div>
              <h3 className="text-lg md:text-xl font-semibold text-blue-100 mb-2">Community Trust</h3>
              <p className="text-sm md:text-base text-blue-300">Build reputation on-chain and connect with other founders in your industry.</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 