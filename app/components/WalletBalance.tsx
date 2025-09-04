'use client';

import { Wallet, Plus, Send } from 'lucide-react';

interface WalletBalanceProps {
  balance: string;
}

export function WalletBalance({ balance }: WalletBalanceProps) {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Wallet className="w-5 h-5" />
          Wallet Balance
        </h3>
        <span className="text-sm text-text-secondary">USDC</span>
      </div>
      
      <div className="mb-4">
        <p className="text-3xl font-bold text-primary">${balance}</p>
        <p className="caption text-text-secondary">Your available balance on Base</p>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <button className="btn-primary text-sm py-2 flex items-center justify-center gap-1">
          <Plus className="w-4 h-4" />
          Add Funds
        </button>
        <button className="btn-outline text-sm py-2 flex items-center justify-center gap-1">
          <Send className="w-4 h-4" />
          Withdraw
        </button>
      </div>
    </div>
  );
}
