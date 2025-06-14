
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Fingerprint, UserX, Zap } from 'lucide-react';

const PrivacySection = () => {
  const privacyFeatures = [
    {
      icon: Shield,
      title: 'Zero-Knowledge Streams',
      description: 'Prove payment validity without revealing transaction details',
      color: 'text-blue-400'
    },
    {
      icon: Eye,
      title: 'Anonymous Yield Collection',
      description: 'Collect returns from RWA investments without identity exposure',
      color: 'text-purple-400'
    },
    {
      icon: Lock,
      title: 'Encrypted Asset Ownership',
      description: 'Private wealth management with cryptographic security',
      color: 'text-green-400'
    },
    {
      icon: Fingerprint,
      title: 'Selective Disclosure',
      description: 'Choose what information to share with counterparties',
      color: 'text-orange-400'
    },
    {
      icon: UserX,
      title: 'Privacy Mixer',
      description: 'Break transaction linkability for enhanced privacy',
      color: 'text-pink-400'
    },
    {
      icon: Zap,
      title: 'Instant Privacy',
      description: 'Real-time privacy without sacrificing transaction speed',
      color: 'text-cyan-400'
    }
  ];

  return (
    <section id="privacy" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Privacy-First <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Architecture</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Advanced cryptographic techniques ensure your financial activities remain private while maintaining full transparency where needed.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {privacyFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-all duration-300"
            >
              <feature.icon className={`h-10 w-10 ${feature.color} mb-4`} />
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Privacy Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">Privacy Statistics</h3>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400">89</div>
              <div className="text-gray-400">Private Streams</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">$2.1M</div>
              <div className="text-gray-400">Anonymous Volume</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400">99.9%</div>
              <div className="text-gray-400">Privacy Preserved</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400">0.1s</div>
              <div className="text-gray-400">Privacy Proof Time</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrivacySection;
