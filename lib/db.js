import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis;

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    throw new Error("DATABASE_URL is missing in your .env file");
  }

  // Create the PostgreSQL connection pool
  const pool = new Pool({ connectionString });
  // Pass the pool to the Prisma adapter
  const adapter = new PrismaPg(pool);
  
  // Initialize Prisma with the adapter
  return new PrismaClient({ adapter });
}

const prisma = globalForPrisma.prisma ?? createPrismaClient();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;