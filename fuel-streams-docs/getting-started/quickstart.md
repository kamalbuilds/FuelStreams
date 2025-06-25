---
icon: bullseye-arrow
---

# Quick Start Guide 🚀

Get your first payment stream running in under 5 minutes with FuelStreams' revolutionary conversational AI interface.

## What You'll Build

By the end of this guide, you'll have:
- ✅ Set up a real-time salary stream
- ✅ Created an RWA investment portfolio
- ✅ Configured privacy-preserving payments
- ✅ Built a custom streaming contract using AI

## Prerequisites

1. **Fuel Wallet** - [Install here](https://fuellabs.github.io/fuels-wallet/)
2. **Test ETH** - Get some from the [Fuel testnet faucet](https://faucet-beta.fuel.network/)
3. **5 minutes** - That's all the time you need!

## Step 1: Connect to FuelStreams

### Web Interface
```bash
# Visit the FuelStreams app
open https://app.fuelstreams.network

# Or run locally
git clone https://github.com/fuelstreams/platform
cd platform/frontend
npm install && npm run dev
```

### AI Chat Interface
1. Click "Start Conversation" on the homepage
2. The AI will introduce itself and ask about your financial goals
3. You can also use voice commands: "Hey FuelStreams, I want to start streaming my salary"

## Step 2: Your First Conversation with AI

### Example 1: Salary Streaming Setup

```
👤 You: "I want to get paid every hour instead of waiting for my monthly paycheck"

🤖 AI: "Great idea! Hourly payments will solve your cash flow issues. Let me set this up:

**Current Setup**: Monthly salary → Long wait → Cash flow stress
**New Setup**: Hourly earnings → Immediate access → Smooth finances

I need a few details:
1. What's your monthly salary?
2. Do you work standard 40-hour weeks?
3. Should I set up automatic savings from each payment?

This will take 2 minutes to deploy on Fuel Network."

👤 You: "$6,000 monthly, yes 40 hours, save 20% automatically"

🤖 AI: "Perfect! Creating your streaming payroll contract:

**Hourly Rate**: $37.50/hour (based on $6,000/month)
**Streaming Rate**: $0.625/minute while working
**Auto-Savings**: 20% into high-yield stablecoin
**Emergency Access**: Withdraw any amount, anytime

Contract deploying... ✅ Done!
Your employer can now start streaming payments. You'll earn continuously while working!"
```

### Example 2: Real Estate Investment

```
👤 You: "I want to invest in real estate but only have $500"

🤖 AI: "No problem! With FuelStreams, you can access global real estate with any amount:

**Traditional Real Estate**: Need $25,000+ minimum
**FuelStreams Real Estate**: Start with $1, earn rent every second

I found some great options:
🏢 NYC Commercial (REIT-NYC-001): 7.2% annual yield
🏠 Tokyo Residential (TOKYO-RES-003): 6.8% yield  
🏬 London Retail (LON-RETAIL-007): 8.1% yield

Shall I create a diversified portfolio? I recommend:
- 40% NYC ($200) - Stable, dollar-denominated
- 35% Tokyo ($175) - Growth potential, yen-hedged
- 25% London ($125) - High yield, pound-hedged

You'll start earning rental income within seconds!"

👤 You: "Yes, do it!"

🤖 AI: "🎉 Portfolio created! You now own fractions of 3 properties across the globe. 

📊 Real-time updates:
- NYC: +$0.0012 every minute (rent streaming)
- Tokyo: +$0.0011 every minute  
- London: +$0.0015 every minute

Total: ~$40.32 annually, paid every second!
Track your earnings in the dashboard."
```

### Example 3: Privacy-First Investment

```
👤 You: "I want to invest anonymously - no one should know my portfolio"

🤖 AI: "Privacy is fundamental to financial freedom. I'll set up zero-knowledge investment streams:

**Privacy Features**:
✅ Anonymous wallet creation
✅ Encrypted transaction metadata  
✅ Zero-knowledge yield collection
✅ Private portfolio tracking

**Investment Options**:
- Anonymous bond streams (5-7% yield)
- Private commodity exposure
- Confidential RWA tokens
- Dark pool liquidity provision

How much would you like to invest privately? All transactions will be confidential while remaining fully compliant."

👤 You: "$2,000 in anonymous bonds"

🤖 AI: "Creating your private investment setup:

🔐 Generating anonymous wallet...
🛡️ Setting up ZK-proof system...
💼 Allocating to privacy-preserving bond streams...
🎭 Configuring anonymous yield collection...

✅ Complete! Your $2,000 is now earning 6.3% annually through anonymous bond streams. No one can see your portfolio, but you'll receive yields continuously.

Your private dashboard link: [encrypted URL]"
```

## Step 3: Advanced AI Features

### Smart Contract Generation

```
👤 You: "Create a contract where my team gets paid based on GitHub contributions"

🤖 AI: "I'll create a development team streaming contract with GitHub integration:

```sway
contract GitHubPayroll {
    struct Developer {
        github_username: str[32],
        base_hourly_rate: u64,
        contribution_multiplier: u64,
        total_earned: u64,
    }
    
    fn calculate_payment(dev_id: u64, contributions: GitHubData) -> u64 {
        let dev = storage.developers.get(dev_id);
        let contribution_score = analyze_contributions(contributions);
        
        // Base pay + performance bonus
        let payment = dev.base_hourly_rate * (1 + contribution_score / 100);
        payment
    }
    
    fn process_github_webhook(webhook_data: GitHubWebhook) {
        // Automatic payment on merged PRs
        let contributor = get_contributor(webhook_data.author);
        let payment = calculate_contribution_value(webhook_data);
        stream_payment(contributor.wallet, payment);
    }
}
```

**Features added**:
✅ GitHub webhook integration
✅ Contribution quality scoring
✅ Performance-based bonuses
✅ Automatic payment on PR merge
✅ Multi-repository support

Deploy this contract? It will track all your repositories automatically."
```

### Multi-Modal Interface

#### Voice Commands
```bash
# Enable voice mode
👤 "Hey FuelStreams"
🤖 "I'm listening! What would you like to do?"

👤 "Stream fifty dollars monthly to charity"
🤖 "I'll set up a $50 monthly charity stream. Which cause is important to you?"

👤 "Environmental protection"
🤖 "Perfect! I found 3 verified environmental charities:
    1. Rainforest Protection Alliance
    2. Ocean Cleanup Foundation  
    3. Carbon Removal Network
    
    Would you like to split equally or choose one?"
```

#### Visual Analysis
```bash
# Upload a chart or screenshot
👤 [Uploads real estate market chart]
"Should I adjust my real estate allocation?"

🤖 "Analyzing your chart... I see:
    📈 15% price appreciation in your target markets
    📊 Rental yields holding steady at 7-8%
    🌍 Geographic diversification opportunities in Asia
    
    Recommendation: Increase allocation by 25% and add exposure to 
    Singapore commercial real estate (9.2% yield).
    
    Shall I adjust your streaming investment accordingly?"
```

## Step 4: Connect Your Existing Accounts

### Payroll Integration
```typescript
// Employer integration
const payrollSystem = new FuelStreamsPayroll({
  company: "TechCorp Inc",
  employees: employeeList,
  payment_schedule: "continuous" // vs "weekly" or "monthly"
});

// Employee receives real-time payments
await payrollSystem.setupEmployeeStream({
  employee_id: "emp_001",
  hourly_rate: 75,
  auto_savings: 0.15, // 15% auto-save
  emergency_fund_target: 6000 // 6 months expenses
});
```

### Bank Account Linking
```
👤 You: "Connect my Bank of America checking account"

🤖 AI: "I'll set up secure bank integration:

**Security Features**:
🔐 Read-only access (no withdrawals)
📊 Real-time balance monitoring
🛡️ Bank-grade encryption
⚡ Instant notifications

**Smart Features**:
💡 Automatic bill payment optimization
📈 Cash flow forecasting
🎯 Savings goal tracking
💰 Investment opportunity alerts

Connecting securely via Plaid... ✅ Connected!

I notice you have $3,200 sitting idle. Would you like me to:
1. Stream into high-yield savings (4.2% APY)
2. Dollar-cost average into RWA portfolio
3. Set up automatic bill payment streams"
```

## Step 5: Monitor Your Streams

### Real-Time Dashboard

Your FuelStreams dashboard shows:

```
💰 Active Income Streams
├── Salary Stream: +$37.50/hour (currently working)
├── Real Estate: +$0.0038/minute (24/7)
├── Bond Yields: +$0.0025/minute (private)
└── Content Creator: +$2.30/article read

📊 Portfolio Performance (24h)
├── Total Earned: $127.34
├── Auto-Saved: $25.47 (20%)
├── Investment Growth: +2.3%
└── Stream Efficiency: 99.97% uptime

🎯 Financial Goals Progress
├── Emergency Fund: 67% complete ($4,020/$6,000)
├── House Down Payment: 23% complete ($11,500/$50,000)
└── Retirement: 156% ahead of target (compound streaming!)

⚡ AI Insights
• "Your rent payment is in 3 days. You have enough streamed earnings!"
• "Tokyo real estate is outperforming. Consider increasing allocation."
• "Tax-loss harvesting opportunity detected in your bond portfolio."
```

### Mobile Notifications

```
📱 "Salary stream started! Earning $37.50/hour"
📱 "Real estate dividend: +$12.34 while you slept"
📱 "Emergency fund goal reached! 🎉"
📱 "AI detected market opportunity: Carbon credit yield up 23%"
```

## Step 6: Scale Your Financial Strategy

### Business Integration
```
👤 You: "I'm starting a business. Set up complete financial automation"

🤖 AI: "I'll create a comprehensive business financial system:

**Revenue Streams**:
• Customer payments → Instant processing
• Subscription revenue → Predictable streaming
• Service fees → Real-time collection

**Expense Automation**:
• Employee payroll → Second-by-second streaming
• Supplier payments → Milestone-triggered
• Tax obligations → Automatic withholding

**Growth Investment**:
• Marketing budget → Performance-based streaming
• R&D funding → Innovation milestone rewards
• Equipment financing → Usage-based payments

This replaces traditional business banking with intelligent automation.
Ready to deploy your business financial OS?"
```

### Enterprise Features
```typescript
// Multi-signature business streams
const businessStreams = new EnterpriseStreams({
  multi_sig_threshold: 3, // Require 3 of 5 executives
  compliance_level: "institutional",
  audit_trails: true,
  regulatory_reporting: "automatic"
});

// Complex approval workflows
await businessStreams.createExpenseStream({
  supplier: "vendor_123",
  amount: 50000,
  approval_workflow: [
    "department_head",
    "finance_director", 
    "ceo_approval"
  ],
  payment_schedule: "milestone_based"
});
```

## What's Next?

You've now experienced the future of finance! Here's how to go deeper:

### 📚 Learning Path
1. **[Advanced Use Cases](../basics/use-cases.md)** - Explore industry-specific applications
2. **[AI Integration Guide](../basics/ai-integration.md)** - Build custom AI financial assistants
3. **[Technical Documentation](../technical/contract-architecture.md)** - Understand the underlying technology

### 🛠️ Development
1. **[Sway Development](../technical/sway-guide.md)** - Build custom streaming contracts
2. **[API Integration](../technical/api-reference.md)** - Integrate with your applications
3. **[SDK Documentation](../technical/sdk-docs.md)** - Use our development tools

### 🌍 Community
1. **[Discord](https://discord.gg/fuelstreams)** - Join the conversation
2. **[GitHub](https://github.com/fuelstreams)** - Contribute to the platform
3. **[Twitter](https://twitter.com/fuelstreams)** - Stay updated

## Troubleshooting

### Common Issues

**Q: "My stream isn't starting"**
```
🤖 AI: "Let me diagnose your stream:
✅ Wallet connected
✅ Sufficient balance  
❌ Contract not approved

I'll fix this: Approving contract... ✅ Done!
Your stream is now active and earning."
```

**Q: "Can I pause my investment streams?"**
```
🤖 AI: "Yes! I can pause, modify, or redirect any stream:
• Pause all streams temporarily
• Redirect to emergency savings
• Adjust investment allocation
• Set up conditional streaming (pause if market drops >10%)

What would you like to do?"
```

**Q: "Is my privacy really protected?"**
```
🤖 AI: "Your privacy is mathematically guaranteed:
🔐 Zero-knowledge proofs hide transaction details
🛡️ Encrypted metadata protects portfolio information
🎭 Anonymous wallets prevent identity linking
🔍 Open-source code - verify the privacy yourself

Even FuelStreams can't see your private streams!"
```

## Success Metrics

After completing this guide, you should see:

- ✅ **Cash Flow Improvement**: Smoother income distribution
- ✅ **Investment Growth**: Compound streaming effects
- ✅ **Time Savings**: AI handles financial complexity
- ✅ **Peace of Mind**: Automated financial management

## Ready for More?

You've just scratched the surface of FuelStreams' capabilities. The AI can help you build arbitrarily complex financial strategies through simple conversation.

Try asking:
- "Create a multi-generational wealth building strategy"
- "Set up anonymous charity donations based on my profits" 
- "Build a decentralized hedge fund with my friends"
- "Automate my entire business financial operations"

**The only limit is your imagination!** 🚀

---

*Welcome to the future of finance - where every second counts* ⚡🌊
