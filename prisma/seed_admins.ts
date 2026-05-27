import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });

import { PrismaClient, UserRole } from "../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function run() {
  console.log("Pre-seeding production admins...");
  
  const admins = [
    { email: "mayronpaula6@gmail.com", name: "Mayron Paula" },
    { email: "may689645@gmail.com", name: "Mayron Souza" }
  ];

  for (const adm of admins) {
    await prisma.user.upsert({
      where: { email: adm.email },
      update: { role: UserRole.ADMIN },
      create: {
        email: adm.email,
        name: adm.name,
        role: UserRole.ADMIN,
        passwordHash: "clerk-managed"
      }
    });
    console.log(`Upserted ${adm.email} as ADMIN in production.`);
  }

  await prisma.$disconnect();
  console.log("Production admins pre-seeded successfully.");
}

run().catch(err => {
  console.error("Error pre-seeding production admins:", err);
});
