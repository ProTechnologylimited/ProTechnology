import Link from "next/link";
import { company, whatsappUrl } from "@/lib/content";
import { Logo } from "./ui";
export function Footer() {
  return <footer className="mt-10 border-t border-line"><div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm text-muted sm:grid-cols-3 sm:px-6">
    <div><Logo /><p className="mt-3">{company.name}</p><p className="mt-1">{company.address}</p></div>
    <div><p className="mb-2 font-medium text-fg">Contact</p><p><a href={`mailto:${company.email}`}>{company.email}</a></p>
      <p className="mt-1"><a href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp {company.whatsappDisplay}</a></p></div>
    <div><p className="mb-2 font-medium text-fg">Company</p><ul className="space-y-1"><li><Link href="/about">About</Link></li><li><Link href="/privacy">Privacy</Link></li><li><Link href="/terms">Terms</Link></li></ul></div>
  </div><p className="pb-8 text-center text-xs text-muted">© {new Date().getFullYear()} {company.name}</p></footer>;
}
