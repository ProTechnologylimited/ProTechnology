import { supabaseServer, requireUser } from "@/lib/supabase/server";
import { formatMoney } from "@/lib/plans";
export default async function Billing() {
  const user = await requireUser(); const db = await supabaseServer();
  const { data } = await db.from("payment_transactions").select("id,reference,amount_minor,currency,status,created_at").eq("user_id", user.id).order("created_at", { ascending: false });
  return <div><h1 className="text-2xl font-semibold">Billing</h1>{!data?.length ? <p className="mt-4 text-muted">No transactions yet.</p> :
    <ul className="mt-4 divide-y divide-line rounded-xl border border-line">{data.map((t) => <li key={t.id} className="flex justify-between p-4 text-sm"><span>{new Date(t.created_at).toLocaleDateString()} · {t.status}</span><span>{formatMoney(t.amount_minor, t.currency)}</span></li>)}</ul>}</div>;
}
