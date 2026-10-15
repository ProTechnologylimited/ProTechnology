import Link from "next/link";
import { requireRole } from "@/lib/supabase/server";
export const metadata = { robots: { index: false } };
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireRole(["admin", "staff"]); // server-side; non-staff are redirected before anything renders
  return <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[200px_1fr]"><aside><nav aria-label="Admin" className="space-y-1 text-sm">
    <Link className="block rounded px-3 py-2 hover:bg-surface" href="/admin">Overview</Link><Link className="block rounded px-3 py-2 hover:bg-surface" href="/admin/enquiries">Enquiries</Link></nav></aside><div>{children}</div></div>;
}
