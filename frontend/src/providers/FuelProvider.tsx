'use client';

import React from 'react';
import { FuelProvider as FuelReactProvider, FuelConfig } from '@fuels/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { defaultConnectors } from '@fuels/connectors';

const queryClient = new QueryClient();

const fuelConfig: FuelConfig = {
  connectors: defaultConnectors({
    devMode: process.env.NODE_ENV === 'development',
  }),
};

export function FuelProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <FuelReactProvider config={fuelConfig}>
        {children}
      </FuelReactProvider>
    </QueryClientProvider>
  );
} 