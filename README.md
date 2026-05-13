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

Vul in `.env` minimaal:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DBNAME?schema=public"
AUTH_SECRET="een-lange-random-secret-van-minimaal-32-tekens"
```

## 2. Prisma

Maak de migratie en genereer client:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

## 3. Starten

```bash
npm run dev
```

Open `http://localhost:3000`.

## Routes

- `/login`
- `/register`
- `/dashboard` (protected)
- `POST /api/auth/logout`

## Veiligheid

- Wachtwoorden zijn gehashed met `bcryptjs`.
- Sessies draaien via signed JWT in `httpOnly` cookie.
- `AUTH_SECRET` moet in productie sterk en uniek zijn.
