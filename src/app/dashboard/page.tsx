import { Card } from "@/components/ui";
import { requireUser, supabaseServer } from "@/lib/supabase/server";
export default async function Overview() {
  const user = await requireUser(); const db = await supabaseServer(); // RLS limits every query below to this user's rows
  const [{ data: profile }, { count: active }, { count: txns }] = await Promise.all([
    db.from("profiles").select("full_name").eq("id", user.id).maybeSingle(),
    db.from("subscriptions").select("id", { count: "exact", head: true }).eq("status", "active"),
    db.from("payment_transactions").select("id", { count: "exact", head: true }).eq("status", "succeeded")]);
  return <div><h1 className="text-2xl font-semibold">Welcome{profile?.full_name ? `, ${profile.full_name}` : ""}</h1>
    <div className="mt-6 grid gap-4 sm:grid-cols-2"><Card><p className="text-sm text-muted">Active subscriptions</p><p className="text-3xl font-semibold">{active ?? 0}</p></Card>
      <Card><p className="text-sm text-muted">Successful payments</p><p className="text-3xl font-semibold">{txns ?? 0}</p></Card></div>
    <p className="mt-6 text-sm text-muted">Projects, support tickets and notifications are not yet available in this release.</p></div>;
}
