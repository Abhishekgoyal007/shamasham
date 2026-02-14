"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

function LoginContent() {
    const { login } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect") || "/";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        const ok = await login(email, password);
        setLoading(false);
        if (ok) router.push(redirect);
        else setError("Invalid email or password. Please try again.");
    };

    return (
        <div className="min-h-screen flex">
            {/* Left — Branding */}
            <div className="hidden lg:flex w-1/2 bg-[var(--foreground)] items-center justify-center p-12 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <Image src="https://images.unsplash.com/photo-1515562141589-67f0d999b7f3?w=1200&q=80&auto=format&fit=crop" alt="" fill className="object-cover" />
                </div>
                <div className="relative z-10 text-center text-white">
                    <div className="relative w-24 h-24 mx-auto mb-6 animate-pulse-slow">
                        <Image src="/logo.png" alt="ShyamaSham" fill className="object-contain brightness-200" />
                    </div>
                    <h2 className="text-4xl font-serif italic mb-3">ShyamaSham</h2>
                    <p className="text-[10px] tracking-[0.5em] uppercase text-[var(--gold)] mb-6">Divine Elegance</p>
                    <p className="text-sm text-white/50 max-w-sm font-light leading-relaxed">
                        Welcome back! Login to access your cart, wishlist, and order history.
                    </p>
                </div>
            </div>

            {/* Right — Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 bg-[var(--background)]">
                <div className="w-full max-w-md">
                    <Link href="/" className="flex items-center gap-3 mb-10 lg:hidden">
                        <div className="relative w-10 h-10">
                            <Image src="/logo.png" alt="ShyamaSham" fill className="object-contain" />
                        </div>
                        <span className="font-serif text-xl font-bold">ShyamaSham</span>
                    </Link>

                    <h1 className="text-2xl md:text-3xl font-serif italic mb-2">Welcome Back</h1>
                    <p className="text-sm text-[var(--foreground)]/50 mb-8">Login to your account to continue shopping.</p>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-3 rounded mb-5">{error}</div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--foreground)]/60 mb-2">Email</label>
                            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 text-sm border border-gray-200 focus:border-[var(--gold)] focus:outline-none transition-colors bg-white" placeholder="your@email.com" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--foreground)]/60 mb-2">Password</label>
                            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 text-sm border border-gray-200 focus:border-[var(--gold)] focus:outline-none transition-colors bg-white" placeholder="••••••••" />
                        </div>
                        <button type="submit" disabled={loading} className="btn-gold w-full text-center !py-3.5 disabled:opacity-60">
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-xs text-[var(--foreground)]/50">
                        Don&apos;t have an account?{" "}
                        <Link href={`/register?redirect=${redirect}`} className="text-[var(--gold)] font-bold hover:underline">Create Account</Link>
                    </p>

                    <Link href="/" className="block mt-8 text-center text-[10px] tracking-[0.15em] uppercase text-[var(--foreground)]/30 hover:text-[var(--gold)] transition-colors">
                        ← Back to Store
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>}>
            <LoginContent />
        </Suspense>
    );
}
