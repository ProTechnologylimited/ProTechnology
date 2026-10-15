import { supabaseServer } from "@/lib/supabase/server";
export interface Plan { slug: string; name: string; description: string; amount_minor: number | null; currency: string; billing_interval: string; features: string[] }
export const examplePlans: Plan[] = [
  { slug: "starter", name: "Starter", description: "Small businesses beginning with AI tools and basic automation resources.", amount_minor: 2900, currency: "USD", billing_interval: "monthly", features: [] },
  { slug: "growth", name: "Growth", description: "Ongoing automation resources and agreed support.", amount_minor: 9900, currency: "USD", billing_interval: "monthly", features: [] },
  { slug: "professional", name: "Professional", description: "More advanced automation services and implementation.", amount_minor: 29900, currency: "USD", billing_interval: "monthly", features: [] },
  { slug: "enterprise", name: "Enterprise", description: "Customised workflows, integrations or service agreements.", amount_minor: null, currency: "USD", billing_interval: "custom", features: [] },
];
export function formatMoney(minor: number, currency: string) { return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(minor / 100); }
/** Plans from the database when configured; otherwise clearly-flagged example plans. */
export async function getPlans(): Promise<{ plans: Plan[]; fromDatabase: boolean }> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return { plans: examplePlans, fromDatabase: false };
  try {
    const db = await supabaseServer();
    const { data } = await db.from("pricing_plans").select("slug,name,description,amount_minor,currency,billing_interval,plan_features(label)").eq("is_active", true).order("display_order");
    if (!data?.length) return { plans: examplePlans, fromDatabase: false };
    return { fromDatabase: true, plans: data.map((p: any) => ({ ...p, features: (p.plan_features ?? []).map((f: any) => f.label) })) };
  } catch { return { plans: examplePlans, fromDatabase: false }; }
}
