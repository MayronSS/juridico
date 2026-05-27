// Prisma config — carrega variáveis de .env.local (padrão Next.js)
import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// Carrega .env.local primeiro, fallback para .env
config({ path: ".env.local" });
config({ path: ".env" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "ts-node --project tsconfig.seed.json prisma/seed.ts",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
