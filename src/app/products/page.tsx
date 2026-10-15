import type { Metadata } from "next";
import { PageHero, Section, Card } from "@/components/ui";
import { productCategories } from "@/lib/content";
export const metadata: Metadata = { title: "Products", alternates: { canonical: "/products" } };
const samples = [{ name: "Sample: Customer follow-up prompt pack", category: "AI Prompts" }, { name: "Sample: Lead intake automation template", category: "AI Automation Templates" },
  { name: "Sample: Landing page starter", category: "Website Templates" }];
export default async function Products({ searchParams }: { searchParams: Promise<{ q?: string; category?: string }> }) {
  const { q = "", category = "" } = await searchParams;
  const list = samples.filter((p) => (!category || p.category === category) && p.name.toLowerCase().includes(q.toLowerCase()));
  return <><PageHero title="Digital products" text="Prompts, templates and toolkits. Listings below are clearly labelled samples until real products are published." />
    <Section><form className="mb-6 flex flex-wrap gap-3" role="search"><input name="q" defaultValue={q} placeholder="Search products" aria-label="Search products" className="field max-w-xs" />
      <select name="category" defaultValue={category} aria-label="Category" className="field max-w-xs"><option value="">All categories</option>{productCategories.map((c) => <option key={c}>{c}</option>)}</select>
      <button className="rounded-lg border border-line px-4 text-sm">Filter</button></form>
      {list.length === 0 ? <p className="text-muted">No products match your search.</p> : <div className="grid gap-4 sm:grid-cols-3">{list.map((p) => <Card key={p.name}><p className="text-xs text-accent">{p.category}</p><h2 className="mt-1 font-medium">{p.name}</h2><p className="mt-2 text-sm text-muted">Sample listing. Not for sale.</p></Card>)}</div>}</Section></>;
}
