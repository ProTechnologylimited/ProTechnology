import Link from "next/link";
import { Suspense } from "react";
import { AuthForm } from "@/components/AuthForm";
export const metadata = { title: "Choose a new password", robots: { index: false } };
export default function Page() { return <div className="mx-auto max-w-md px-4 py-16"><h1 className="mb-6 text-2xl font-semibold">Choose a new password</h1><Suspense><AuthForm mode="reset" /></Suspense></div>; }
