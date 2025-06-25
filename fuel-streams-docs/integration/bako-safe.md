# Bako Safe Integration

## Multi-Signature Stream Management

### Overview
Integrate FuelStreams with Bako Safe for enterprise-grade multi-signature payment streams, perfect for:
- Corporate payroll requiring multiple approvals
- Treasury management with board oversight
- Shared investment funds with partner consensus
- Emergency fund access controls

### Key Benefits
- **Zero-cost multi-sig deployment** on Fuel
- **Real-time approvals** with 1-second finality
- **Automated execution** once thresholds met
- **Audit trails** for compliance

### Setup Integration

#### 1. Install Dependencies
```typescript
npm install @fuelstreams/sdk @bako-safe/sdk @fuels/ts-sdk
```

#### 2. Initialize Bako Safe + FuelStreams
```typescript
import { BakoSafe } from '@bako-safe/sdk';
import { FuelStreams } from '@fuelstreams/sdk';

const bakoSafe = new BakoSafe({
  networkUrl: 'https://beta-5.fuel.network/graphql'
});

const fuelStreams = new FuelStreams({
  provider: bakoSafe.provider,
  wallet: bakoSafe.wallet
});
```

### Multi-Sig Stream Creation

#### Corporate Payroll Example
```typescript
// Create multi-sig safe for payroll
const payrollSafe = await bakoSafe.createSafe({
  name: "TechCorp Payroll Safe",
  threshold: 2, // 2 of 3 signatures required
  signers: [
    "0xCEO...",    // CEO
    "0xCFO...",    // CFO  
    "0xHR..."     // HR Director
  ]
});

// Propose payroll stream creation
const streamProposal = await payrollSafe.proposeTransaction({
  to: fuelStreams.contractAddress,
  data: fuelStreams.interface.encodeFunctionData('createStream', {
    recipient: "0xEmployee...",
    amount: "8000", // $8000/month
    duration: "365d", // 1 year contract
    asset: "USDC",
    metadata: {
      type: "payroll",
      employeeId: "EMP001",
      department: "Engineering",
      approvalRequired: true
    }
  }),
  value: "8000"
});

console.log('Proposal created:', streamProposal.id);
console.log('Approvals needed:', streamProposal.approvalsNeeded);
```

#### Investment Fund Management
```typescript
// Create investment committee safe
const investmentSafe = await bakoSafe.createSafe({
  name: "Investment Committee Safe",
  threshold: 3, // 3 of 5 approval required
  signers: [
    "0xPartner1...",
    "0xPartner2...", 
    "0xPartner3...",
    "0xPartner4...",
    "0xPartner5..."
  ]
});

// Propose RWA investment
const investmentProposal = await investmentSafe.proposeTransaction({
  to: fuelStreams.rwaContract,
  data: fuelStreams.interface.encodeFunctionData('investInAsset', {
    assetId: "rwa_manhattan_office_001",
    amount: "500000", // $500K investment
    autoReinvest: true,
    yieldStreaming: true
  }),
  value: "500000"
});
```

### Approval Workflow

#### Sign Proposals
```typescript
// CEO approves payroll stream
await payrollSafe.approveTransaction(streamProposal.id, {
  signer: ceoWallet,
  comment: "Approved - new hire confirmed"
});

// CFO approves with budget verification
await payrollSafe.approveTransaction(streamProposal.id, {
  signer: cfoWallet,
  comment: "Budget approved - within Q1 allocation"
});

// Auto-execute once threshold met
// Stream automatically created when 2/3 signatures obtained
```

#### Real-time Notifications
```typescript
// Listen for approval events
payrollSafe.on('proposalApproved', (event) => {
  console.log(`Proposal ${event.proposalId} approved by ${event.signer}`);
  console.log(`Approvals: ${event.currentApprovals}/${event.requiredApprovals}`);
  
  if (event.currentApprovals >= event.requiredApprovals) {
    console.log('✅ Proposal ready for execution');
  }
});

// Listen for stream creation
fuelStreams.on('streamCreated', (stream) => {
  console.log('✅ Multi-sig stream created:', stream.id);
  console.log('💰 Employee will earn:', stream.rate, 'per second');
});
```

### Emergency Controls

#### Emergency Pause System
```typescript
// Create emergency pause safe (1 of 3 for quick action)
const emergencySafe = await bakoSafe.createSafe({
  name: "Emergency Controls",
  threshold: 1, // Any one signer can pause
  signers: [
    "0xCEO...",
    "0xCTO...",
    "0xSecurity..."
  ]
});

// Emergency pause all streams
const emergencyPause = await emergencySafe.proposeTransaction({
  to: fuelStreams.contractAddress,
  data: fuelStreams.interface.encodeFunctionData('emergencyPause'),
  priority: "urgent"
});

// Immediate execution (1 signature threshold)
await emergencySafe.approveTransaction(emergencyPause.id, {
  signer: ceoWallet,
  urgent: true
});
```

#### Stream Cancellation
```typescript
// Cancel specific stream (requires 2/3 approval)
const cancelProposal = await payrollSafe.proposeTransaction({
  to: fuelStreams.contractAddress,
  data: fuelStreams.interface.encodeFunctionData('cancelStream', {
    streamId: "stream_emp001",
    reason: "Employment terminated"
  })
});
```

### Treasury Management

#### Multi-Asset Treasury
```typescript
// Create treasury management safe
const treasurySafe = await bakoSafe.createSafe({
  name: "Corporate Treasury",
  threshold: 3, // 3 of 5 for major decisions
  signers: [
    "0xCEO...",
    "0xCFO...",
    "0xBoard1...",
    "0xBoard2...",
    "0xBoard3..."
  ]
});

// Diversify treasury into RWA streams
const diversificationProposal = await treasurySafe.proposeTransaction({
  to: fuelStreams.portfolioContract,
  data: fuelStreams.interface.encodeFunctionData('createPortfolio', {
    name: "Corporate Treasury Diversification",
    allocation: {
      "real-estate": 0.30,      // 30% real estate
      "government-bonds": 0.40,  // 40% gov bonds
      "corporate-bonds": 0.20,   // 20% corp bonds
      "commodities": 0.10        // 10% commodities
    },
    amount: "10000000", // $10M allocation
    streamYields: true
  })
});
```

### Compliance & Reporting

#### Automated Reporting
```typescript
// Generate multi-sig activity reports
const complianceReport = await bakoSafe.generateReport({
  safeId: payrollSafe.id,
  period: "monthly",
  includeStreams: true,
  format: "detailed"
});

console.log('Multi-sig transactions:', complianceReport.transactions);
console.log('Active streams:', complianceReport.streams);
console.log('Total value managed:', complianceReport.totalValue);
```

#### Audit Trail
```typescript
// Get complete audit trail
const auditTrail = await bakoSafe.getAuditTrail({
  safeId: payrollSafe.id,
  startDate: "2024-01-01",
  endDate: "2024-12-31",
  includeSignatures: true,
  includeComments: true
});

// Export for compliance
await auditTrail.exportToPDF('payroll-audit-2024.pdf');
```

### Advanced Features

#### Conditional Execution
```typescript
// Stream with time-based conditions
const conditionalStream = await payrollSafe.proposeTransaction({
  to: fuelStreams.contractAddress,
  data: fuelStreams.interface.encodeFunctionData('createConditionalStream', {
    recipient: "0xEmployee...",
    amount: "10000",
    duration: "365d",
    conditions: {
      startAfter: "2024-02-01", // Start February 1st
      pauseOn: ["weekends", "holidays"],
      performanceGating: true // Requires monthly review
    }
  })
});
```

#### Delegate Approvals
```typescript
// Delegate approval authority for routine transactions
await payrollSafe.delegateApproval({
  delegate: "0xHRManager...",
  scope: {
    maxAmount: "5000", // Up to $5K streams
    streamTypes: ["payroll", "contractor"],
    duration: "30d" // Delegation expires in 30 days
  },
  threshold: 1 // HR manager can approve alone within limits
});
```

### Dashboard Integration

#### Multi-Sig Stream Dashboard
```typescript
// Real-time dashboard data
const dashboard = await bakoSafe.getDashboard({
  safeId: payrollSafe.id,
  includeStreams: true,
  includePendingProposals: true
});

console.log('Active streams:', dashboard.activeStreams);
console.log('Pending approvals:', dashboard.pendingProposals);
console.log('Monthly outflow:', dashboard.monthlyOutflow);
console.log('Signer activity:', dashboard.signerActivity);
```

#### Mobile Approvals
```typescript
// Mobile-optimized approval interface
const mobileApproval = await bakoSafe.createMobileSession({
  signer: "0xCEO...",
  proposalId: streamProposal.id,
  biometricAuth: true,
  sessionTimeout: 300 // 5 minutes
});

// Quick approve via mobile
await mobileApproval.approve({
  fingerprint: biometricData,
  comment: "Approved via mobile"
});
```

### Integration Examples

#### Slack/Discord Notifications
```typescript
// Setup webhook notifications
await bakoSafe.setupWebhook({
  url: "https://hooks.slack.com/...",
  events: ["proposal_created", "proposal_approved", "stream_created"],
  format: "slack"
});

// Example Slack message:
// 💰 New payroll stream proposal
// 👤 Employee: John Doe (EMP001)
// 💵 Amount: $8,000/month
// ⏱️ Duration: 1 year
// ✅ Approvals: 1/2 (CEO approved)
// 🔗 [Approve](https://app.bako.global/proposal/123)
```

#### API Integration
```typescript
// REST API for external systems
app.post('/approve-payroll', async (req, res) => {
  const { employeeId, amount, department } = req.body;
  
  // Create stream proposal
  const proposal = await payrollSafe.proposeTransaction({
    to: fuelStreams.contractAddress,
    data: fuelStreams.interface.encodeFunctionData('createStream', {
      recipient: await getEmployeeWallet(employeeId),
      amount,
      duration: "365d",
      metadata: { employeeId, department }
    })
  });
  
  res.json({ proposalId: proposal.id });
});
```

### Best Practices

#### Security
1. **Tiered Approval**: Different thresholds for different amounts
2. **Time Delays**: Optional delays for large transactions
3. **Emergency Protocols**: Quick pause mechanisms
4. **Regular Audits**: Monthly review of all multi-sig activity

#### Operational
1. **Clear Roles**: Define who can propose vs approve
2. **Documentation**: Always include comments with approvals
3. **Backup Signers**: Have more signers than minimum required
4. **Regular Testing**: Test emergency procedures quarterly

Ready to implement enterprise-grade multi-signature streaming? Contact our enterprise team for setup assistance! 