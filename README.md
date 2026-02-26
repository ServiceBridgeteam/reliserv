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
- POST `/v1/jobs/:id/accept`
- POST `/v1/jobs/:id/start`
- POST `/v1/jobs/:id/complete`
- POST `/v1/jobs/:id/cancel`
- GET `/v1/jobs/:id/events`
- Default job status = `OPEN`
- Atomic lock-on-accept (`OPEN` -> `LOCKED`) with 409 conflict if already taken
- Lifecycle transitions:
- `LOCKED` -> `IN_PROGRESS` via `start`
- `IN_PROGRESS` -> `COMPLETED` via `complete`
- `OPEN` -> `CANCELED` via `cancel` (creator only, V1 rule)
- Protected routes via JWT middleware

### Emergency + Worker API
- POST `/v1/emergency`
- GET `/v1/worker/requests`
- Emergency jobs are created with `urgency=EMERGENCY` and `status=OPEN`
- Worker requests feed returns open emergency jobs (latest first)

### Database
- PostgreSQL (Docker)
- Prisma ORM
- Tables:
- `User`
- `WorkerProfile`
- `Job`
- `JobEvent`
- `Review`
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

Use `localhost` for API URLs in local development (recommended over `127.0.0.1`).

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
- Test environment uses `apps/api/.env.test` and `reliserv_test` database.

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

- Reliability score update system

---

## DEV2 Integration Tests (Jest + Supertest)

Integration suite file:

- `apps/api/src/__tests__/dev2.e2e.test.ts`

What it covers:

- Health + auth protection
- Emergency create + worker request feed
- Atomic accept (`200` then `409`)
- Lifecycle transitions (`start`, `complete`, `cancel` rule)
- Events endpoint includes `CREATED`, `ACCEPTED`, `STARTED`, `COMPLETED`

Run tests:

```powershell
docker compose -f infra/docker-compose.yml up -d
cd apps/api
$env:DOTENV_CONFIG_PATH=".env.test"
npx prisma migrate deploy
npm test
```

---

## Atomic + Lifecycle Proof

Validated on local API (`http://localhost:4000`) with 3 users:

1. Customer created emergency job via POST `/v1/emergency` -> `201`
2. Worker A accepted via POST `/v1/jobs/:id/accept` -> `200`
3. Worker B accepted same job via POST `/v1/jobs/:id/accept` -> `409`
4. Worker A started job via POST `/v1/jobs/:id/start` -> `200`
5. Worker A completed job via POST `/v1/jobs/:id/complete` -> `200`
6. GET `/v1/jobs/:id/events` includes `CREATED`, `ACCEPTED`, `STARTED`, `COMPLETED`

Conflict response from step 3:

```json
{ "error": "Job already taken" }
```
