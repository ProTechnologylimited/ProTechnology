import Link from "next/link";
import { Logo } from "./ui";
export const navLinks = [["/services", "Services"], ["/products", "Products"], ["/nexus-ai", "Nexus AI"], ["/pricing", "Pricing"], ["/about", "About"], ["/investors", "Investors"], ["/contact", "Contact"]] as const;
export function Nav() {
  return <nav aria-label="Main" className="sticky top-0 z-20 border-b border-line bg-bg/90 backdrop-blur">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
      <Link href="/" aria-label="ProTechnology Limited home"><Logo /></Link>
      <ul className="hidden items-center gap-6 text-sm text-muted md:flex">{navLinks.map(([h, l]) => <li key={h}><Link className="hover:text-fg" href={h}>{l}</Link></li>)}</ul>
      <div className="hidden items-center gap-3 text-sm md:flex"><Link className="text-muted hover:text-fg" href="/login">Log in</Link>
        <Link className="rounded-lg bg-accent px-4 py-2 font-medium text-white" href="/register">Get Started</Link></div>
      <details className="relative md:hidden"><summary className="cursor-pointer list-none rounded-lg border border-line px-3 py-1.5 text-sm">Menu</summary>
        <ul className="absolute right-0 mt-2 w-56 space-y-1 rounded-xl border border-line bg-surface p-3 text-sm">
          {navLinks.map(([h, l]) => <li key={h}><Link className="block rounded px-2 py-2" href={h}>{l}</Link></li>)}
          <li><Link className="block rounded px-2 py-2" href="/login">Log in</Link></li><li><Link className="block rounded bg-accent px-2 py-2 text-white" href="/register">Get Started</Link></li></ul></details>
    </div></nav>;
}
