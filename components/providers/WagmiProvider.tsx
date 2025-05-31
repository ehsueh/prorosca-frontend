'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createConfig, http, WagmiProvider as Provider } from 'wagmi'
import { worldchain } from '@/lib/chains'

const config = createConfig({
  chains: [worldchain],
  transports: {
    [worldchain.id]: http(process.env.NEXT_PUBLIC_WORLD_CHAIN_RPC_URL),
  },
})

const queryClient = new QueryClient()

export function WagmiProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </Provider>
  )
} 