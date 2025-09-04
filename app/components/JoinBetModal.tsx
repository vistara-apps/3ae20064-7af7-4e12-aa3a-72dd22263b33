'use client';

import { useState } from 'react';
import { X, DollarSign, Trophy } from 'lucide-react';

interface JoinBetModalProps {
  bet: {
    betId: string;
    description: string;
    wagerAmount: string;
    currency: string;
    totalPool: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onJoinBet: (wagerAmount: string) => void;
}

export function JoinBetModal({ bet, isOpen, onClose, onJoinBet }: JoinBetModalProps) {
  const [wagerAmount, setWagerAmount] = useState(bet.wagerAmount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onJoinBet(wagerAmount);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-surface rounded-xl p-6 w-full max-w-md animate-slide-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-text-primary">Join Bet</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-text-primary mb-2">{bet.description}</h3>
          <div className="flex justify-between items-center text-sm">
            <span className="text-text-secondary">Current Pool:</span>
            <span className="font-semibold flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              {bet.totalPool} {bet.currency}
            </span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Your Wager Amount ({bet.currency})
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input
                type="number"
                value={wagerAmount}
                onChange={(e) => setWagerAmount(e.target.value)}
                className="input-default pl-10"
                placeholder="100"
                min="1"
                required
              />
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-sm text-blue-700">
              <strong>Note:</strong> Your funds will be held in escrow on the Base network until the bet is resolved.
            </p>
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-outline flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex-1"
            >
              Join Bet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
