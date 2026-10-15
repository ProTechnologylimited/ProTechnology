import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validation";
import { supabaseAdmin } from "@/lib/supabase-admin";
export const runtime = "nodejs";
// Best-effort per-instance limiter. For production use a shared store (e.g. Upstash/Redis) or Vercel firewall rules.
const hits = new Map<string, number[]>();
function limited(ip: string) { const now = Date.now(); const recent = (hits.get(ip) ?? []).filter((t) => now - t < 600_000); recent.push(now); hits.set(ip, recent); return recent.length > 5; }
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  const parsed = enquirySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Please check the form fields and try again." }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ ok: true }); // honeypot tripped: pretend success, store nothing
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY)
    return NextResponse.json({ error: "Enquiries are temporarily unavailable. Please email us directly." }, { status: 503 });
  const { website: _h, ...row } = parsed.data;
  const { error } = await supabaseAdmin().from("enquiries").insert(row);
  if (error) return NextResponse.json({ error: "We could not save your enquiry. Please try again." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
