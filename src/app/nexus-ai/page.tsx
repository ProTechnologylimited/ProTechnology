import type { Metadata } from "next";
import { PageHero, Section, Card, ButtonLink } from "@/components/ui";
export const metadata: Metadata = { title: "Nexus AI", alternates: { canonical: "/nexus-ai" } };
const planned = ["Prospect research organisation", "Marketing campaign workflows", "Follow-up communication drafting", "Business operations workflows"];
export default function Nexus() {
  return <><PageHero title="Nexus AI" text="A ProTechnology business automation product for organising selected workflows across prospect research, marketing campaigns, follow-ups and operations." />
    <Section><div className="grid gap-4 sm:grid-cols-2"><Card><h2 className="font-medium">Available now</h2><p className="mt-2 text-sm text-muted">No Nexus AI features are connected to this website yet. Register your interest and we will contact you when access opens.</p></Card>
      <Card><h2 className="font-medium">Planned</h2><ul className="mt-2 list-disc pl-5 text-sm text-muted">{planned.map((p) => <li key={p}>{p}</li>)}</ul></Card></div>
      <p className="mt-4 text-sm text-muted">Any feature that sends messages externally will require explicit customer configuration and recipient consent.</p>
      <div className="mt-6"><ButtonLink href="/contact?subject=Nexus%20AI%20interest">Register interest</ButtonLink></div></Section></>;
}
