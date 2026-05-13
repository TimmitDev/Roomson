# Roomson Auth Starter

Moderne auth starter met:
- Next.js (App Router)
- Tailwind CSS
- Prisma + PostgreSQL
- Login, Register, Dashboard en Logout

## 1. Setup

Installeer dependencies:

```bash
npm install
```

Maak je env bestand:

```bash
cp .env.example .env
```

## 2. Database (snel lokaal, zonder Docker)

Start lokale Prisma Postgres:

```bash
npx prisma dev -d --name roomson
```

Zet daarna in `.env`:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:<DB_PORT>/roomson?sslmode=disable&pgbouncer=true"
AUTH_SECRET="een-lange-random-secret-van-minimaal-32-tekens"
```

Tip: de juiste poorten zie je met:

```bash
npx prisma dev ls
```

## 3. Schema sync

```bash
npm run prisma:push
```

## 4. Starten

```bash
npm run dev
```

Open `http://localhost:3000`.

## Routes

- `/login`
- `/register`
- `/dashboard` (protected)
- `POST /api/auth/logout`

## Productie

Gebruik in productie een beheerde PostgreSQL (bijv. Neon, Supabase, RDS, PlanetScale Postgres) en zet daar je `DATABASE_URL` op.
