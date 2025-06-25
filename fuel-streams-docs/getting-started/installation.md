# Installation & Setup

## Quick Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- Fuel Wallet browser extension
- Git

### 1. Install Fuel Wallet
```bash
# Install from Chrome Web Store or Firefox Add-ons
# Or build from source:
git clone https://github.com/FuelLabs/fuels-wallet
cd fuels-wallet && npm install && npm run build
```

### 2. Get Test Funds
```bash
# Visit Fuel testnet faucet
open https://faucet-beta.fuel.network/
```

### 3. Install FuelStreams SDK
```bash
npm install @fuelstreams/sdk @fuels/ts-sdk
```

### 4. Quick Setup
```typescript
import { FuelStreams, Wallet } from '@fuelstreams/sdk';

const wallet = Wallet.fromPrivateKey(process.env.PRIVATE_KEY);
const fuelStreams = new FuelStreams({ wallet });

// You're ready to start streaming!
```

## Development Environment

### Local Development
```bash
git clone https://github.com/fuelstreams/platform
cd platform
npm install
npm run dev
```

### Docker Setup
```bash
docker-compose up -d
```

Ready to start building! 🚀 