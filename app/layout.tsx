import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Navigation from '@/components/navigation';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Prorosca - Set Sail with Savings',
  description: 'Join a savings circle with the Prorosca sailing community',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
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
        </ThemeProvider>
      </body>
    </html>
  );
}