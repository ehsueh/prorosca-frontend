'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto max-w-md text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Something went wrong!</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          An error occurred while processing your request.
        </p>
        <Button
          onClick={reset}
          className="mt-4"
        >
          Try again
        </Button>
      </div>
    </div>
  );
} 