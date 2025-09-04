'use client';

import { useState } from 'react';
import { Clock, Users, DollarSign, Trophy, Target } from 'lucide-react';
import { UserAvatar } from './UserAvatar';
import { JoinBetModal } from './JoinBetModal';

interface BetCardProps {
  bet: {
    betId: string;
    description: string;
    sport: string;
    eventDetails: string;
    betType: 'moneyline' | 'spread' | 'over_under';
    wagerAmount: string;
    currency: string;
    outcome: 'pending' | 'won_creator' | 'won_participant' | 'push' | 'voided' | 'settled';
    status: 'open' | 'active' | 'closed';
    creationTimestamp: string;
    resolutionTimestamp: string | null;
    creator: {
      username: string;
      profilePicUrl: string;
      farcasterId: string;
    };
    participants: number;
    totalPool: string;
  };
  currentUser: {
    farcasterId: string;
    username: string;
  };
}

export function BetCard({ bet, currentUser }: BetCardProps) {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  
  const isCreator = bet.creator.farcasterId === currentUser.farcasterId;
  const canJoin = bet.status === 'open' && !isCreator;
  
  const getStatusColor = () => {
    switch (bet.status) {
      case 'open': return 'text-blue-600 bg-blue-100';
      case 'active': return 'text-orange-600 bg-orange-100';
      case 'closed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };
  
  const getOutcomeColor = () => {
    switch (bet.outcome) {
      case 'won_creator': return 'text-green-600 bg-green-100';
      case 'won_participant': return 'text-green-600 bg-green-100';
      case 'push': return 'text-yellow-600 bg-yellow-100';
      case 'voided': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };
  
  const getBetTypeIcon = () => {
    switch (bet.betType) {
      case 'moneyline': return <Trophy className="w-4 h-4" />;
      case 'spread': return <Target className="w-4 h-4" />;
      case 'over_under': return <DollarSign className="w-4 h-4" />;
      default: return <DollarSign className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <>
      <div className="card hover:shadow-deep transition-shadow duration-200 animate-fade-in">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <UserAvatar 
              src={bet.creator.profilePicUrl}
              username={bet.creator.username}
              variant="medium"
            />
            <div>
              <p className="font-semibold text-text-primary">{bet.creator.username}</p>
              <p className="caption text-text-secondary">{formatDate(bet.creationTimestamp)}</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
              {bet.status.charAt(0).toUpperCase() + bet.status.slice(1)}
            </span>
            {bet.outcome !== 'pending' && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOutcomeColor()}`}>
                {bet.outcome === 'won_creator' ? 'Creator Won' : 
                 bet.outcome === 'won_participant' ? 'Participant Won' : 
                 bet.outcome.charAt(0).toUpperCase() + bet.outcome.slice(1)}
              </span>
            )}
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-text-primary mb-2">{bet.description}</h3>
          <div className="flex items-center gap-4 text-sm text-text-secondary">
            <span className="flex items-center gap-1">
              {getBetTypeIcon()}
              {bet.sport}
            </span>
            <span>{bet.eventDetails}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-text-secondary mb-1">
              <DollarSign className="w-4 h-4" />
              <span className="caption">Wager</span>
            </div>
            <p className="font-semibold text-text-primary">{bet.wagerAmount} {bet.currency}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-text-secondary mb-1">
              <Users className="w-4 h-4" />
              <span className="caption">Players</span>
            </div>
            <p className="font-semibold text-text-primary">{bet.participants}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-text-secondary mb-1">
              <Trophy className="w-4 h-4" />
              <span className="caption">Pool</span>
            </div>
            <p className="font-semibold text-text-primary">{bet.totalPool} {bet.currency}</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          {canJoin && (
            <button 
              onClick={() => setIsJoinModalOpen(true)}
              className="btn-primary flex-1"
            >
              Join Bet
            </button>
          )}
          {isCreator && bet.status === 'open' && (
            <button className="btn-outline flex-1">
              Share Bet
            </button>
          )}
          {bet.status === 'closed' && (
            <button className="btn-secondary flex-1" disabled>
              <Clock className="w-4 h-4 mr-2" />
              Settled
            </button>
          )}
        </div>
      </div>
      
      {isJoinModalOpen && (
        <JoinBetModal
          bet={bet}
          isOpen={isJoinModalOpen}
          onClose={() => setIsJoinModalOpen(false)}
          onJoinBet={(wagerAmount) => {
            console.log('Joining bet:', bet.betId, 'with wager:', wagerAmount);
            setIsJoinModalOpen(false);
          }}
        />
      )}
    </>
  );
}
