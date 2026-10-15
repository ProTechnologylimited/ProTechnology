import type { Metadata } from "next";
import { PageHero, Section, Card } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
import { company } from "@/lib/content";
export const metadata: Metadata = { title: "Investors & Partnerships", alternates: { canonical: "/investors" } };
const blocks = [["Company overview", "ProTechnology Limited is a Lagos-based technology company in AI, business automation, software development and digital products."],
  ["Product portfolio", "Automation services, subscription plans, a digital product marketplace and Nexus AI (in development)."],
  ["Business model", "Recurring subscriptions, project-based services and one-time digital product sales."],
  ["Roadmap", "Launch the core platform, open the marketplace, then expand AI-powered products."],
  ["Partnership opportunities", "Technology, distribution, reseller and implementation partnerships."]];
export default function Investors() {
  return <><PageHero title="Investors & Partnerships" text="We do not publish financial statements, valuations or funding commitments here. Detailed materials are shared privately on request." />
    <Section><div className="grid gap-4 sm:grid-cols-2">{blocks.map(([t, d]) => <Card key={t}><h2 className="font-medium">{t}</h2><p className="mt-2 text-sm text-muted">{d}</p></Card>)}</div></Section>
    <Section title="Funding or partnership enquiry"><p className="mb-6 text-sm text-muted">{company.email}</p><ContactForm defaultService="Investment / partnership" defaultSubject="Investment / partnership enquiry" /></Section></>;
}
