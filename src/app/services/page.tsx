import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, Card } from "@/components/ui";
import { services } from "@/lib/content";
export const metadata: Metadata = { title: "Services", alternates: { canonical: "/services" } };
export default function Services() {
  return <><PageHero title="Services" text="AI, automation and software services for growing businesses." />
    <Section><div className="grid gap-4 sm:grid-cols-2">{services.map((s) => <Link key={s.slug} href={`/services/${s.slug}`}><Card className="h-full hover:border-accent"><h2 className="font-medium">{s.name}</h2><p className="mt-2 text-sm text-muted">{s.summary}</p></Card></Link>)}</div></Section></>;
}
