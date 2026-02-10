# ReliServe

<<<<<<< Updated upstream
**Reliability-first local services marketplace**  
Built for urgency, accountability, and real-world trust.

---

##  Overview

ReliServe is a team-built web application that rethinks local service marketplaces by prioritizing **reliability over star ratings** and handling **emergency service requests** intelligently.

Unlike traditional platforms that rely on inflated reviews, ReliServe introduces:
- Behavior-based reliability scoring
- Mutual accountability for customers and workers
- Emergency-first matching with lock-on-accept logic
- AI-assisted job clarity to prevent disputes and cancellations

This project is being developed as a **collaborative, production-style system** by a student engineering team.

---

##  Core Goals

- Reduce job cancellations and no-shows
- Improve emergency response times
- Reward consistent, reliable behavior
- Prevent disputes before they happen
- Simulate real-world marketplace constraints

---

##  Key Features (V1)

### Customer
- Post normal or emergency service requests
- AI-assisted job clarification & scope locking
- Fair price range suggestions
- Live job tracking
- Reliability score visibility

### Worker
- Worker onboarding & availability control
- Emergency opt-in
- Job requests ranked by fit and reliability
- Locked job scope to prevent disputes

### Platform
- Reliability score (behavior-based, not ratings)
- Emergency job prioritization
- Map-based matching (placeholder in V1)
- Mutual accountability system

---

##  Tech Stack

### Frontend
- React (TypeScript)
- Vite
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express
- TypeScript
- REST APIs

### Infrastructure
- PostgreSQL (Docker)
- Redis (Docker)
- Docker Compose

>  Note: V1 currently uses mocked data for UI-first development.  
> Backend wiring and realtime features are added incrementally.

---

##  Repository Structure

```txt
reliserv/
  apps/
    web/        # Frontend (React)
    api/        # Backend (Node + Express)
  infra/        # Docker (Postgres, Redis)
  docs/         # Architecture & sprint notes
=======
## Prerequisites
- Node.js 20+ and npm
- Docker Desktop (WSL2 backend on Windows)
- Git

## Run locally (5 minutes)

### 1) Infra (Postgres + Redis)
```powershell
docker compose -f infra/docker-compose.yml up -d
```

### 2) API
```powershell
cd apps/api
cp .env.example .env
npm install
npm run dev
```

### 2.1) Prisma (DB schema + seed)
```powershell
cd apps/api
# Ensure DATABASE_URL is set in .env
# DATABASE_URL="postgresql://reliserv:reliserv@localhost:5432/reliserv?schema=public"
npx prisma migrate dev --name init_v1
npx prisma db seed
```

### 3) Web
```powershell
cd apps/web
cp .env.example .env
npm install
npm run dev
```

Open:
- `http://localhost:5173`
- `http://localhost:4000/health`

## Notes
- `.env` files are ignored by git. Do not commit secrets.
- Stop infra with:
```powershell
docker compose -f infra/docker-compose.yml down
```
- Prisma 7 uses a driver adapter; this repo is configured with `@prisma/adapter-pg` and `pg`.

## Windows + Docker Desktop Troubleshooting
If Docker Desktop won’t start:
- Check WSL status:
```powershell
wsl --status
```
- If WSL is missing:
```powershell
wsl --install
```
  Then reboot.
- Ensure Hyper-V and CPU virtualization are enabled in BIOS.
>>>>>>> Stashed changes
