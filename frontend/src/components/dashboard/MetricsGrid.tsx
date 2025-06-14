
import { motion } from 'framer-motion';
import { Droplets, Zap, Shield, TrendingUp, DollarSign, Users, Activity, Globe } from 'lucide-react';

const MetricsGrid = () => {
  const metrics = [
    { icon: Droplets, label: 'Total Value Streamed', value: '$12.4M', change: '+23.5%' },
    { icon: Zap, label: 'Active Streams', value: '1,247', change: '+12.3%' },
    { icon: Shield, label: 'Privacy Streams', value: '89', change: '+45.2%' },
    { icon: TrendingUp, label: 'Yield Generated', value: '$543K', change: '+18.7%' },
    { icon: DollarSign, label: 'RWA Tokenized', value: '$8.2M', change: '+34.1%' },
    { icon: Users, label: 'Active Users', value: '3,421', change: '+28.9%' },
    { icon: Activity, label: 'Transactions/sec', value: '156', change: '+8.4%' },
    { icon: Globe, label: 'Global Reach', value: '47 Countries', change: '+5 new' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <metric.icon className="h-8 w-8 text-blue-400" />
            <span className="text-green-400 text-sm font-medium">{metric.change}</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
          <div className="text-gray-400 text-sm">{metric.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default MetricsGrid;
