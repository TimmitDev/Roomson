# Roomson Auth

Simple real-world auth starter with:
- Next.js App Router
- Prisma
- PostgreSQL
- Login / Register / Protected Dashboard

## 1. Install

```bash
npm install
```

## 2. Environment

```bash
cp .env.example .env
```

Set these values in `.env`:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DBNAME?schema=public"
AUTH_SECRET="set-a-random-secret-of-at-least-32-characters"
```

## 3. Database

```bash
npm run prisma:push
```

## 4. Run

```bash
npm run dev
```

Open `http://localhost:3000`.
You will always be redirected to `/login` first.
