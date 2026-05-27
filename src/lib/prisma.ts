import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const connectionString = process.env.DATABASE_URL;

function createPrismaClient(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  if (!connectionString) {
    throw new Error(
      "Prisma client requested but DATABASE_URL is not set. Set DATABASE_URL in your environment.",
    );
  }

  const client = new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }

  return client;
}

// Export a proxy that lazily initializes the Prisma client on first use.
// This avoids constructing PrismaClient at import time when DATABASE_URL is missing
// which caused build-time errors in some deployment environments.
const prismaProxy = new Proxy(
  {},
  {
    get(_, prop) {
      const client = createPrismaClient();
      const value = (client as unknown as Record<PropertyKey, unknown>)[
        prop as PropertyKey
      ];
      if (typeof value === "function") {
        return (value as (...args: unknown[]) => unknown).bind(client);
      }
      return value;
    },
    // allow await import default to be considered truthy
    has(_, prop) {
      const client = createPrismaClient();
      return prop in client;
    },
  },
) as unknown as PrismaClient;
export default prismaProxy;
