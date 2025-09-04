import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BetBridge - Connect, Wager, and Win with Friends On-Chain',
  description: 'A peer-to-peer sports betting app for Farcaster users to create, join, and settle bets socially on the Base network.',
  keywords: 'sports betting, Base, Farcaster, blockchain, P2P, wagering',
  openGraph: {
    title: 'BetBridge',
    description: 'Connect, Wager, and Win with Friends On-Chain',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
