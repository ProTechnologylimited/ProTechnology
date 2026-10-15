import { supabaseServer, requireUser } from "@/lib/supabase/server";
export default async function Subs() {
  const user = await requireUser(); const db = await supabaseServer();
  const { data } = await db.from("subscriptions").select("id,status,current_period_end,cancel_at_period_end,pricing_plans(name)").eq("user_id", user.id).order("created_at", { ascending: false });
  return <div><h1 className="text-2xl font-semibold">Subscriptions</h1>{!data?.length ? <p className="mt-4 text-muted">You have no subscriptions yet.</p> :
    <ul className="mt-4 divide-y divide-line rounded-xl border border-line">{data.map((s: any) => <li key={s.id} className="p-4 text-sm"><span className="font-medium">{s.pricing_plans?.name}</span> · {s.status}
      {s.current_period_end && <span className="text-muted"> · {s.cancel_at_period_end ? "access until" : "renews"} {new Date(s.current_period_end).toLocaleDateString()}</span>}</li>)}</ul>}</div>;
}
