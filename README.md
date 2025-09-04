# BetBridge - Peer-to-Peer Sports Betting on Base

Connect, Wager, and Win with Friends On-Chain. A social sports betting platform for Farcaster users built on the Base network.

## Features

- **P2P Bet Creation & Discovery**: Create and join sports bets with friends
- **On-Chain Escrow**: Secure fund management using Base smart contracts
- **Farcaster Integration**: Social betting within the Farcaster ecosystem
- **Real-time Updates**: Live bet status and settlement notifications

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Blockchain**: Base Network, OnchainKit, Wagmi, Viem
- **Backend**: Supabase, Next.js API Routes
- **Social**: Farcaster Frame SDK, Neynar API

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd betbridge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Copy `.env.local` and fill in your API keys:
   - OnchainKit API key from Coinbase Developer Platform
   - Supabase URL and anon key
   - Neynar API key for Farcaster integration

4. **Database Setup**
   Create the following tables in Supabase:

   ```sql
   -- Users table
   CREATE TABLE users (
     farcasterId TEXT PRIMARY KEY,
     walletAddress TEXT NOT NULL,
     username TEXT NOT NULL,
     profilePicUrl TEXT,
     createdAt TIMESTAMP DEFAULT NOW()
   );

   -- Bets table
   CREATE TABLE bets (
     betId TEXT PRIMARY KEY,
     creatorFarcasterId TEXT REFERENCES users(farcasterId),
     description TEXT NOT NULL,
     sport TEXT NOT NULL,
     eventDetails TEXT NOT NULL,
     betType TEXT NOT NULL CHECK (betType IN ('moneyline', 'spread', 'over_under')),
     wagerAmount TEXT NOT NULL,
     currency TEXT DEFAULT 'USDC',
     outcome TEXT DEFAULT 'pending' CHECK (outcome IN ('pending', 'won_creator', 'won_participant', 'push', 'voided', 'settled')),
     status TEXT DEFAULT 'open' CHECK (status IN ('open', 'active', 'closed')),
     creationTimestamp TIMESTAMP DEFAULT NOW(),
     resolutionTimestamp TIMESTAMP,
     smartContractAddress TEXT,
     smartContractTxHash TEXT
   );

   -- Bet participants table
   CREATE TABLE bet_participants (
     betId TEXT REFERENCES bets(betId),
     participantFarcasterId TEXT REFERENCES users(farcasterId),
     selectedOutcome TEXT NOT NULL,
     amountWagered TEXT NOT NULL,
     status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'won', 'lost')),
     PRIMARY KEY (betId, participantFarcasterId)
   );
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## Architecture

### Data Models

- **User**: Farcaster user with wallet connection
- **Bet**: Individual betting event with escrow
- **BetParticipant**: User participation in specific bets

### Key Components

- **BetCard**: Display bet information with join/share actions
- **CreateBetModal**: Form for creating new bets
- **JoinBetModal**: Interface for joining existing bets
- **WalletBalance**: Display and manage USDC balance
- **UserProfile**: User stats and profile information

### Smart Contract Integration

- Betting contract handles escrow and settlement
- USDC token contract for payments
- Base network for low fees and fast transactions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For questions or support, reach out to the team or create an issue in the repository.
