/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    "/**": ["./dev.db"]
  },
  serverExternalPackages: ['@libsql/client', 'better-sqlite3'],
};

export default nextConfig;
