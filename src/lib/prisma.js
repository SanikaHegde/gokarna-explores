import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = globalThis;

function createClient() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL is not set. Please configure it in environment variables.');
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log: ['error']
  });
}

function getPrismaClient() {
  if (!globalForPrisma.__prismaClient) {
    globalForPrisma.__prismaClient = createClient();
  }

  return globalForPrisma.__prismaClient;
}

export const prisma = new Proxy({}, {
  get(_, prop) {
    const client = getPrismaClient();
    return client[prop];
  }
});
