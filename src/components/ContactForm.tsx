"use client";
import { useState } from "react";
import { services } from "@/lib/content";
export function ContactForm({ defaultSubject = "", defaultService = "" }: { defaultSubject?: string; defaultService?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setState("sending");
    const f = new FormData(e.currentTarget);
    const body = { ...Object.fromEntries(f), consent: f.get("consent") === "on" };
    const r = await fetch("/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const j = await r.json().catch(() => ({}));
    if (r.ok) { setState("done"); setMsg("Thank you. We have received your enquiry and will reply by email."); } else { setState("error"); setMsg(j.error ?? "Something went wrong. Please try again or email us."); }
  }
  if (state === "done") return <p role="status" className="rounded-xl border border-line bg-surface p-6">{msg}</p>;
  return <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
    <label className="text-sm">Name<input name="name" required minLength={2} className="field mt-1" autoComplete="name" /></label>
    <label className="text-sm">Email<input name="email" type="email" required className="field mt-1" autoComplete="email" /></label>
    <label className="text-sm">Company<input name="company" className="field mt-1" autoComplete="organization" /></label>
    <label className="text-sm">Service of interest<select name="service_of_interest" defaultValue={defaultService} className="field mt-1"><option value="">Select…</option>
      {services.map((s) => <option key={s.slug} value={s.name}>{s.name}</option>)}<option value="Nexus AI">Nexus AI</option><option value="Investment / partnership">Investment / partnership</option></select></label>
    <label className="text-sm sm:col-span-2">Subject<input name="subject" required minLength={3} defaultValue={defaultSubject} className="field mt-1" /></label>
    <label className="text-sm sm:col-span-2">Message<textarea name="message" required minLength={10} rows={5} className="field mt-1" /></label>
    <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
    <label className="flex items-start gap-2 text-sm text-muted sm:col-span-2"><input name="consent" type="checkbox" required className="mt-1" />I agree that ProTechnology Limited may contact me about this enquiry.</label>
    <div className="sm:col-span-2"><button disabled={state === "sending"} className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60">{state === "sending" ? "Sending…" : "Send enquiry"}</button>
      {state === "error" && <p role="alert" className="mt-3 text-sm text-red-400">{msg}</p>}</div></form>;
}
