import Link from "next/link";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";

const ERROR_MESSAGES: Record<string, string> = {
  email_exists: "Dit e-mailadres is al in gebruik.",
  invalid_data: "Controleer je gegevens en probeer opnieuw.",
};

type RegisterPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const error = params.error;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10 text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-cyan-500/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-lg">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-200">Roomson</p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight">Create account</h1>
        <p className="mt-2 text-sm text-slate-300">
          Maak je account aan en start direct op je dashboard.
        </p>

        {error ? (
          <div className="mt-5 rounded-xl border border-rose-300/30 bg-rose-500/20 px-4 py-3 text-sm text-rose-100">
            {ERROR_MESSAGES[error] ?? "Er ging iets mis. Probeer opnieuw."}
          </div>
        ) : null}

        <form className="mt-6 space-y-4" action="/api/auth/register" method="POST">
          <label className="block text-sm font-medium text-slate-200">
            Naam
            <input
              name="name"
              type="text"
              required
              minLength={2}
              maxLength={60}
              autoComplete="name"
              className="mt-1.5 w-full rounded-xl border border-white/20 bg-black/20 px-4 py-3 text-slate-50 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/40"
              placeholder="Jouw naam"
            />
          </label>

          <label className="block text-sm font-medium text-slate-200">
            E-mail
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-1.5 w-full rounded-xl border border-white/20 bg-black/20 px-4 py-3 text-slate-50 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/40"
              placeholder="jij@voorbeeld.com"
            />
          </label>

          <label className="block text-sm font-medium text-slate-200">
            Wachtwoord
            <input
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className="mt-1.5 w-full rounded-xl border border-white/20 bg-black/20 px-4 py-3 text-slate-50 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/40"
              placeholder="Minimaal 8 tekens"
            />
          </label>

          <label className="block text-sm font-medium text-slate-200">
            Herhaal wachtwoord
            <input
              name="confirmPassword"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className="mt-1.5 w-full rounded-xl border border-white/20 bg-black/20 px-4 py-3 text-slate-50 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/40"
              placeholder="Nogmaals je wachtwoord"
            />
          </label>

          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            Account aanmaken
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-300">
          Al een account?{" "}
          <Link href="/login" className="font-semibold text-cyan-200 hover:text-cyan-100">
            Inloggen
          </Link>
        </p>
      </div>
    </main>
  );
}
