import { Card } from "@/components/ui";
import { requireRole, supabaseServer } from "@/lib/supabase/server";
import { formatMoney } from "@/lib/plans";
export default async function AdminHome() {
  await requireRole(["admin"]); const db = await supabaseServer(); // RLS also restricts these reads to admins
  const c = (t: string, f?: (q: any) => any) => { const q = db.from(t).select("id", { count: "exact", head: true }); return (f ? f(q) : q).then((r: any) => r.count ?? 0); };
  const [customers, active, newEnq] = await Promise.all([c("profiles"), c("subscriptions", (q) => q.eq("status", "active")), c("enquiries", (q) => q.eq("status", "new"))]);
  const { data: paid } = await db.from("payment_transactions").select("amount_minor,currency").eq("status", "succeeded");
  const rev: Record<string, number> = {}; (paid ?? []).forEach((p) => { rev[p.currency] = (rev[p.currency] ?? 0) + p.amount_minor; });
  const items: [string, string | number, string][] = [["Registered profiles", customers, "Rows in profiles (includes staff/admin)"], ["Active subscriptions", active, "Subscriptions with status active"], ["New enquiries", newEnq, "Enquiries with status new"]];
  return <div><h1 className="text-2xl font-semibold">Overview</h1><div className="mt-6 grid gap-4 sm:grid-cols-3">{items.map(([l, v, d]) => <Card key={l}><p className="text-sm text-muted">{l}</p><p className="text-3xl font-semibold">{v}</p><p className="mt-1 text-xs text-muted">{d}</p></Card>)}</div>
    <Card className="mt-4"><p className="text-sm text-muted">Verified revenue received, all time, by currency</p>{Object.keys(rev).length ? Object.entries(rev).map(([cur, m]) => <p key={cur} className="text-xl font-semibold">{formatMoney(m, cur)}</p>) : <p className="text-muted">No verified payments yet.</p>}</Card></div>;
}
