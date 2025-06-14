
import { motion } from 'framer-motion';
import { Building2, Landmark, Coins, TrendingUp, Shield, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RWASection = () => {
  const rwaAssets = [
    {
      icon: Building2,
      title: 'Real Estate',
      value: '$2.4M',
      yield: '8.5% APY',
      description: 'Tokenized commercial and residential properties with streaming rental income',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Landmark,
      title: 'Government Bonds',
      value: '$3.2M',
      yield: '4.2% APY',
      description: 'Treasury securities with automated yield distribution',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Coins,
      title: 'Commodities',
      value: '$1.8M',
      yield: '12.3% APY',
      description: 'Gold, silver, and agricultural commodities with price streaming',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: TrendingUp,
      title: 'Private Credit',
      value: '$1.5M',
      yield: '15.7% APY',
      description: 'High-yield private lending opportunities with risk management',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <section id="rwa" className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Real-World Asset <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Tokenization</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transform traditional assets into streaming income tokens with built-in compliance and automated yield distribution.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {rwaAssets.map((asset, index) => (
            <motion.div
              key={asset.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 h-full">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${asset.color} flex items-center justify-center mb-4`}>
                    <asset.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-white text-xl">{asset.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-white">{asset.value}</span>
                    <span className="text-green-400 font-semibold">{asset.yield}</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{asset.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <Shield className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Regulatory Compliance</h3>
            <p className="text-gray-400">Built-in KYC/AML and jurisdiction-specific compliance modules</p>
          </div>
          <div className="text-center">
            <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Automated Yield</h3>
            <p className="text-gray-400">Real-time income distribution to thousands of token holders</p>
          </div>
          <div className="text-center">
            <Globe className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Global Access</h3>
            <p className="text-gray-400">24/7 liquidity and fractional ownership opportunities</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RWASection;
