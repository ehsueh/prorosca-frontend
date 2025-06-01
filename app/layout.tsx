import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { TransactionProvider } from '@/components/providers/TransactionProvider';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { WagmiProvider } from '@/components/providers/WagmiProvider';
import { SafeMiniKitProvider } from '@/components/providers/SafeMiniKitProvider';
import Navigation from '@/components/navigation';
import Image from 'next/image';
import { validateEnv } from '@/lib/env';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

// Validate environment variables
validateEnv();

export const metadata: Metadata = {
  title: 'Prorosca - Set Sail with Savings',
  description: 'Join a savings circle with the Prorosca sailing community',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  manifest: '/manifest.json',
  themeColor: '#22c55e',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Prorosca',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!process.env.NEXT_PUBLIC_APP_ID) {
    throw new Error('NEXT_PUBLIC_APP_ID environment variable is not set');
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#22c55e" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Prorosca" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={`${inter.className} bg-background min-h-screen`} suppressHydrationWarning>
        <WagmiProvider>
          <SafeMiniKitProvider appId={process.env.NEXT_PUBLIC_APP_ID}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <AuthProvider>
                <TransactionProvider>
                  <div className="max-w-md mx-auto pb-16 min-h-screen flex flex-col">
                    <header className="p-4 flex justify-center">
                      <img
                        src="/prorosca_transparent.png"
                        alt="Prorosca"
                        className="h-8 w-auto"
                      />
                    </header>
                    <main className="flex-1">{children}</main>
                    <Navigation />
                  </div>
                  <Toaster />
                </TransactionProvider>
              </AuthProvider>
            </ThemeProvider>
          </SafeMiniKitProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}