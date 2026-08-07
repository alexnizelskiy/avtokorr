import { PrismaClient } from "@prisma/client";

/**
 * Prisma-клиент как синглтон (иначе в dev при HMR плодятся соединения).
 * Server-only: не импортировать из клиентских компонентов.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
