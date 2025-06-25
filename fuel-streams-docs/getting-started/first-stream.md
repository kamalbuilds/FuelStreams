# Your First Stream

## Create Your First Payment Stream in 2 Minutes

### Option 1: Using AI Chat
```
👤 "Create a $100 monthly stream to my savings account"

🤖 "I'll set up a $100 monthly savings stream:
- Amount: $100/month ($3.33/day)
- Recipient: Your savings wallet
- Duration: Continuous until cancelled
- Auto-compound: Optional

Deploying contract... ✅ Done!"
```

### Option 2: Using SDK
```typescript
import { FuelStreams } from '@fuelstreams/sdk';

const stream = await FuelStreams.createStream({
  recipient: "0x123...",
  amount: "100",
  duration: "30d",
  asset: "USDC"
});

console.log(`Stream created: ${stream.id}`);
```

### Option 3: Using Web Interface
1. Connect wallet
2. Click "Create Stream"
3. Enter recipient and amount
4. Confirm transaction
5. Done! ✅

Your stream is now active and flowing in real-time! 