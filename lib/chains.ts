import { defineChain } from 'viem'

export const worldchain = defineChain({
  id: 1, // Replace with actual Worldchain ID
  name: 'Worldchain',
  network: 'worldchain',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://worldchain-mainnet.g.alchemy.com/public'],
    },
    public: {
      http: ['https://worldchain-mainnet.g.alchemy.com/public'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Worldchain Explorer',
      url: 'https://explorer.worldchain.org',
    },
  },
  contracts: {
    // Add any known contract addresses here
  },
}) 