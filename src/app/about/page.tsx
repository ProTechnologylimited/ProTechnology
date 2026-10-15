import type { Metadata } from "next";
import { PageHero, Section, Card } from "@/components/ui";
import { company } from "@/lib/content";
export const metadata: Metadata = { title: "About", alternates: { canonical: "/about" } };
const blocks = [["Mission", "To help businesses work more efficiently by combining practical AI tools with professional software development."],
  ["Vision", "To build a scalable technology company serving businesses in Nigeria and around the world."],
  ["Technology approach", "We favour secure, maintainable systems, clear scopes and honest communication about what technology can and cannot do."],
  ["Business focus", "AI automation, marketing automation, web and mobile development, custom software and digital products."]];
export default function About() {
  return <><PageHero title="About ProTechnology Limited" text="A technology company focused on AI, business automation, software development and digital products." />
    <Section><div className="grid gap-4 sm:grid-cols-2">{blocks.map(([t, d]) => <Card key={t}><h2 className="font-medium">{t}</h2><p className="mt-2 text-sm text-muted">{d}</p></Card>)}</div>
      <Card className="mt-4"><h2 className="font-medium">Core values</h2><ul className="mt-2 list-disc pl-5 text-sm text-muted"><li>Reliability</li><li>Security</li><li>Transparency</li><li>Practical innovation</li></ul></Card>
      <p className="mt-6 text-sm text-muted">{company.email} · {company.address}</p></Section></>;
}
