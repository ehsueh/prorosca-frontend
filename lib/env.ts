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
  try {
    const env = {
      NEXT_PUBLIC_APP_ID: process.env.NEXT_PUBLIC_APP_ID,
      NEXT_PUBLIC_LENDING_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_LENDING_CONTRACT_ADDRESS,
      NEXT_PUBLIC_WORLD_CHAIN_RPC_URL: process.env.NEXT_PUBLIC_WORLD_CHAIN_RPC_URL || 'https://worldchain-mainnet.g.alchemy.com/public',
    };

    envSchema.parse(env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(err => err.message).join('\n');
      throw new Error(
        `Environment Validation Failed\n\n${missingVars}\n\n` +
        `Please check your Netlify environment variables:\n` +
        `1. Go to Netlify dashboard > Site settings > Environment variables\n` +
        `2. Ensure all required variables are set\n` +
        `3. Trigger a new deployment after setting the variables`
      );
    }
    throw error;
  }
} 