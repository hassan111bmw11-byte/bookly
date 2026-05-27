import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const connectionString = process.env.DATABASE_URL;

// Only attach the PrismaPg adapter when a connection string is available.
// The adapter constructor can throw if the connection string is missing or invalid,
// which would cause imports to fail at runtime (e.g. during deployments).
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    ...(connectionString ?
      { adapter: new PrismaPg({ connectionString }) }
    : {}),
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
