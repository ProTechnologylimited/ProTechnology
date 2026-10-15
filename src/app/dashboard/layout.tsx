import Link from "next/link";
import { requireUser } from "@/lib/supabase/server";
export const metadata = { robots: { index: false } };
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await requireUser();
  return <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[200px_1fr]">
    <aside><nav aria-label="Dashboard" className="space-y-1 text-sm"><Link className="block rounded px-3 py-2 hover:bg-surface" href="/dashboard">Overview</Link>
      <Link className="block rounded px-3 py-2 hover:bg-surface" href="/dashboard/subscriptions">Subscriptions</Link><Link className="block rounded px-3 py-2 hover:bg-surface" href="/dashboard/billing">Billing</Link>
      <form action="/auth/signout" method="post"><button className="w-full rounded px-3 py-2 text-left text-muted hover:bg-surface">Log out</button></form></nav></aside><div>{children}</div></div>;
}
