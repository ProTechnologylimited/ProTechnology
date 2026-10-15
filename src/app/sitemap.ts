import type { MetadataRoute } from "next";
import { services } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const paths = ["", "/about", "/services", "/products", "/nexus-ai", "/pricing", "/investors", "/contact", ...services.map((s) => `/services/${s.slug}`)];
  return paths.map((p) => ({ url: `${base}${p}` }));
}
