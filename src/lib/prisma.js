import { PrismaClient } from '@prisma/client'

const globalForPrisma = global;

// Lazily instantiate standard PrismaClient
export const prisma = new Proxy({}, {
  get(target, prop) {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = new PrismaClient({
        log: ['query'],
        datasources: {
          db: {
            url: process.env.DATABASE_URL
          }
        }
      });
    }
    return globalForPrisma.prisma[prop];
  }
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
