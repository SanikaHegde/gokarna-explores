/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@libsql/client', 'better-sqlite3'],
  outputFileTracingIncludes: {
    '/*': ['./prisma.config.ts'],
  },
};

export default nextConfig;
