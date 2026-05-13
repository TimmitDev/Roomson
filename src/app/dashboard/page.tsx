import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-10 text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8rem] top-[-8rem] h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-[-10rem] right-[-6rem] h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-4xl rounded-3xl border border-white/10 bg-white/10 p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-lg md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-cyan-200">Dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold">Welkom, {user.name}</h1>
            <p className="mt-2 text-sm text-slate-300">
              Dit is je lege startdashboard. Je bent succesvol ingelogd.
            </p>
          </div>

          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="rounded-xl border border-white/20 bg-black/20 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-200 hover:text-cyan-100"
            >
              Log out
            </button>
          </form>
        </div>

        <section className="mt-8 rounded-2xl border border-dashed border-white/20 p-8">
          <p className="text-sm text-slate-300">Leeg dashboard. Klaar om je eerste widgets toe te voegen.</p>
        </section>
      </div>
    </main>
  );
}
