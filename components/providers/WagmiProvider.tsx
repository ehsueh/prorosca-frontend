'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider as WagmiProviderBase, createConfig } from 'wagmi'
import { http } from 'viem'
import { worldchain } from '@/lib/chains'

const config = createConfig({
  chains: [worldchain],
  transports: {
    [worldchain.id]: http(),
  },
})

const queryClient = new QueryClient()

export function WagmiProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProviderBase config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProviderBase>
  )
} 