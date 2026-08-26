import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../prisma-auth/generated/client";

const globalForAuthPrisma = globalThis as unknown as {
  authPrisma: PrismaClient | undefined;
};

const databaseUrl = process.env.AUTH_DATABASE_URL;

if (!databaseUrl) {
  throw new Error("AUTH_DATABASE_URL is not defined");
}

const adapter = new PrismaBetterSqlite3({ url: databaseUrl });

const authPrisma =
  globalForAuthPrisma.authPrisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForAuthPrisma.authPrisma = authPrisma;
}

export default authPrisma;
