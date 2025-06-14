
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Pause, Play, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StreamCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  isActive: boolean;
  rate: string;
  progress: number;
}

const StreamCard = ({ title, value, change, isPositive, isActive, rate, progress }: StreamCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-white">{title}</CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white h-8 w-8 p-0"
              >
                {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white h-8 w-8 p-0"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="text-2xl font-bold text-white">{value}</div>
              <div className="flex items-center space-x-1 text-sm">
                {isPositive ? (
                  <TrendingUp className="h-4 w-4 text-green-400" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-400" />
                )}
                <span className={isPositive ? 'text-green-400' : 'text-red-400'}>
                  {change}
                </span>
              </div>
            </div>
            
            <div>
              <div className="text-sm text-gray-400 mb-1">Streaming Rate</div>
              <div className="text-lg font-semibold text-blue-400">{rate}</div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StreamCard;
