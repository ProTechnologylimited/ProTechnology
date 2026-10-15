import Link from "next/link";
import { Suspense } from "react";
import { AuthForm } from "@/components/AuthForm";
export const metadata = { title: "Log in", robots: { index: false } };
export default function Page() { return <div className="mx-auto max-w-md px-4 py-16"><h1 className="mb-6 text-2xl font-semibold">Log in</h1><Suspense><AuthForm mode="login" /></Suspense><p className="mt-6 text-sm text-muted"><Link href="/register">Create account</Link> · <Link href="/forgot-password">Forgot password?</Link></p></div>; }
