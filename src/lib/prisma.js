import { PrismaClient } from '@prisma/client'
import { createClient } from '@libsql/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import path from 'path'

const globalForPrisma = global;

const dbUrl = process.env.DATABASE_URL || `file:${path.join(process.cwd(), 'dev.db')}`;

export const prisma = new Proxy({}, {
  get(target, prop) {
    if (!globalForPrisma.prisma) {
      const libsql = createClient({ url: dbUrl });
      const adapter = new PrismaLibSql(libsql);
      globalForPrisma.prisma = new PrismaClient({
        adapter,
        log: ['query'],
      });
    }
    return globalForPrisma.prisma[prop];
  }
});

if (process.env.NODE_ENV !== 'production') {
  // We can't directly assign to globalForPrisma.prisma here because it would trigger instantiation.
  // The proxy handles the global cache internally.
}
