// Smart contract interaction utilities
import { createPublicClient, http, parseUnits } from 'viem';
import { base } from 'viem/chains';

export const publicClient = createPublicClient({
  chain: base,
  transport: http()
});

// Betting contract ABI (simplified)
export const BETTING_CONTRACT_ABI = [
  {
    inputs: [
      { name: 'betId', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'wagerAmount', type: 'uint256' }
    ],
    name: 'createBet',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      { name: 'betId', type: 'string' },
      { name: 'wagerAmount', type: 'uint256' }
    ],
    name: 'joinBet',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      { name: 'betId', type: 'string' },
      { name: 'winner', type: 'address' }
    ],
    name: 'resolveBet',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const;

// Contract addresses (placeholder - would be deployed contracts)
export const CONTRACTS = {
  BETTING_CONTRACT: '0x...' as `0x${string}`,
  USDC_CONTRACT: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as `0x${string}` // USDC on Base
};

// Utility functions for contract interactions
export function parseUSDC(amount: string): bigint {
  return parseUnits(amount, 6); // USDC has 6 decimals
}

export function formatUSDC(amount: bigint): string {
  return (Number(amount) / 1e6).toFixed(2);
}
