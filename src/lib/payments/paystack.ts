import { createHmac, timingSafeEqual } from "node:crypto";
import type { PaymentProvider } from "./types";

const BASE = "https://api.paystack.co";
function secret(): string {
  const k = process.env.PAYSTACK_SECRET_KEY;
  if (!k) throw new Error("PAYSTACK_NOT_CONFIGURED");
  return k;
}
const headers = () => ({ Authorization: `Bearer ${secret()}`, "Content-Type": "application/json" });

export const paystack: PaymentProvider = {
  name: "paystack",
  async initialize(p) {
    const r = await fetch(`${BASE}/transaction/initialize`, {
      method: "POST", headers: headers(),
      body: JSON.stringify({ email: p.email, amount: p.amountMinor, currency: p.currency, reference: p.reference, callback_url: p.callbackUrl }),
    });
    const j = await r.json();
    if (!r.ok || !j.status) throw new Error("PAYMENT_INIT_FAILED");
    return { authorizationUrl: j.data.authorization_url };
  },
  async verify(reference) {
    const r = await fetch(`${BASE}/transaction/verify/${encodeURIComponent(reference)}`, { headers: headers() });
    const j = await r.json();
    if (!r.ok || !j.status) throw new Error("PAYMENT_VERIFY_FAILED");
    return { ok: j.data.status === "success", reference: j.data.reference, amountMinor: j.data.amount, currency: j.data.currency };
  },
  verifyWebhookSignature(rawBody, signature) {
    if (!signature) return false;
    const expected = createHmac("sha512", secret()).update(rawBody).digest("hex");
    const a = Buffer.from(expected), b = Buffer.from(signature);
    return a.length === b.length && timingSafeEqual(a, b);
  },
};
