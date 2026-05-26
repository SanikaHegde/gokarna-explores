import { PrismaClient } from '@prisma/client'
import path from 'path'

const globalForPrisma = global;

const dbUrl = process.env.DATABASE_URL || `file:${path.join(process.cwd(), 'dev.db')}`;

// Lazily instantiate standard PrismaClient
export const prisma = new Proxy({}, {
  get(target, prop) {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = new PrismaClient({
        datasources: {
          db: {
            url: dbUrl,
          },
        },
        log: ['query'],
      });
    }
    return globalForPrisma.prisma[prop];
  }
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
