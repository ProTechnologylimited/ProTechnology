import Link from "next/link";
import { Suspense } from "react";
import { AuthForm } from "@/components/AuthForm";
export const metadata = { title: "Create your account", robots: { index: false } };
export default function Page() { return <div className="mx-auto max-w-md px-4 py-16"><h1 className="mb-6 text-2xl font-semibold">Create your account</h1><Suspense><AuthForm mode="register" /></Suspense><p className="mt-6 text-sm text-muted">Already registered? <Link href="/login">Log in</Link></p></div>; }
