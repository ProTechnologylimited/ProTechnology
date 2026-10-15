import { NextResponse } from "next/server";
import { paystack } from "@/lib/payments/paystack";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const raw = await req.text(); // raw body is required for signature check
  if (!process.env.PAYSTACK_SECRET_KEY) return NextResponse.json({ error: "not_configured" }, { status: 503 });
  if (!paystack.verifyWebhookSignature(raw, req.headers.get("x-paystack-signature")))
    return NextResponse.json({ error: "invalid_signature" }, { status: 401 });

  const event = JSON.parse(raw) as { event: string; data: { id?: number; reference?: string } };
  const eventId = `${event.event}:${event.data.id ?? event.data.reference}`;
  const db = supabaseAdmin();

  // Idempotency: unique (provider, event_id). A duplicate insert means we already handled it.
  const { error: dupErr } = await db.from("payment_webhook_events")
    .insert({ provider: "paystack", event_id: eventId, event_type: event.event, payload: event });
  if (dupErr?.code === "23505") return NextResponse.json({ received: true, duplicate: true });
  if (dupErr) return NextResponse.json({ error: "store_failed" }, { status: 500 });

  if (event.event === "charge.success" && event.data.reference) {
    // Never trust the webhook body alone: re-verify with the provider, then match our own record.
    const v = await paystack.verify(event.data.reference);
    const { data: txn } = await db.from("payment_transactions").select("*")
      .eq("provider", "paystack").eq("reference", event.data.reference).maybeSingle();

    if (v.ok && txn && txn.status !== "succeeded" && txn.amount_minor === v.amountMinor && txn.currency === v.currency) {
      await db.from("payment_transactions").update({ status: "succeeded", verified_at: new Date().toISOString() }).eq("id", txn.id);
      if (txn.subscription_id) {
        const end = new Date(); end.setMonth(end.getMonth() + 1); // TODO: use plan interval / provider-supplied period
        await db.from("subscriptions").update({ status: "active", current_period_end: end.toISOString() }).eq("id", txn.subscription_id);
      }
    }
  }
  await db.from("payment_webhook_events").update({ processed_at: new Date().toISOString() })
    .eq("provider", "paystack").eq("event_id", eventId);
  return NextResponse.json({ received: true });
}
