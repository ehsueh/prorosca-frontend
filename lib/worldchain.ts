import { MiniKit } from '@worldcoin/minikit-js';

export const WORLD_CHAIN_ID = 10; // World Chain mainnet
export const WORLD_CHAIN_RPC_URL = 'https://rpc.world.org';

export const isWorldAppEnvironment = () => {
  return MiniKit.isInstalled();
};

export const getWorldChainConfig = () => {
  return {
    chainId: WORLD_CHAIN_ID,
    rpcUrl: WORLD_CHAIN_RPC_URL,
    name: 'World Chain',
    nativeCurrency: {
      name: 'WLD',
      symbol: 'WLD',
      decimals: 18,
    },
  };
};

// Helper function to check if user is authenticated in World App
export const isWorldAppAuthenticated = async () => {
  if (!isWorldAppEnvironment()) return false;
  try {
    const { finalPayload } = await MiniKit.commandsAsync.walletAuth({
      nonce: Date.now().toString(),
    });
    return finalPayload.status === 'success';
  } catch {
    return false;
  }
};

// Helper function to get the user's World App address
export const getWorldAppAddress = async () => {
  if (!isWorldAppEnvironment()) return null;
  try {
    const { finalPayload } = await MiniKit.commandsAsync.walletAuth({
      nonce: Date.now().toString(),
    });
    return finalPayload.status === 'success' ? finalPayload.address : null;
  } catch {
    return null;
  }
}; 