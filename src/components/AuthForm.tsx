"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/client";
type Mode = "login" | "register" | "forgot" | "reset";
const safeNext = (n: string | null) => (n && n.startsWith("/") && !n.startsWith("//") ? n : "/dashboard");
export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter(); const params = useSearchParams();
  const [err, setErr] = useState(""); const [info, setInfo] = useState(""); const [busy, setBusy] = useState(false);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setErr(""); setInfo(""); setBusy(true);
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const db = supabaseBrowser(); const origin = window.location.origin;
    try {
      if (mode === "login") {
        const { error } = await db.auth.signInWithPassword({ email: f.email, password: f.password });
        if (error) throw error; router.push(safeNext(params.get("next"))); router.refresh();
      } else if (mode === "register") {
        const { error } = await db.auth.signUp({ email: f.email, password: f.password, options: { emailRedirectTo: `${origin}/auth/callback`,
          data: { full_name: f.full_name, country: f.country, business_name: f.business_name, intended_service: f.intended_service } } });
        if (error) throw error; setInfo("Account created. Check your email to verify your address before logging in.");
      } else if (mode === "forgot") {
        const { error } = await db.auth.resetPasswordForEmail(f.email, { redirectTo: `${origin}/auth/callback?next=/reset-password` });
        if (error) throw error; setInfo("If that email has an account, a reset link is on its way.");
      } else {
        const { error } = await db.auth.updateUser({ password: f.password });
        if (error) throw error; setInfo("Password updated. You can now log in."); router.push("/login");
      }
    } catch (x) { setErr(mode === "login" ? "Invalid email or password, or email not yet verified." : (x as Error).message || "Something went wrong."); }
    setBusy(false);
  }
  const L = ({ n, label, type = "text", req = true }: { n: string; label: string; type?: string; req?: boolean }) =>
    <label className="block text-sm">{label}<input name={n} type={type} required={req} minLength={type === "password" ? 10 : undefined} className="field mt-1" autoComplete={type === "password" ? (mode === "login" ? "current-password" : "new-password") : undefined} /></label>;
  return <form onSubmit={onSubmit} className="space-y-4">
    {mode === "register" && <><L n="full_name" label="Full name" /></>}
    {mode !== "reset" && <L n="email" label="Email" type="email" />}
    {mode !== "forgot" && <L n="password" label={mode === "reset" ? "New password (min 10 characters)" : "Password" + (mode === "register" ? " (min 10 characters)" : "")} type="password" />}
    {mode === "register" && <><L n="country" label="Country" /><L n="business_name" label="Business name (optional)" req={false} /><L n="intended_service" label="Intended service (optional)" req={false} /></>}
    <button disabled={busy} className="w-full rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60">{busy ? "Please wait…" : { login: "Log in", register: "Create account", forgot: "Send reset link", reset: "Update password" }[mode]}</button>
    {err && <p role="alert" className="text-sm text-red-400">{err}</p>}{info && <p role="status" className="text-sm text-muted">{info}</p>}</form>;
}
