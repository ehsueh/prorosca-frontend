import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CreateSailProps {
  onCreateSail: (sailData: {
    name: string;
    monthlyPrincipal: number;
    crewmatesCount: number;
    durationInDays: number;
  }) => void;
}

export function CreateSail({ onCreateSail }: CreateSailProps) {
  const [name, setName] = useState('');
  const [monthlyPrincipal, setMonthlyPrincipal] = useState('');
  const [crewmatesCount, setCrewmatesCount] = useState('');
  const [durationInDays, setDurationInDays] = useState('30');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateSail({
      name,
      monthlyPrincipal: Number(monthlyPrincipal),
      crewmatesCount: Number(crewmatesCount),
      durationInDays: Number(durationInDays),
    });
    
    // Reset form
    setName('');
    setMonthlyPrincipal('');
    setCrewmatesCount('');
    setDurationInDays('30');
  };

  return (
    <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-2 border-blue-500/20">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-blue-200">Sail Name</Label>
            <Input
              id="name"
              placeholder="Enter a name for your sail"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-blue-950/50 border-blue-500/30 text-blue-100 placeholder:text-blue-400/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlyPrincipal" className="text-blue-200">Monthly Principal (ETH)</Label>
            <Input
              id="monthlyPrincipal"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.1"
              value={monthlyPrincipal}
              onChange={(e) => setMonthlyPrincipal(e.target.value)}
              required
              className="bg-blue-950/50 border-blue-500/30 text-blue-100 placeholder:text-blue-400/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="crewmatesCount" className="text-blue-200">Crew Size</Label>
            <Input
              id="crewmatesCount"
              type="number"
              min="2"
              max="12"
              placeholder="6"
              value={crewmatesCount}
              onChange={(e) => setCrewmatesCount(e.target.value)}
              required
              className="bg-blue-950/50 border-blue-500/30 text-blue-100 placeholder:text-blue-400/50"
            />
            <p className="text-xs text-blue-300">Min: 2, Max: 12 crewmates</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="durationInDays" className="text-blue-200">Round Duration (days)</Label>
            <Input
              id="durationInDays"
              type="number"
              min="1"
              max="90"
              value={durationInDays}
              onChange={(e) => setDurationInDays(e.target.value)}
              required
              className="bg-blue-950/50 border-blue-500/30 text-blue-100 placeholder:text-blue-400/50"
            />
            <p className="text-xs text-blue-300">Max: 90 days per round</p>
          </div>

          <Button 
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 mt-6"
            disabled={!name || !monthlyPrincipal || !crewmatesCount || !durationInDays}
          >
            🚢 Launch New Sail
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}