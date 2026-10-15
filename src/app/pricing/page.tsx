import type { Metadata } from "next";
import { PageHero, Section, Card, ButtonLink } from "@/components/ui";
import { getPlans, formatMoney } from "@/lib/plans";
export const metadata: Metadata = { title: "Pricing", alternates: { canonical: "/pricing" } };
export const dynamic = "force-dynamic";
export default async function Pricing() {
  const { plans, fromDatabase } = await getPlans();
  return <><PageHero title="Pricing" text="Recurring managed plans, self-service digital products, and custom enterprise projects. Prices shown are starting prices, not guaranteed final prices." />
    <Section>{!fromDatabase && <p role="note" className="mb-4 rounded-lg border border-line p-3 text-sm text-muted">Example plans shown. Live plans appear here once the database is connected and plans are published by an administrator.</p>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{plans.map((p) => <Card key={p.slug}><h2 className="font-medium">{p.name}</h2>
        <p className="mt-2 text-3xl font-semibold">{p.amount_minor == null ? "Custom" : formatMoney(p.amount_minor, p.currency)}</p><p className="text-xs text-muted">{p.billing_interval === "custom" ? "Agreed per contract" : `Billed ${p.billing_interval}`}</p>
        <p className="mt-3 text-sm text-muted">{p.description}</p>
        {p.features.length > 0 && <ul className="mt-3 list-disc pl-5 text-sm text-muted">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>}
        <div className="mt-4"><ButtonLink href={p.amount_minor == null ? "/contact" : "/register"} variant="secondary">{p.amount_minor == null ? "Contact us" : "Get started"}</ButtonLink></div></Card>)}</div>
      <p className="mt-6 text-sm text-muted">Plans do not include unlimited AI usage or unlimited implementation work. Included deliverables and limits are defined per plan. Online checkout is not yet enabled.</p></Section></>;
}
