# SDK Documentation

## FuelStreams TypeScript SDK

### Installation

```bash
npm install @fuelstreams/sdk @fuels/ts-sdk
# or
yarn add @fuelstreams/sdk @fuels/ts-sdk
```

### Quick Start

```typescript
import { FuelStreams, Wallet, Provider } from '@fuelstreams/sdk';

// Initialize provider and wallet
const provider = new Provider('https://beta-5.fuel.network/graphql');
const wallet = Wallet.fromPrivateKey(process.env.PRIVATE_KEY, provider);

// Initialize FuelStreams
const fuelStreams = new FuelStreams({
  provider,
  wallet,
  networkUrl: 'https://beta-5.fuel.network/graphql'
});

// Create your first stream
const stream = await fuelStreams.createStream({
  recipient: '0x123...',
  amount: '100',
  duration: '30d',
  asset: 'USDC'
});

console.log('Stream created:', stream.id);
```

### Core Classes

#### FuelStreams
Main entry point for the SDK.

```typescript
class FuelStreams {
  constructor(config: FuelStreamsConfig);
  
  // Stream management
  createStream(params: CreateStreamParams): Promise<Stream>;
  getStream(id: string): Promise<Stream>;
  listStreams(filter?: StreamFilter): Promise<Stream[]>;
  cancelStream(id: string): Promise<void>;
  
  // RWA operations
  tokenizeAsset(params: TokenizeAssetParams): Promise<RWAToken>;
  investInAsset(params: InvestmentParams): Promise<Investment>;
  
  // Privacy features
  createPrivateStream(params: PrivateStreamParams): Promise<PrivateStream>;
  
  // AI integration
  processNaturalLanguage(input: string): Promise<AIResponse>;
}
```

#### Stream
Represents a payment stream.

```typescript
class Stream {
  id: string;
  sender: string;
  recipient: string;
  amount: BigNumber;
  rate: BigNumber;
  startTime: Date;
  endTime?: Date;
  asset: Asset;
  status: StreamStatus;
  
  // Methods
  withdraw(): Promise<TransactionResult>;
  pause(): Promise<void>;
  resume(): Promise<void>;
  getWithdrawableAmount(): Promise<BigNumber>;
  getStreamedAmount(): Promise<BigNumber>;
  
  // Events
  onWithdrawal(callback: (event: WithdrawalEvent) => void): void;
  onCompletion(callback: (event: CompletionEvent) => void): void;
}
```

#### RWAToken
Represents a tokenized real-world asset.

```typescript
class RWAToken {
  id: string;
  name: string;
  symbol: string;
  totalValue: BigNumber;
  tokenSupply: BigNumber;
  annualYield: number;
  assetType: AssetType;
  verified: boolean;
  
  // Methods
  getYieldRate(): Promise<number>;
  getTokenPrice(): Promise<BigNumber>;
  invest(amount: BigNumber): Promise<Investment>;
  withdraw(tokens: BigNumber): Promise<void>;
  
  // Yield streaming
  enableYieldStreaming(): Promise<void>;
  getYieldStream(): Promise<Stream>;
}
```

### Payment Streams

#### Creating Streams

```typescript
// Basic stream
const basicStream = await fuelStreams.createStream({
  recipient: '0x742d35Cc6634C0532925a3b8D0b14b62e4734a64',
  amount: '1000', // $1000
  duration: '30d', // 30 days
  asset: 'USDC'
});

// Hourly payroll stream
const payrollStream = await fuelStreams.createStream({
  recipient: '0x742d35Cc6634C0532925a3b8D0b14b62e4734a64',
  amount: '2000', // $2000/month
  duration: '1y', // 1 year
  frequency: 'hourly',
  asset: 'USDC',
  metadata: {
    type: 'payroll',
    employeeId: 'EMP001',
    department: 'Engineering'
  }
});

// Subscription stream
const subscriptionStream = await fuelStreams.createStream({
  recipient: '0x742d35Cc6634C0532925a3b8D0b14b62e4734a64',
  amount: '15', // $15/month
  duration: 'indefinite',
  frequency: 'monthly',
  asset: 'USDC',
  cancellable: true,
  metadata: {
    type: 'subscription',
    service: 'Premium Content'
  }
});
```

#### Stream Management

```typescript
// Get stream details
const stream = await fuelStreams.getStream(streamId);
console.log('Stream status:', stream.status);
console.log('Withdrawable amount:', await stream.getWithdrawableAmount());

// Withdraw from stream
const withdrawResult = await stream.withdraw();
console.log('Withdrawn:', withdrawResult.amount);

// Cancel stream
await stream.cancel();

// List user streams
const myStreams = await fuelStreams.listStreams({
  sender: wallet.address,
  status: 'active'
});

const receivedStreams = await fuelStreams.listStreams({
  recipient: wallet.address,
  status: 'active'
});
```

#### Batch Operations

```typescript
// Create multiple streams
const batchStreams = await fuelStreams.createBatchStreams([
  {
    recipient: '0x123...',
    amount: '500',
    duration: '30d',
    asset: 'USDC'
  },
  {
    recipient: '0x456...',
    amount: '750',
    duration: '45d',
    asset: 'USDC'
  }
]);

// Batch withdraw
const streamIds = ['stream1', 'stream2', 'stream3'];
const withdrawResults = await fuelStreams.batchWithdraw(streamIds);
```

### RWA Tokenization

#### Asset Tokenization

```typescript
// Tokenize real estate
const realEstateToken = await fuelStreams.tokenizeAsset({
  name: 'Manhattan Office Building',
  symbol: 'NYC-OFF-001',
  totalValue: '15000000', // $15M
  tokenSupply: '15000', // 15,000 tokens @ $1000 each
  annualYield: 7.2, // 7.2% annual yield
  assetType: 'real-estate',
  location: 'New York, NY',
  documents: [
    'property-deed.pdf',
    'appraisal-report.pdf',
    'lease-agreements.pdf'
  ],
  custodian: '0xCustodianAddress...'
});

// Tokenize corporate bonds
const bondToken = await fuelStreams.tokenizeAsset({
  name: 'Apple Corporate Bond 2029',
  symbol: 'AAPL-BOND-29',
  totalValue: '100000000', // $100M
  tokenSupply: '100000', // 100,000 tokens @ $1000 each
  annualYield: 4.5, // 4.5% annual yield
  assetType: 'bond',
  maturityDate: '2029-12-31',
  rating: 'AAA',
  issuer: 'Apple Inc.'
});
```

#### Investment Operations

```typescript
// Invest in tokenized assets
const investment = await fuelStreams.investInAsset({
  assetId: realEstateToken.id,
  amount: '5000', // $5000 investment
  autoReinvest: true, // Automatically reinvest yields
  yieldStreaming: true // Enable streaming yields
});

// Get investment details
const investmentDetails = await investment.getDetails();
console.log('Tokens owned:', investmentDetails.tokensOwned);
console.log('Current value:', investmentDetails.currentValue);
console.log('Total yield earned:', investmentDetails.totalYieldEarned);

// Enable yield streaming
await investment.enableYieldStreaming();
const yieldStream = await investment.getYieldStream();
console.log('Earning yield:', yieldStream.rate, 'per second');
```

#### Portfolio Management

```typescript
// Create diversified portfolio
const portfolio = await fuelStreams.createPortfolio({
  name: 'Conservative Income',
  strategy: 'income-focused',
  riskTolerance: 'low',
  targetYield: 6.0,
  allocation: {
    'real-estate': 0.40,
    'government-bonds': 0.30,
    'corporate-bonds': 0.20,
    'commodities': 0.10
  }
});

// Add assets to portfolio
await portfolio.addAsset(realEstateToken.id, '2000');
await portfolio.addAsset(bondToken.id, '1500');

// Rebalance portfolio
await portfolio.rebalance();

// Get portfolio performance
const performance = await portfolio.getPerformance();
console.log('Total return:', performance.totalReturn);
console.log('Annual yield:', performance.annualYield);
```

### Privacy Features

#### Private Streams

```typescript
// Create private stream with zero-knowledge proofs
const privateStream = await fuelStreams.createPrivateStream({
  recipient: '0x742d35Cc6634C0532925a3b8D0b14b62e4734a64',
  amount: '1000',
  duration: '30d',
  useZKProofs: true,
  anonymousWallet: true
});

// Private portfolio
const privatePortfolio = await fuelStreams.createPrivatePortfolio({
  encryptionKey: userKey,
  anonymousWallet: true,
  zkProofs: true
});

// Invest privately
await privatePortfolio.investPrivately({
  assetId: 'RWA-BONDS-001',
  amount: '10000',
  useZKProofs: true
});
```

#### Wallet Privacy

```typescript
// Generate anonymous wallet
const anonymousWallet = await fuelStreams.generateAnonymousWallet({
  seedPhrase: false, // Generate random wallet
  mixWithOthers: true, // Use mixing protocol
  stealthAddresses: true // Enable stealth addresses
});

// Use stealth addresses
const stealthAddress = await anonymousWallet.generateStealthAddress();
const payment = await fuelStreams.sendPrivatePayment({
  to: stealthAddress,
  amount: '100',
  useZKProofs: true
});
```

### AI Integration

#### Natural Language Processing

```typescript
// Process natural language commands
const response = await fuelStreams.processNaturalLanguage(
  "Create a $100 monthly stream to my savings account for emergency fund"
);

console.log('AI Response:', response.interpretation);
console.log('Proposed action:', response.action);

// Execute AI-suggested action
if (response.confidence > 0.8) {
  const result = await response.execute();
  console.log('Action completed:', result);
}
```

#### AI-Powered Features

```typescript
// AI portfolio optimization
const optimizer = new AIPortfolioOptimizer({
  riskTolerance: 'moderate',
  investmentGoal: 'early-retirement',
  timeHorizon: '20-years',
  currentAge: 30
});

const optimizedPortfolio = await optimizer.optimize({
  currentPortfolio: portfolio,
  availableFunds: '50000',
  marketConditions: 'current'
});

// AI yield forecasting
const forecaster = new AIYieldForecaster();
const forecast = await forecaster.forecastYields({
  assets: [realEstateToken.id, bondToken.id],
  timeHorizon: '5-years',
  confidenceLevel: 0.95
});

console.log('Yield forecast:', forecast);
```

### Events & Monitoring

#### Event Listeners

```typescript
// Listen to stream events
stream.onWithdrawal((event) => {
  console.log('Withdrawal:', event.amount, 'at', event.timestamp);
});

stream.onCompletion((event) => {
  console.log('Stream completed:', event.streamId);
});

// Global event listener
fuelStreams.onAnyStreamEvent((event) => {
  console.log('Stream event:', event.type, event.data);
});

// RWA events
rwaToken.onYieldDistribution((event) => {
  console.log('Yield distributed:', event.amount, 'to', event.recipients.length, 'holders');
});
```

#### Real-time Updates

```typescript
// Real-time stream monitoring
const monitor = new StreamMonitor();

monitor.watchStream(streamId, {
  onUpdate: (stream) => {
    console.log('Stream updated:', stream.getWithdrawableAmount());
  },
  onError: (error) => {
    console.error('Stream error:', error);
  },
  interval: 1000 // Check every second
});

// Portfolio monitoring
const portfolioMonitor = new PortfolioMonitor();

portfolioMonitor.watchPortfolio(portfolioId, {
  onValueChange: (newValue, oldValue) => {
    const change = ((newValue - oldValue) / oldValue) * 100;
    console.log('Portfolio value changed by', change.toFixed(2), '%');
  },
  onYieldDistribution: (amount) => {
    console.log('Received yield:', amount);
  }
});
```

### Error Handling

```typescript
import { 
  FuelStreamsError, 
  InsufficientFundsError, 
  StreamNotFoundError,
  ValidationError 
} from '@fuelstreams/sdk';

try {
  const stream = await fuelStreams.createStream({
    recipient: '0x123...',
    amount: '1000',
    duration: '30d',
    asset: 'USDC'
  });
} catch (error) {
  if (error instanceof InsufficientFundsError) {
    console.log('Not enough funds to create stream');
  } else if (error instanceof ValidationError) {
    console.log('Invalid parameters:', error.details);
  } else if (error instanceof FuelStreamsError) {
    console.log('FuelStreams error:', error.message);
  } else {
    console.log('Unknown error:', error);
  }
}
```

### Configuration

#### Environment Setup

```typescript
// Development configuration
const devConfig = {
  networkUrl: 'https://beta-5.fuel.network/graphql',
  contractAddresses: {
    paymentStreams: '0x123...',
    rwaTokenization: '0x456...',
    privacyProtocol: '0x789...'
  },
  defaultGasPrice: '1',
  debug: true
};

// Production configuration
const prodConfig = {
  networkUrl: 'https://mainnet.fuel.network/graphql',
  contractAddresses: {
    paymentStreams: '0xabc...',
    rwaTokenization: '0xdef...',
    privacyProtocol: '0x012...'
  },
  defaultGasPrice: '1',
  debug: false
};

const fuelStreams = new FuelStreams(
  process.env.NODE_ENV === 'production' ? prodConfig : devConfig
);
```

#### Advanced Configuration

```typescript
const advancedConfig = {
  // Network settings
  networkUrl: 'https://beta-5.fuel.network/graphql',
  timeout: 30000,
  retries: 3,
  
  // Contract settings
  contractAddresses: {
    paymentStreams: '0x123...',
    rwaTokenization: '0x456...',
    privacyProtocol: '0x789...'
  },
  
  // Gas settings
  defaultGasPrice: '1',
  gasMultiplier: 1.2,
  
  // Privacy settings
  enableZKProofs: true,
  mixingServiceUrl: 'https://mixer.fuelstreams.io',
  
  // AI settings
  aiServiceUrl: 'https://ai.fuelstreams.io',
  aiApiKey: process.env.AI_API_KEY,
  
  // Monitoring
  enableEventLogging: true,
  logLevel: 'info',
  
  // Features
  features: {
    batchOperations: true,
    realTimeUpdates: true,
    aiIntegration: true,
    privacyMode: true
  }
};
```

Ready to start building? Check out our [examples](../getting-started/examples.md) for complete applications! 