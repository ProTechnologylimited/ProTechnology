import Link from "next/link";
import { Suspense } from "react";
import { AuthForm } from "@/components/AuthForm";
export const metadata = { title: "Reset your password", robots: { index: false } };
export default function Page() { return <div className="mx-auto max-w-md px-4 py-16"><h1 className="mb-6 text-2xl font-semibold">Reset your password</h1><Suspense><AuthForm mode="forgot" /></Suspense><p className="mt-6 text-sm text-muted"><Link href="/login">Back to log in</Link></p></div>; }
