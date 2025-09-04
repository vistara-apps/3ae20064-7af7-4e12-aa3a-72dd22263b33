import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database schema types
export interface User {
  farcasterId: string;
  walletAddress: string;
  username: string;
  profilePicUrl: string;
  createdAt: string;
}

export interface Bet {
  betId: string;
  creatorFarcasterId: string;
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
  smartContractAddress: string;
  smartContractTxHash: string;
}

export interface BetParticipant {
  betId: string;
  participantFarcasterId: string;
  selectedOutcome: string;
  amountWagered: string;
  status: 'pending' | 'won' | 'lost';
}
