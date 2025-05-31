import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { TransactionProvider } from '@/components/providers/TransactionProvider';
import Navigation from '@/components/navigation';
import Image from 'next/image';
import { MiniKitProvider } from '@worldcoin/minikit-js/minikit-provider';
import { validateEnv } from '@/lib/env';

const inter = Inter({ subsets: ['latin'] });

// Validate environment variables
validateEnv();

export const metadata: Metadata = {
  title: 'Prorosca - Set Sail with Savings',
  description: 'Join a savings circle with the Prorosca sailing community',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!process.env.NEXT_PUBLIC_WORLD_APP_ID) {
    throw new Error('NEXT_PUBLIC_WORLD_APP_ID environment variable is not set');
  }

  return (
    <html lang="en">
      <body className={`${inter.className} bg-background min-h-screen`}>
        <MiniKitProvider props={{
          appId: process.env.NEXT_PUBLIC_WORLD_APP_ID,
        }}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <TransactionProvider>
              <div className="max-w-md mx-auto pb-16 min-h-screen flex flex-col">
                <header className="p-4 flex justify-center">
                  <Image
                    src="/Prorosca_transparent.png"
                    alt="Prorosca"
                    width={150}
                    height={40}
                    priority
                    className="h-8 w-auto"
                  />
                </header>
                <main className="flex-1">{children}</main>
                <Navigation />
              </div>
            </TransactionProvider>
          </ThemeProvider>
        </MiniKitProvider>
      </body>
    </html>
  );
}