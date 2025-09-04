'use client';

import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { Name, Identity } from '@coinbase/onchainkit/identity';
import Link from 'next/link';

export function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">BB</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">BetBridge</h1>
            <p className="text-sm text-gray-200 -mt-1">Peer-to-peer sports betting on Base</p>
          </div>
        </Link>
      </div>
      
      <div className="flex items-center gap-4">
        <ConnectWallet className="bg-white text-primary hover:bg-gray-100 px-6 py-2 rounded-lg font-semibold transition-all" />
      </div>
    </header>
  );
}
