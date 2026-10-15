import { describe, it, expect, beforeAll } from "vitest";
import { createHmac } from "node:crypto";
beforeAll(() => { process.env.PAYSTACK_SECRET_KEY = "sk_test_placeholder"; });
describe("paystack webhook signature", () => {
  const body = JSON.stringify({ event: "charge.success", data: { id: 1, reference: "r1" } });
  const sig = () => createHmac("sha512", "sk_test_placeholder").update(body).digest("hex");
  it("accepts a correct signature", async () => { const { paystack } = await import("@/lib/payments/paystack"); expect(paystack.verifyWebhookSignature(body, sig())).toBe(true); });
  it("rejects a tampered body", async () => { const { paystack } = await import("@/lib/payments/paystack"); expect(paystack.verifyWebhookSignature(body + " ", sig())).toBe(false); });
  it("rejects a missing signature", async () => { const { paystack } = await import("@/lib/payments/paystack"); expect(paystack.verifyWebhookSignature(body, null)).toBe(false); });
});
