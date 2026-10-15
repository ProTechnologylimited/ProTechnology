import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero, Section, Card, Faq } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
import { services } from "@/lib/content";
export function generateStaticParams() { return services.map((s) => ({ slug: s.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const s = services.find((x) => x.slug === slug); return s ? { title: s.name, description: s.summary, alternates: { canonical: `/services/${s.slug}` } } : {};
}
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const s = services.find((x) => x.slug === slug); if (!s) notFound();
  return <><PageHero title={s.name} text={s.summary} /><Section><div className="grid gap-4 sm:grid-cols-2">
    <Card><h2 className="font-medium">The problem</h2><p className="mt-2 text-sm text-muted">{s.problem}</p></Card>
    <Card><h2 className="font-medium">Who it is for</h2><p className="mt-2 text-sm text-muted">{s.customer}</p></Card>
    <Card><h2 className="font-medium">Deliverables</h2><ul className="mt-2 list-disc pl-5 text-sm text-muted">{s.deliverables.map((d) => <li key={d}>{d}</li>)}</ul></Card>
    <Card><h2 className="font-medium">How we work</h2><ol className="mt-2 list-decimal pl-5 text-sm text-muted">{s.process.map((d) => <li key={d}>{d}</li>)}</ol></Card>
    <Card><h2 className="font-medium">Expected outcomes</h2><p className="mt-2 text-sm text-muted">{s.outcomes}</p></Card>
    <Card><h2 className="font-medium">Pricing approach</h2><p className="mt-2 text-sm text-muted">{s.pricing}</p></Card></div></Section>
    <Section title="FAQs"><Faq items={s.faqs} /></Section>
    <Section title="Enquire about this service"><ContactForm defaultService={s.name} defaultSubject={`Enquiry: ${s.name}`} /></Section></>;
}
