import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
export const metadata: Metadata = {
  metadataBase: new URL(base),
  title: { default: "ProTechnology Limited | AI, Automation & Software", template: "%s | ProTechnology Limited" },
  description: "ProTechnology Limited helps businesses streamline operations, automate workflows and build modern digital products.",
  openGraph: { type: "website", siteName: "ProTechnology Limited", title: "ProTechnology Limited" }, alternates: { canonical: "/" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><a href="#main" className="sr-only focus:not-sr-only">Skip to content</a><Nav /><main id="main">{children}</main><Footer /></body></html>;
}
