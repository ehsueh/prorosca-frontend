import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_WORLD_APP_ID: z.string().min(1, "NEXT_PUBLIC_WORLD_APP_ID is required"),
  NEXT_PUBLIC_LENDING_CONTRACT_ADDRESS: z.string().min(1, "NEXT_PUBLIC_LENDING_CONTRACT_ADDRESS is required"),
  NEXT_PUBLIC_WORLD_CHAIN_RPC_URL: z.string().min(1, "NEXT_PUBLIC_WORLD_CHAIN_RPC_URL is required"),
});

export function validateEnv() {
  try {
    const env = {
      NEXT_PUBLIC_WORLD_APP_ID: process.env.NEXT_PUBLIC_WORLD_APP_ID,
      NEXT_PUBLIC_LENDING_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_LENDING_CONTRACT_ADDRESS,
      NEXT_PUBLIC_WORLD_CHAIN_RPC_URL: process.env.NEXT_PUBLIC_WORLD_CHAIN_RPC_URL || 'https://rpc.world.org',
    };

    envSchema.parse(env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(err => err.message).join('\n');
      throw new Error(`Environment validation failed:\n${missingVars}\n\nPlease set these variables in your Netlify environment settings.`);
    }
    throw error;
  }
} 