'use client';

import { useState } from 'react';
import { X, DollarSign } from 'lucide-react';

interface CreateBetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateBet: (betData: {
    description: string;
    sport: string;
    eventDetails: string;
    betType: string;
    wagerAmount: string;
  }) => void;
}

export function CreateBetModal({ isOpen, onClose, onCreateBet }: CreateBetModalProps) {
  const [formData, setFormData] = useState({
    description: '',
    sport: '',
    eventDetails: '',
    betType: 'moneyline',
    wagerAmount: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateBet(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-surface rounded-xl p-6 w-full max-w-md animate-slide-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-text-primary">Create New Bet</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Bet Description
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="input-default"
              placeholder="e.g., Lakers vs Warriors - Lakers to Win"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Sport
              </label>
              <select
                value={formData.sport}
                onChange={(e) => setFormData(prev => ({ ...prev, sport: e.target.value }))}
                className="input-default"
                required
              >
                <option value="">Select Sport</option>
                <option value="Basketball">Basketball</option>
                <option value="Football">Football</option>
                <option value="Baseball">Baseball</option>
                <option value="Soccer">Soccer</option>
                <option value="Hockey">Hockey</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Bet Type
              </label>
              <select
                value={formData.betType}
                onChange={(e) => setFormData(prev => ({ ...prev, betType: e.target.value }))}
                className="input-default"
                required
              >
                <option value="moneyline">Moneyline</option>
                <option value="spread">Spread</option>
                <option value="over_under">Over/Under</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Event Details
            </label>
            <input
              type="text"
              value={formData.eventDetails}
              onChange={(e) => setFormData(prev => ({ ...prev, eventDetails: e.target.value }))}
              className="input-default"
              placeholder="e.g., NBA Regular Season"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Wager Amount (USDC)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input
                type="number"
                value={formData.wagerAmount}
                onChange={(e) => setFormData(prev => ({ ...prev, wagerAmount: e.target.value }))}
                className="input-default pl-10"
                placeholder="100"
                min="1"
                required
              />
            </div>
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
              Create Bet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
