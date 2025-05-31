import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_APP_ID: z.string().min(1, {
    message: "NEXT_PUBLIC_APP_ID is required - Set this to your World App ID from the World Developer Portal"
  }),
  NEXT_PUBLIC_LENDING_CONTRACT_ADDRESS: z.string().min(1, {
    message: "NEXT_PUBLIC_LENDING_CONTRACT_ADDRESS is required - Set this to your deployed lending contract address"
  }),
  NEXT_PUBLIC_WORLD_CHAIN_RPC_URL: z.string().min(1, {
    message: "NEXT_PUBLIC_WORLD_CHAIN_RPC_URL is required - Should be set to your World Chain RPC URL"
  }),
});

export function validateEnv() {
  // In development, provide default values
  if (process.env.NODE_ENV === 'development') {
    if (!process.env.NEXT_PUBLIC_APP_ID) {
      console.warn('⚠️ NEXT_PUBLIC_APP_ID not set, using development default');
      process.env.NEXT_PUBLIC_APP_ID = 'app_staging_dev';
    }
    if (!process.env.NEXT_PUBLIC_LENDING_CONTRACT_ADDRESS) {
      console.warn('⚠️ NEXT_PUBLIC_LENDING_CONTRACT_ADDRESS not set, using zero address');
      process.env.NEXT_PUBLIC_LENDING_CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000';
    }
    if (!process.env.NEXT_PUBLIC_WORLD_CHAIN_RPC_URL) {
      console.warn('⚠️ Using default Worldcoin Sepolia RPC URL');
      process.env.NEXT_PUBLIC_WORLD_CHAIN_RPC_URL = 'https://worldchain-sepolia.g.alchemy.com/public';
    }
    return;
  }

  try {
    const env = {
      NEXT_PUBLIC_APP_ID: process.env.NEXT_PUBLIC_APP_ID,
      NEXT_PUBLIC_LENDING_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_LENDING_CONTRACT_ADDRESS,
      NEXT_PUBLIC_WORLD_CHAIN_RPC_URL: process.env.NEXT_PUBLIC_WORLD_CHAIN_RPC_URL || 'https://worldchain-sepolia.g.alchemy.com/public',
    };

    envSchema.parse(env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(err => err.message).join('\n');
      throw new Error(
        `Environment Validation Failed\n\n${missingVars}\n\n` +
        `Please check your environment variables:\n` +
        `1. Create a .env.local file in your project root\n` +
        `2. Ensure all required variables are set\n` +
        `3. Restart the development server\n\n` +
        `For production deployments:\n` +
        `1. Go to your deployment platform settings\n` +
        `2. Add the required environment variables\n` +
        `3. Trigger a new deployment`
      );
    }
    throw error;
  }
} 