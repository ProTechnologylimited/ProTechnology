import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireRole, supabaseServer } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { enquiryStatuses } from "@/lib/validation";
async function setStatus(fd: FormData) {
  "use server";
  const user = await requireRole(["admin", "staff"]); // re-checked: server actions are public endpoints
  const { id, status } = z.object({ id: z.string().uuid(), status: z.enum(enquiryStatuses) }).parse(Object.fromEntries(fd));
  const db = await supabaseServer(); const { error } = await db.from("enquiries").update({ status }).eq("id", id); if (error) throw new Error("update_failed");
  await supabaseAdmin().from("audit_logs").insert({ actor_id: user.id, action: "enquiry.status_changed", target: id, meta: { status } });
  revalidatePath("/admin/enquiries");
}
export default async function Enquiries() {
  await requireRole(["admin", "staff"]); const db = await supabaseServer();
  const { data } = await db.from("enquiries").select("*").order("created_at", { ascending: false }).limit(100);
  return <div><h1 className="text-2xl font-semibold">Enquiries</h1>{!data?.length ? <p className="mt-4 text-muted">No enquiries yet.</p> :
    <ul className="mt-4 space-y-3">{data.map((e) => <li key={e.id} className="rounded-xl border border-line bg-surface p-4 text-sm">
      <p className="font-medium">{e.subject} <span className="text-muted">· {e.name} · {e.email}{e.company ? ` · ${e.company}` : ""}</span></p><p className="mt-2 whitespace-pre-wrap text-muted">{e.message}</p>
      <form action={setStatus} className="mt-3 flex gap-2"><input type="hidden" name="id" value={e.id} /><select name="status" defaultValue={e.status} className="field max-w-[180px]" aria-label="Status">{enquiryStatuses.map((s) => <option key={s}>{s}</option>)}</select>
        <button className="rounded-lg border border-line px-3 text-sm">Update</button></form></li>)}</ul>}</div>;
}
