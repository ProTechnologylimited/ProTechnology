import Link from "next/link";
import { ButtonLink, Card, Section, Faq } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
import { services, faqs, company, whatsappUrl, productCategories } from "@/lib/content";
import { getPlans, formatMoney } from "@/lib/plans";
export const dynamic = "force-dynamic";
export default async function Home() {
  const { plans } = await getPlans();
  return <>
    <section className="mx-auto max-w-6xl px-4 pb-10 pt-20 sm:px-6">
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">Build Smarter. Automate Better. Grow Faster.</h1>
      <p className="mt-5 max-w-2xl text-muted">ProTechnology Limited helps businesses streamline operations, automate workflows, strengthen digital marketing, and build modern digital products through AI-powered solutions and professional software development.</p>
      <div className="mt-8 flex flex-wrap gap-3"><ButtonLink href="/register">Get Started</ButtonLink><ButtonLink href="/services" variant="secondary">Explore Our Solutions</ButtonLink>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-lg border border-line px-5 py-2.5 text-sm hover:bg-surface">Chat on WhatsApp</a></div></section>
    <Section eyebrow="Services" title="What we do"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s) => <Link key={s.slug} href={`/services/${s.slug}`}><Card className="h-full transition-colors hover:border-accent"><h3 className="font-medium">{s.name}</h3><p className="mt-2 text-sm text-muted">{s.summary}</p></Card></Link>)}</div></Section>
    <Section eyebrow="Product" title="Nexus AI"><Card><p className="max-w-2xl text-muted">Nexus AI is a ProTechnology business automation product aimed at organising workflows around prospect research, marketing campaigns, follow-up communications and operations.</p>
      <div className="mt-4"><ButtonLink href="/nexus-ai" variant="secondary">Learn more</ButtonLink></div></Card></Section>
    <Section eyebrow="Marketplace" title="Digital products"><p className="mb-4 max-w-2xl text-muted">Prompts, templates and toolkits for businesses and developers.</p>
      <div className="mb-4 flex flex-wrap gap-2">{productCategories.map((c) => <span key={c} className="rounded-full border border-line px-3 py-1 text-xs text-muted">{c}</span>)}</div><ButtonLink href="/products" variant="secondary">Browse products</ButtonLink></Section>
    <Section eyebrow="How it works" title="Working with ProTechnology"><ol className="grid gap-4 sm:grid-cols-4">
      {["Tell us what you need", "We scope and quote", "We build and review with you", "Launch and ongoing support"].map((t, i) => <li key={t}><Card><p className="text-sm text-accent">Step {i + 1}</p><p className="mt-1 font-medium">{t}</p></Card></li>)}</ol></Section>
    <Section eyebrow="Pricing" title="Subscription plans"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {plans.map((p) => <Card key={p.slug}><h3 className="font-medium">{p.name}</h3><p className="mt-2 text-2xl font-semibold">{p.amount_minor == null ? "Custom" : formatMoney(p.amount_minor, p.currency)}<span className="text-sm font-normal text-muted">{p.amount_minor == null ? "" : "/mo"}</span></p></Card>)}</div>
      <div className="mt-4"><ButtonLink href="/pricing" variant="secondary">Compare plans</ButtonLink></div></Section>
    <Section title="Frequently asked questions"><Faq items={faqs} /></Section>
    <Section eyebrow="Contact" title="Talk to us"><p className="mb-6 text-sm text-muted">{company.email} · {company.address}</p><ContactForm /></Section></>;
}
