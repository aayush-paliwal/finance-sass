import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: ".env.local" })

export default defineConfig({
  schema: './db/schema.ts',
  out: './drizzle',
  driver: 'pg', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  verbose: true, 
  strict: true
}); 