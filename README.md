# ReliServe (V1)

## Run locally

### Infra
docker compose -f infra/docker-compose.yml up -d

### API
cd apps/api
cp .env.example .env
npm run dev

### Web
cd apps/web
cp .env.example .env
npm run dev