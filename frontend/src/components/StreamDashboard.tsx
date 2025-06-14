import React, { useState, useEffect } from 'react';
import { useAccount, useBalance, useWallet } from '@fuels/react';
import { BN, Address } from 'fuels';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CurrencyDollarIcon, 
  ChartBarIcon, 
  ClockIcon, 
  EyeSlashIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  PlusIcon,
  CogIcon
} from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { format, formatDistanceToNow } from 'date-fns';

interface PaymentStream {
  id: string;
  sender: string;
  recipient: string;
  assetId: string;
  ratePerSecond: BN;
  startTime: number;
  endTime: number;
  totalAmount: BN;
  withdrawn: BN;
  isActive: boolean;
  isPrivate: boolean;
}

interface RWAToken {
  id: string;
  assetId: string;
  underlyingAssetType: 'RealEstate' | 'Commodity' | 'Treasury' | 'PrivateCredit' | 'CorporateBond' | 'Equity';
  totalValue: BN;
  yieldRate: number;
  lastYieldPayment: number;
  complianceStatus: 'Pending' | 'Approved' | 'Rejected' | 'UnderReview';
  streamEnabled: boolean;
}

interface DashboardStats {
  totalStreams: number;
  activeStreams: number;
  totalValueLocked: BN;
  monthlyYield: BN;
  totalWithdrawn: BN;
}

const StreamDashboard: React.FC = () => {
  const { account } = useAccount();
  const { wallet } = useWallet();
  const [activeTab, setActiveTab] = useState<'streams' | 'rwa' | 'analytics'>('streams');
  const [streams, setStreams] = useState<PaymentStream[]>([]);
  const [rwaTokens, setRWATokens] = useState<RWAToken[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalStreams: 0,
    activeStreams: 0,
    totalValueLocked: new BN(0),
    monthlyYield: new BN(0),
    totalWithdrawn: new BN(0),
  });
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock data for demonstration
  const mockStreamData = [
    { time: '00:00', value: 1000 },
    { time: '06:00', value: 1250 },
    { time: '12:00', value: 1500 },
    { time: '18:00', value: 1750 },
    { time: '24:00', value: 2000 },
  ];

  const mockRWAData = [
    { asset: 'Real Estate', value: 25000, yield: 8.5 },
    { asset: 'Treasury', value: 15000, yield: 4.2 },
    { asset: 'Commodities', value: 10000, yield: 6.8 },
    { asset: 'Private Credit', value: 18000, yield: 12.3 },
  ];

  useEffect(() => {
    const loadData = async () => {
      if (!account || !wallet) return;
      
      try {
        // Mock data loading - replace with actual contract calls
        setStreams([
          {
            id: '1',
            sender: account.toString(),
            recipient: '0x123...abc',
            assetId: 'ETH',
            ratePerSecond: new BN(1000),
            startTime: Date.now() - 86400000, // 1 day ago
            endTime: Date.now() + 86400000 * 29, // 29 days from now
            totalAmount: new BN(2592000000), // 30 days worth
            withdrawn: new BN(86400000), // 1 day worth
            isActive: true,
            isPrivate: false,
          },
        ]);

        setRWATokens([
          {
            id: '1',
            assetId: 'RWA-RE-001',
            underlyingAssetType: 'RealEstate',
            totalValue: new BN(1000000),
            yieldRate: 850, // 8.5% in basis points
            lastYieldPayment: Date.now() - 86400000,
            complianceStatus: 'Approved',
            streamEnabled: true,
          },
        ]);

        setStats({
          totalStreams: 5,
          activeStreams: 3,
          totalValueLocked: new BN(75000),
          monthlyYield: new BN(620),
          totalWithdrawn: new BN(12500),
        });

        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };

    loadData();
  }, [account, wallet]);

  const formatCurrency = (amount: BN | number) => {
    const value = typeof amount === 'number' ? amount : amount.toNumber();
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; trend?: number }> = ({
    title,
    value,
    icon,
    trend,
  }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              {trend > 0 ? (
                <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {Math.abs(trend)}%
              </span>
            </div>
          )}
        </div>
        <div className="text-blue-600">{icon}</div>
      </div>
    </motion.div>
  );

  const StreamCard: React.FC<{ stream: PaymentStream }> = ({ stream }) => {
    const progress = ((stream.totalAmount.toNumber() - (stream.totalAmount.toNumber() - stream.withdrawn.toNumber())) / stream.totalAmount.toNumber()) * 100;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <h3 className="text-lg font-semibold text-gray-900">Stream #{stream.id}</h3>
            {stream.isPrivate && <EyeSlashIcon className="h-5 w-5 text-gray-400" />}
          </div>
          <span className="text-sm text-gray-500">
            {formatDistanceToNow(new Date(stream.endTime), { addSuffix: true })}
          </span>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Rate per second</span>
            <span className="font-medium">{formatCurrency(stream.ratePerSecond.toNumber())}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total amount</span>
            <span className="font-medium">{formatCurrency(stream.totalAmount.toNumber())}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Withdrawn</span>
            <span className="font-medium">{formatCurrency(stream.withdrawn.toNumber())}</span>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium">{progress.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2 mt-4">
          <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            Withdraw
          </button>
          <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
            Cancel
          </button>
        </div>
      </motion.div>
    );
  };

  const RWACard: React.FC<{ token: RWAToken }> = ({ token }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{token.underlyingAssetType}</h3>
          <p className="text-sm text-gray-500">Token ID: {token.id}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          token.complianceStatus === 'Approved' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {token.complianceStatus}
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Total Value</span>
          <span className="font-medium">{formatCurrency(token.totalValue.toNumber())}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Annual Yield</span>
          <span className="font-medium">{(token.yieldRate / 100).toFixed(2)}%</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Streaming</span>
          <span className={`font-medium ${token.streamEnabled ? 'text-green-600' : 'text-gray-400'}`}>
            {token.streamEnabled ? 'Enabled' : 'Disabled'}
          </span>
        </div>
      </div>
      
      <div className="flex space-x-2 mt-4">
        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
          Invest
        </button>
        <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
          Details
        </button>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">FuelStreams Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your streams and RWA investments</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Create Stream</span>
          </motion.button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Streams"
            value={stats.totalStreams.toString()}
            icon={<ChartBarIcon className="h-8 w-8" />}
            trend={12}
          />
          <StatCard
            title="Active Streams"
            value={stats.activeStreams.toString()}
            icon={<ClockIcon className="h-8 w-8" />}
            trend={8}
          />
          <StatCard
            title="Total Value Locked"
            value={formatCurrency(stats.totalValueLocked.toNumber())}
            icon={<CurrencyDollarIcon className="h-8 w-8" />}
            trend={24}
          />
          <StatCard
            title="Monthly Yield"
            value={formatCurrency(stats.monthlyYield.toNumber())}
            icon={<ArrowUpIcon className="h-8 w-8" />}
            trend={15}
          />
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {(['streams', 'rwa', 'analytics'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'streams' && (
            <motion.div
              key="streams"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {streams.map((stream) => (
                <StreamCard key={stream.id} stream={stream} />
              ))}
            </motion.div>
          )}

          {activeTab === 'rwa' && (
            <motion.div
              key="rwa"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {rwaTokens.map((token) => (
                <RWACard key={token.id} token={token} />
              ))}
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Streaming Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockStreamData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">RWA Portfolio</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockRWAData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="asset" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#2563eb" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StreamDashboard; 