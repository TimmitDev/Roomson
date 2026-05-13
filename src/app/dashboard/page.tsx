import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <section className="w-full max-w-xl rounded-xl border border-[#243047] bg-[#111827] p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
            <p className="mt-1 text-sm text-[#97A6BE]">Logged in as {user.email}</p>
          </div>

          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="rounded-md border border-[#2C3A55] px-3 py-2 text-sm font-medium text-[#E7EEF8] hover:bg-[#1B2438]"
            >
              Log out
            </button>
          </form>
        </div>

        <div className="mt-6 rounded-md border border-dashed border-[#2C3A55] p-6 text-sm text-[#97A6BE]">
          Empty dashboard.
        </div>
      </section>
    </main>
  );
}
