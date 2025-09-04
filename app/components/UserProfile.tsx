'use client';

import { UserAvatar } from './UserAvatar';
import { Settings } from 'lucide-react';

interface UserProfileProps {
  user: {
    username: string;
    farcasterId: string;
    walletAddress: string;
    profilePicUrl: string;
  };
}

export function UserProfile({ user }: UserProfileProps) {
  const shortAddress = `${user.walletAddress.slice(0, 6)}...${user.walletAddress.slice(-4)}`;
  
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <UserAvatar 
            src={user.profilePicUrl}
            username={user.username}
            variant="medium"
          />
          <div>
            <p className="font-semibold text-text-primary">@{user.username}</p>
            <p className="caption text-text-secondary">{shortAddress}</p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Settings className="w-4 h-4 text-text-secondary" />
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-lg font-bold text-primary">12</p>
          <p className="caption text-text-secondary">Bets Won</p>
        </div>
        <div>
          <p className="text-lg font-bold text-primary">8</p>
          <p className="caption text-text-secondary">Active</p>
        </div>
        <div>
          <p className="text-lg font-bold text-primary">73%</p>
          <p className="caption text-text-secondary">Win Rate</p>
        </div>
      </div>
    </div>
  );
}
