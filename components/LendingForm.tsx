import { useState } from 'react';
import { useWorldAuth } from '@/hooks/useWorldAuth';
import { useWorldTransaction } from '@/hooks/useWorldTransaction';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export function LendingForm() {
  const { isInstalled } = useWorldAuth();
  const { sendTransaction, isLoading, isConfirming, isConfirmed, isError, error } = useWorldTransaction();
  const { toast } = useToast();
  
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isInstalled) {
      toast({
        title: 'World App Required',
        description: 'Please install World App to use this feature.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await sendTransaction({
        amount,
        recipient,
        deadline: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
      });

      toast({
        title: 'Transaction Submitted',
        description: 'Your lending transaction has been submitted.',
      });
    } catch (err) {
      toast({
        title: 'Transaction Failed',
        description: error?.message || 'Failed to submit lending transaction.',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="amount">Amount (WLD)</Label>
        <Input
          id="amount"
          type="text"
          placeholder="0.0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={isLoading || isConfirming}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="recipient">Recipient Address</Label>
        <Input
          id="recipient"
          type="text"
          placeholder="0x..."
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          disabled={isLoading || isConfirming}
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={!amount || !recipient || isLoading || isConfirming}
      >
        {isLoading || isConfirming ? 'Processing...' : 'Lend'}
      </Button>

      {isConfirmed && (
        <p className="text-sm text-green-600">
          Transaction confirmed! Your funds have been lent successfully.
        </p>
      )}

      {isError && (
        <p className="text-sm text-red-600">
          {error?.message || 'Failed to process transaction. Please try again.'}
        </p>
      )}
    </form>
  );
} 