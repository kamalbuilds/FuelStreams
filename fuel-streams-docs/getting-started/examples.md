# Integration Examples

## Real-World Integration Examples

### 1. Payroll System
```typescript
// Employer sets up employee streams
const payroll = new PayrollManager({
  company: "TechCorp Inc"
});

await payroll.addEmployee({
  name: "John Doe",
  hourlyRate: 50,
  walletAddress: "0x123..."
});

// Employee earnings stream automatically
```

### 2. Subscription Service
```typescript
// Content creator monetization
const subscription = await FuelStreams.createSubscription({
  creator: "0xCreator...",
  price: "10", // $10/month
  benefits: ["Premium content", "Direct access"]
});
```

### 3. Supply Chain Payments
```typescript
// Automatic supplier payments
const supplyChain = new SupplyChainStreams();

await supplyChain.createMilestonePayment({
  supplier: "0xSupplier...",
  milestones: [
    { description: "Materials delivered", percentage: 40 },
    { description: "Production complete", percentage: 40 },
    { description: "Quality approved", percentage: 20 }
  ],
  totalAmount: "50000"
});
```

### 4. Real Estate Investment
```typescript
// Fractional real estate with streaming yields
const realEstate = await RWAStreams.investInProperty({
  propertyId: "NYC-COMM-001",
  amount: "1000",
  expectedYield: "7.2%"
});

// Earn rent every second!
```

Ready to build your own? Check out our [SDK Documentation](../technical/sdk-docs.md)! 