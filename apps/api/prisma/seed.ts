import "dotenv/config";
import { PrismaClient, UserRole, JobUrgency, JobStatus, JobEventType } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clean existing seed data (safe for dev)
  await prisma.review.deleteMany();
  await prisma.jobEvent.deleteMany();
  await prisma.job.deleteMany();
  await prisma.workerProfile.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("Password123!", 10);

  const customer = await prisma.user.create({
    data: {
      role: UserRole.CUSTOMER,
      name: "Alex Rivera",
      email: "alex@example.com",
      phone: "+1 (555) 123-4567",
      passwordHash,
      reliabilityScore: 94,
    },
  });

  const worker = await prisma.user.create({
    data: {
      role: UserRole.WORKER,
      name: "John Martinez",
      email: "john.worker@example.com",
      phone: "+1 (555) 777-1111",
      passwordHash,
      reliabilityScore: 98,
      workerProfile: {
        create: {
          categories: ["plumbing", "electrical"],
          radiusMiles: 15,
          baseRate: 75,
          emergencyOptIn: true,
          availableNow: true,
        },
      },
    },
  });

  const job = await prisma.job.create({
    data: {
      title: "Emergency - No Hot Water",
      description: "Water heater completely out, family needs hot water ASAP",
      jobType: "plumbing",
      urgency: JobUrgency.EMERGENCY,
      status: JobStatus.OPEN,
      priceMin: 250,
      priceMax: 350,
      lockedScope: "Diagnose and repair water heater or recommend replacement",
      lat: 40.7489,
      lng: -73.968,
      locationText: "1.2 miles away",
      createdById: customer.id,

      events: {
        create: [
          {
            type: JobEventType.CREATED,
            actorId: customer.id,
            note: "Job created (seed).",
          },
        ],
      },
    },
  });

  console.log("Seed complete:");
  console.log({ customer: customer.email, worker: worker.email, jobId: job.id });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
