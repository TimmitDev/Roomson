import Link from "next/link";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

const errorText: Record<string, string> = {
  invalid_credentials: "Incorrect email or password.",
  invalid_data: "Please check your input.",
};

const inputClassName =
  "mt-1.5 w-full rounded-lg border border-[#2C3A55] bg-[#0A1222] px-3 py-2.5 text-[#E7EEF8] placeholder:text-[#6C7E9E] outline-none transition focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/20";

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const error = params.error;

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-[#243047] bg-[#111827] p-7 shadow-[0_24px_55px_-24px_rgba(0,0,0,0.9)]">
        <p className="inline-flex rounded-full border border-[#2C3A55] bg-[#0A1222] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#E7EEF8]">
          Roomson
        </p>
        <h1 className="mt-4 text-2xl font-semibold text-white">Welcome back</h1>
        <p className="mt-1.5 text-sm text-[#97A6BE]">Sign in to continue.</p>

        {error ? (
          <p className="mt-5 rounded-lg border border-red-800 bg-red-950/40 px-3 py-2 text-sm text-red-200">
            {errorText[error] ?? "Something went wrong."}
          </p>
        ) : null}

        <form className="mt-6 space-y-4" action="/api/auth/login" method="POST">
          <label className="block text-sm font-medium text-[#E7EEF8]">
            Email
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              className={inputClassName}
            />
          </label>

          <label className="block text-sm font-medium text-[#E7EEF8]">
            Password
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              minLength={8}
              required
              className={inputClassName}
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#14B8A6] px-3 py-2.5 text-sm font-semibold text-[#04110F] transition hover:bg-[#0D9488]"
          >
            Login
          </button>
        </form>

        <p className="mt-6 border-t border-[#243047] pt-4 text-sm text-[#97A6BE]">
          No account?{" "}
          <Link href="/register" className="font-semibold text-[#F59E0B] hover:underline">
            Register
          </Link>
        </p>
      </section>
    </main>
  );
}
