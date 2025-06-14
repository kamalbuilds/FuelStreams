
import { motion } from 'framer-motion';
import { Droplets, Shield, Zap, TrendingUp, Globe, Lock, Coins, BarChart3 } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Droplets,
      title: 'Continuous Payment Streams',
      description: 'Real-time salary, subscription, and yield payments with 1-second precision',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'Privacy-Preserving Flows',
      description: 'Zero-knowledge payment streams for confidential transactions',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Coins,
      title: 'RWA Asset Streaming',
      description: 'Tokenized real-world assets with streaming income distribution',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Zap,
      title: 'Micro-Payment Infrastructure',
      description: 'Ultra-low cost payments for content, services, and utilities',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: TrendingUp,
      title: 'Automated Yield Farming',
      description: 'Real-time yield farming with automated portfolio rebalancing',
      gradient: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Globe,
      title: 'Cross-Chain Compatibility',
      description: 'Seamless integration with multiple blockchain networks',
      gradient: 'from-teal-500 to-cyan-500'
    },
    {
      icon: Lock,
      title: 'Secure & Audited',
      description: 'Multi-signature governance with formal verification',
      gradient: 'from-red-500 to-pink-500'
    },
    {
      icon: BarChart3,
      title: 'Real-Time Analytics',
      description: 'Comprehensive dashboard with live streaming metrics',
      gradient: 'from-violet-500 to-purple-500'
    }
  ];

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Revolutionizing <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Finance</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            FuelStreams combines cutting-edge technology with innovative financial instruments to create the next generation of streaming payment infrastructure.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
