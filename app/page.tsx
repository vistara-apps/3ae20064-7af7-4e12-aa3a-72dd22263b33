'use client';

import { useState } from 'react';
import { Header } from './components/Header';
import { BetCard } from './components/BetCard';
import { CreateBetModal } from './components/CreateBetModal';
import { WalletBalance } from './components/WalletBalance';
import { UserProfile } from './components/UserProfile';
import { Tabs } from './components/Tabs';
import { Plus, TrendingUp, Users } from 'lucide-react';

// Mock data for demonstration
const mockBets = [
  {
    betId: '1',
    description: 'Lakers vs Warriors - Lakers to Win',
    sport: 'Basketball',
    eventDetails: 'NBA Regular Season',
    betType: 'moneyline' as const,
    wagerAmount: '100',
    currency: 'USDC',
    outcome: 'pending' as const,
    status: 'open' as const,
    creationTimestamp: new Date().toISOString(),
    resolutionTimestamp: null,
    smartContractAddress: '0x...',
    smartContractTxHash: '0x...',
    creator: {
      username: 'cryptostan',
      profilePicUrl: 'https://via.placeholder.com/40',
      farcasterId: 'user1'
    },
    participants: 2,
    totalPool: '300'
  },
  {
    betId: '2',
    description: 'Chiefs vs Bills - Over 47.5 Total Points',
    sport: 'Football',
    eventDetails: 'NFL Week 14',
    betType: 'over_under' as const,
    wagerAmount: '50',
    currency: 'USDC',
    outcome: 'won_creator' as const,
    status: 'closed' as const,
    creationTimestamp: new Date(Date.now() - 86400000).toISOString(),
    resolutionTimestamp: new Date().toISOString(),
    smartContractAddress: '0x...',
    smartContractTxHash: '0x...',
    creator: {
      username: 'sportsking',
      profilePicUrl: 'https://via.placeholder.com/40',
      farcasterId: 'user2'
    },
    participants: 4,
    totalPool: '200'
  }
];

const mockUser = {
  username: 'you',
  farcasterId: 'current-user',
  walletAddress: '0x1234...5678',
  profilePicUrl: 'https://via.placeholder.com/40',
  balance: '1,250.50'
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('active');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const activeBets = mockBets.filter(bet => bet.status === 'open' || bet.status === 'active');
  const myBets = mockBets.filter(bet => bet.creator.farcasterId === mockUser.farcasterId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <Header />
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Left Column - Betting Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="caption text-text-secondary">Total Volume</p>
                    <h3 className="text-2xl font-bold text-primary">$5,309.89</h3>
                  </div>
                  <TrendingUp className="w-8 h-8 text-accent" />
                </div>
              </div>
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="caption text-text-secondary">Active Bets</p>
                    <h3 className="text-2xl font-bold text-primary">23</h3>
                  </div>
                  <Users className="w-8 h-8 text-accent" />
                </div>
              </div>
            </div>
            
            {/* Tabs and Create Bet Button */}
            <div className="flex items-center justify-between">
              <Tabs 
                activeTab={activeTab} 
                onTabChange={setActiveTab}
                tabs={[
                  { id: 'active', label: 'Active Bets' },
                  { id: 'my-bets', label: 'My Bets' },
                  { id: 'resolved', label: 'Resolved' }
                ]}
              />
              <button 
                onClick={() => setIsCreateModalOpen(true)}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Bet
              </button>
            </div>
            
            {/* Betting Feed */}
            <div className="space-y-4">
              {activeTab === 'active' && activeBets.map(bet => (
                <BetCard key={bet.betId} bet={bet} currentUser={mockUser} />
              ))}
              {activeTab === 'my-bets' && myBets.map(bet => (
                <BetCard key={bet.betId} bet={bet} currentUser={mockUser} />
              ))}
              {activeTab === 'resolved' && mockBets.filter(bet => bet.status === 'closed').map(bet => (
                <BetCard key={bet.betId} bet={bet} currentUser={mockUser} />
              ))}
            </div>
          </div>
          
          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* User Profile */}
            <UserProfile user={mockUser} />
            
            {/* Wallet Balance */}
            <WalletBalance balance={mockUser.balance} />
            
            {/* Recent Activity */}
            <div className="card">
              <h3 className="font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Won Lakers bet</p>
                    <p className="caption text-text-secondary">+$150 USDC</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Plus className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Created new bet</p>
                    <p className="caption text-text-secondary">Cowboys vs Eagles</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Joined bet</p>
                    <p className="caption text-text-secondary">$50 USDC wagered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Create Bet Modal */}
        {isCreateModalOpen && (
          <CreateBetModal 
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onCreateBet={(betData) => {
              console.log('Creating bet:', betData);
              setIsCreateModalOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
