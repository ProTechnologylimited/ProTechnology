import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export type Role = "customer" | "staff" | "admin";
export async function supabaseServer() {
  const store = await cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: { getAll: () => store.getAll(), setAll: (list) => { try { list.forEach(({ name, value, options }) => store.set(name, value, options)); } catch { /* server component: middleware refreshes */ } } },
  });
}
export async function requireUser() {
  const db = await supabaseServer();
  const { data } = await db.auth.getUser(); // validates the JWT with Supabase; never trust getSession on the server
  if (!data.user) redirect("/login");
  return data.user;
}
/** Server-side role check. Role comes from the user_roles table, never from client input. */
export async function requireRole(allowed: Role[]) {
  const user = await requireUser();
  const db = await supabaseServer();
  const { data } = await db.from("user_roles").select("role").eq("user_id", user.id);
  if (!data?.some((r) => allowed.includes(r.role as Role))) redirect("/dashboard");
  return user;
}
