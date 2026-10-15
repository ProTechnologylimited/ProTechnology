import Link from "next/link";
import type { ReactNode } from "react";
export function Logo() { // Typographic placeholder: replace with the official logo asset when supplied.
  return <span className="text-lg font-semibold tracking-tight">Pro<span className="text-accent">Tech</span></span>;
}
export function ButtonLink({ href, children, variant = "primary" }: { href: string; children: ReactNode; variant?: "primary" | "secondary" }) {
  const base = "inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium transition-colors";
  const style = variant === "primary" ? "bg-accent text-white hover:bg-accent/90" : "border border-line text-fg hover:bg-surface";
  return <Link href={href} className={`${base} ${style}`}>{children}</Link>;
}
export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-line bg-surface p-6 ${className}`}>{children}</div>;
}
export function Section({ title, eyebrow, children }: { title?: string; eyebrow?: string; children: ReactNode }) {
  return <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
    {eyebrow && <p className="mb-2 text-xs font-medium uppercase tracking-widest text-accent">{eyebrow}</p>}
    {title && <h2 className="mb-8 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>}{children}</section>;
}
export function PageHero({ title, text }: { title: string; text: string }) {
  return <header className="mx-auto max-w-6xl px-4 pb-4 pt-16 sm:px-6"><h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
    <p className="mt-4 max-w-2xl text-muted">{text}</p></header>;
}
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return <div className="divide-y divide-line rounded-xl border border-line">{items.map((f) =>
    <details key={f.q} className="group p-4"><summary className="cursor-pointer font-medium">{f.q}</summary><p className="mt-2 text-sm text-muted">{f.a}</p></details>)}</div>;
}
