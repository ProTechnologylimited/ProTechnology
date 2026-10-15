import { describe, it, expect } from "vitest";
import { enquirySchema } from "@/lib/validation";
const ok = { name: "Ada Obi", email: "ada@example.com", subject: "Hello", message: "I need an automation quote.", consent: true };
describe("enquirySchema", () => {
  it("accepts a valid enquiry", () => expect(enquirySchema.safeParse(ok).success).toBe(true));
  it("rejects missing consent", () => expect(enquirySchema.safeParse({ ...ok, consent: false }).success).toBe(false));
  it("rejects bad email", () => expect(enquirySchema.safeParse({ ...ok, email: "nope" }).success).toBe(false));
  it("rejects filled honeypot", () => expect(enquirySchema.safeParse({ ...ok, website: "spam" }).success).toBe(false));
});
