import type { Metadata } from "next";
import { PageHero, Section } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
import { company, whatsappUrl } from "@/lib/content";
export const metadata: Metadata = { title: "Contact", alternates: { canonical: "/contact" } };
export default async function Contact({ searchParams }: { searchParams: Promise<{ subject?: string }> }) {
  const { subject = "" } = await searchParams;
  return <><PageHero title="Contact us" text="Tell us what you need and we will reply by email." /><Section>
    <ul className="mb-8 space-y-1 text-sm text-muted"><li>Email: <a href={`mailto:${company.email}`}>{company.email}</a></li>
      <li>WhatsApp: <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">{company.whatsappDisplay}</a></li><li>Office: {company.address}</li></ul>
    <ContactForm defaultSubject={subject.slice(0, 160)} /></Section></>;
}
