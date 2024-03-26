import { PrismaClient } from "@prisma/client";

import { env } from "~/env";

const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;


import { faker } from '@faker-js/faker';

function func() {
console.log(faker.commerce.department())
// faker.commerce.department() // 'Garden'



for (let i = 0; i < 100; i++) {
  db.product.create({
    name: faker.commerce.department(),
  });
}
}

func();