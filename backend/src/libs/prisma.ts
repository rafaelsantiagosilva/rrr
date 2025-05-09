import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  errorFormat: "pretty",
  log: ["query", "info", "warn", "error"]
})