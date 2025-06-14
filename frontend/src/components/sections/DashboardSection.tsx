
import { motion } from 'framer-motion';
import StreamCard from '@/components/dashboard/StreamCard';
import MetricsGrid from '@/components/dashboard/MetricsGrid';

const DashboardSection = () => {
  const streamData = [
    {
      title: 'Salary Stream',
      value: '$8,450.32',
      change: '+$142.50',
      isPositive: true,
      isActive: true,
      rate: '$2.34/sec',
      progress: 68
    },
    {
      title: 'Real Estate Yield',
      value: '$1,234.56',
      change: '+$89.12',
      isPositive: true,
      isActive: true,
      rate: '$0.45/sec',
      progress: 45
    },
    {
      title: 'Subscription Payments',
      value: '$567.89',
      change: '-$23.45',
      isPositive: false,
      isActive: false,
      rate: '$0.12/sec',
      progress: 23
    },
    {
      title: 'DeFi Yield Farming',
      value: '$2,345.67',
      change: '+$156.78',
      isPositive: true,
      isActive: true,
      rate: '$0.78/sec',
      progress: 89
    }
  ];

  return (
    <section id="dashboard" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Live <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Dashboard</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Monitor your streaming assets, track performance, and manage your portfolio in real-time.
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* Metrics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">Platform Metrics</h3>
            <MetricsGrid />
          </motion.div>

          {/* Stream Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">Active Streams</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {streamData.map((stream, index) => (
                <StreamCard key={index} {...stream} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
