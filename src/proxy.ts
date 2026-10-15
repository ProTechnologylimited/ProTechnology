import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
type CookieToSet = { name: string; value: string; options?: CookieOptions };
export async function proxy(req: NextRequest) {
  let res = NextResponse.next({ request: req });
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: { getAll: () => req.cookies.getAll(), setAll: (list: CookieToSet[]) => { list.forEach(({ name, value }) => req.cookies.set(name, value)); res = NextResponse.next({ request: req }); list.forEach(({ name, value, options }) => res.cookies.set(name, value, options)); } },
  });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) { const url = req.nextUrl.clone(); url.pathname = "/login"; url.searchParams.set("next", req.nextUrl.pathname); return NextResponse.redirect(url); }
  return res; // role checks happen server-side in layouts via requireRole()
}
export const config = { matcher: ["/dashboard/:path*", "/admin/:path*"] };