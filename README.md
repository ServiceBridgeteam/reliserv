# ReliServe

**Reliability-first local services marketplace**  
Built for urgency, accountability, and real-world trust.

---

## Overview

ReliServe rethinks local service marketplaces by prioritizing:

- Reliability over inflated star ratings
- Emergency-first job handling
- Mutual accountability between customers and workers
- Behavior-based trust scoring

Unlike traditional platforms, ReliServe introduces:

- Behavior-based reliability scoring
- Lock-on-accept emergency handling
- AI-assisted job clarity to reduce disputes
- Structured job lifecycle enforcement

This project is being developed as a **production-style collaborative system** by a 4-developer engineering team.

---

## Core Goals

- Reduce cancellations and no-shows
- Improve emergency response times
- Reward consistent behavior
- Prevent disputes through structured job scope
- Simulate real-world marketplace constraints

---

## V1 Backend Features (Completed)

### Authentication
- POST `/v1/auth/signup`
- POST `/v1/auth/login`
- GET `/v1/auth/me`
- JWT authentication
- bcryptjs password hashing

### Jobs API
- POST `/v1/jobs`
- GET `/v1/jobs/:id`
- GET `/v1/jobs?mine=true`
- Default job status = `OPEN`
- Protected routes via JWT middleware

### Database
- PostgreSQL (Docker)
- Prisma ORM
- Tables:
- User
- WorkerProfile
- Job
- JobEvent
- Review
- Migrations + seed script

### Validation
- Zod schema validation
- Proper HTTP status handling
- Duplicate email protection

---

## Tech Stack

### Frontend
- React (TypeScript)
- Vite
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL

### Infrastructure
- Docker
- Docker Compose
- Redis (reserved for realtime V2)

---

## Repository Structure

```txt
reliserv/
  apps/
    web/        # React frontend
    api/        # Node + Express backend
  infra/        # Docker (Postgres, Redis)
  docs/         # Architecture notes
```

---

# Run Locally (5 Minutes)

## 1) Start Infrastructure (Postgres)

```powershell
docker compose -f infra/docker-compose.yml up -d
```

## 2) Backend Setup

```powershell
cd apps/api
cp .env.example .env
npm install
```

Ensure `.env` contains:

```txt
DATABASE_URL="postgresql://reliserv:reliserv@localhost:5432/reliserv?schema=public"
JWT_SECRET="dev_super_secret_change_me"
```

Run Prisma:

```powershell
npx prisma migrate dev --name init_v1
npx prisma db seed
```

Start API:

```powershell
npm run dev
```

Backend runs at:

`http://localhost:4000`

Health check:

`http://localhost:4000/health`

## 3) Frontend Setup

```powershell
cd apps/web
cp .env.example .env
npm install
npm run dev
```

Frontend runs at:

`http://localhost:5173`

## Stop Infrastructure

```powershell
docker compose -f infra/docker-compose.yml down
```

---

## Important Notes

- `.env` files are ignored by Git.
- Do not commit secrets.
- Prisma 7 uses `@prisma/adapter-pg` with `pg`.

---

## Windows + Docker Desktop Troubleshooting

If Docker Desktop fails:

Check WSL:

```powershell
wsl --status
```

If missing:

```powershell
wsl --install
```

Then reboot.

Ensure:

- CPU virtualization enabled in BIOS
- Hyper-V enabled
- Docker Desktop using WSL2 backend

---

## V1 In Progress

- Emergency lock-on-accept logic
- Job lifecycle state transitions
- Reliability score update system
- Worker acceptance flow
