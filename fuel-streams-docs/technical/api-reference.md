# API Reference

## REST API Endpoints

### Base URL
```
Production: https://api.fuelstreams.io/v1
Testnet: https://testnet-api.fuelstreams.io/v1
```

### Authentication
```typescript
// API Key Authentication
headers: {
  'Authorization': 'Bearer YOUR_API_KEY',
  'Content-Type': 'application/json'
}
```

## Streams API

### Create Stream
```http
POST /streams
```

**Request Body:**
```json
{
  "recipient": "0x742d35Cc6634C0532925a3b8D0b14b62e4734a64",
  "amount": "1000",
  "duration": "30d",
  "asset": "USDC",
  "metadata": {
    "type": "payroll",
    "employeeId": "EMP001"
  }
}
```

**Response:**
```json
{
  "id": "stream_abc123",
  "sender": "0x123...",
  "recipient": "0x456...",
  "amount": "1000",
  "rate": "0.000385802469135802",
  "startTime": "2024-01-15T10:30:00Z",
  "endTime": "2024-02-14T10:30:00Z",
  "asset": "USDC",
  "status": "active",
  "withdrawableAmount": "0",
  "streamedAmount": "0"
}
```

### Get Stream
```http
GET /streams/{streamId}
```

**Response:**
```json
{
  "id": "stream_abc123",
  "sender": "0x123...",
  "recipient": "0x456...",
  "amount": "1000",
  "rate": "0.000385802469135802",
  "startTime": "2024-01-15T10:30:00Z",
  "endTime": "2024-02-14T10:30:00Z",
  "asset": "USDC",
  "status": "active",
  "withdrawableAmount": "123.45",
  "streamedAmount": "123.45",
  "totalWithdrawn": "0"
}
```

### List Streams
```http
GET /streams?sender=0x123...&status=active&limit=10&offset=0
```

**Query Parameters:**
- `sender` (string): Filter by sender address
- `recipient` (string): Filter by recipient address  
- `status` (string): active, paused, completed, cancelled
- `asset` (string): Filter by asset type
- `limit` (number): Results per page (max 100)
- `offset` (number): Pagination offset

**Response:**
```json
{
  "streams": [...],
  "total": 42,
  "hasMore": true
}
```

### Withdraw from Stream
```http
POST /streams/{streamId}/withdraw
```

**Request Body:**
```json
{
  "amount": "100.50" // Optional, withdraws all available if not specified
}
```

**Response:**
```json
{
  "transactionId": "0xabcd...",
  "amount": "100.50",
  "timestamp": "2024-01-15T10:30:00Z",
  "gasUsed": "21000",
  "gasPrice": "1"
}
```

### Cancel Stream
```http
POST /streams/{streamId}/cancel
```

**Response:**
```json
{
  "transactionId": "0xabcd...",
  "status": "cancelled",
  "refundAmount": "876.55"
}
```

## RWA Assets API

### Tokenize Asset
```http
POST /rwa/assets
```

**Request Body:**
```json
{
  "name": "Manhattan Office Building",
  "symbol": "NYC-OFF-001",
  "totalValue": "15000000",
  "tokenSupply": "15000",
  "annualYield": 7.2,
  "assetType": "real-estate",
  "location": "New York, NY",
  "documents": [
    "property-deed.pdf",
    "appraisal-report.pdf"
  ],
  "custodian": "0xCustodianAddress..."
}
```

**Response:**
```json
{
  "id": "rwa_nyc001",
  "name": "Manhattan Office Building",
  "symbol": "NYC-OFF-001", 
  "totalValue": "15000000",
  "tokenSupply": "15000",
  "tokenPrice": "1000",
  "annualYield": 7.2,
  "assetType": "real-estate",
  "verified": false,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

### Get Asset
```http
GET /rwa/assets/{assetId}
```

### List Assets
```http
GET /rwa/assets?type=real-estate&verified=true&limit=20
```

**Query Parameters:**
- `type` (string): real-estate, bond, commodity, private-credit
- `verified` (boolean): Only verified assets
- `minYield` (number): Minimum annual yield
- `maxYield` (number): Maximum annual yield
- `limit` (number): Results per page

### Invest in Asset
```http
POST /rwa/assets/{assetId}/invest
```

**Request Body:**
```json
{
  "amount": "5000",
  "autoReinvest": true,
  "yieldStreaming": true
}
```

**Response:**
```json
{
  "investmentId": "inv_abc123",
  "assetId": "rwa_nyc001",
  "amount": "5000",
  "tokensReceived": "5",
  "yieldStreamId": "stream_xyz789",
  "transactionId": "0xabcd..."
}
```

## AI Integration API

### Process Natural Language
```http
POST /ai/process
```

**Request Body:**
```json
{
  "input": "Create a $100 monthly stream to my savings account",
  "context": {
    "walletAddress": "0x123...",
    "preferredAsset": "USDC"
  }
}
```

**Response:**
```json
{
  "interpretation": "Create monthly payment stream",
  "confidence": 0.95,
  "action": {
    "type": "create_stream",
    "parameters": {
      "recipient": "0x456...",
      "amount": "100",
      "frequency": "monthly",
      "asset": "USDC"
    }
  },
  "executionUrl": "/ai/execute/abc123"
}
```

### Execute AI Action
```http
POST /ai/execute/{actionId}
```

**Response:**
```json
{
  "executed": true,
  "result": {
    "streamId": "stream_abc123",
    "transactionId": "0xabcd..."
  }
}
```

## Portfolio API

### Create Portfolio
```http
POST /portfolios
```

**Request Body:**
```json
{
  "name": "Conservative Income",
  "strategy": "income-focused",
  "riskTolerance": "low",
  "targetYield": 6.0,
  "allocation": {
    "real-estate": 0.40,
    "government-bonds": 0.30,
    "corporate-bonds": 0.20,
    "commodities": 0.10
  }
}
```

### Get Portfolio Performance
```http
GET /portfolios/{portfolioId}/performance
```

**Response:**
```json
{
  "totalValue": "47350.00",
  "totalReturn": 18.3,
  "annualYield": 7.8,
  "monthlyIncome": "287.50",
  "assets": [
    {
      "assetId": "rwa_nyc001",
      "value": "12000.00",
      "return": 23.1,
      "allocation": 0.25
    }
  ],
  "performance": {
    "1d": 0.5,
    "7d": 2.1,
    "30d": 5.8,
    "1y": 18.3
  }
}
```

## Privacy API

### Create Private Stream
```http
POST /privacy/streams
```

**Request Body:**
```json
{
  "recipient": "0x456...",
  "amount": "1000",
  "duration": "30d",
  "useZKProofs": true,
  "anonymousWallet": true
}
```

### Generate Anonymous Wallet
```http
POST /privacy/wallets
```

**Response:**
```json
{
  "address": "0xabc...",
  "isAnonymous": true,
  "stealthSupport": true,
  "mixingEnabled": true
}
```

## Webhooks

### Stream Events
```json
{
  "type": "stream.withdrawal",
  "data": {
    "streamId": "stream_abc123",
    "amount": "100.50",
    "recipient": "0x456...",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

### Asset Events
```json
{
  "type": "asset.yield_distributed",
  "data": {
    "assetId": "rwa_nyc001", 
    "totalAmount": "1250.00",
    "recipients": 150,
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Invalid API key |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Resource already exists |
| 429 | Rate Limited - Too many requests |
| 500 | Internal Server Error |

**Error Response Format:**
```json
{
  "error": {
    "code": "INSUFFICIENT_FUNDS",
    "message": "Not enough balance to create stream",
    "details": {
      "required": "1000",
      "available": "500"
    }
  }
}
```

## Rate Limits

| Endpoint | Limit |
|----------|-------|
| GET requests | 1000/hour |
| POST requests | 100/hour |
| Stream operations | 50/hour |
| AI processing | 20/hour |

## SDK Examples

### JavaScript/TypeScript
```typescript
import { FuelStreamsAPI } from '@fuelstreams/api';

const api = new FuelStreamsAPI({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.fuelstreams.io/v1'
});

const stream = await api.streams.create({
  recipient: '0x456...',
  amount: '1000',
  duration: '30d',
  asset: 'USDC'
});
```

### Python
```python
from fuelstreams import FuelStreamsAPI

api = FuelStreamsAPI(api_key='your-api-key')

stream = api.streams.create(
    recipient='0x456...',
    amount='1000',
    duration='30d',
    asset='USDC'
)
```

### cURL
```bash
curl -X POST https://api.fuelstreams.io/v1/streams \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "recipient": "0x456...",
    "amount": "1000",
    "duration": "30d",
    "asset": "USDC"
  }'
``` 