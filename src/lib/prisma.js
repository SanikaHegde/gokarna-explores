import { PrismaClient } from '@prisma/client'
import { createClient } from '@libsql/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import path from 'path'

const globalForPrisma = global;

const dbUrl = process.env.DATABASE_URL || `file:${path.join(process.cwd(), 'dev.db')}`;

const libsql = createClient({ url: dbUrl });
const adapter = new PrismaLibSql(libsql);

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
