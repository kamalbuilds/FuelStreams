import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { FuelProvider } from '@/providers/FuelProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FuelStreams - Real-Time Asset Streaming Protocol',
  description: 'Next-generation real-time asset streaming and micro-payment infrastructure built on Fuel Network',
  keywords: ['Fuel', 'blockchain', 'streaming', 'payments', 'RWA', 'DeFi'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FuelProvider>
          {children}
        </FuelProvider>
      </body>
    </html>
  );
} 