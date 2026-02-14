"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

function RegisterContent() {
    const { register } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect") || "/";
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }
        setLoading(true);
        const ok = await register(name, email, password, phone);
        setLoading(false);
        if (ok) router.push(redirect);
        else setError("Registration failed. Email may already be in use.");
    };

    return (
        <div className="min-h-screen flex">
            {/* Left — Branding */}
            <div className="hidden lg:flex w-1/2 bg-[var(--foreground)] items-center justify-center p-12 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <Image src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1200&q=80&auto=format&fit=crop" alt="" fill className="object-cover" />
                </div>
                <div className="relative z-10 text-center text-white">
                    <div className="relative w-24 h-24 mx-auto mb-6 animate-pulse-slow">
                        <Image src="/logo.png" alt="ShyamaSham" fill className="object-contain brightness-200" />
                    </div>
                    <h2 className="text-4xl font-serif italic mb-3">ShyamaSham</h2>
                    <p className="text-[10px] tracking-[0.5em] uppercase text-[var(--gold)] mb-6">Divine Elegance</p>
                    <p className="text-sm text-white/50 max-w-sm font-light leading-relaxed">
                        Create your account and explore our curated collection of beautiful ornamental jewellery.
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

                    <h1 className="text-2xl md:text-3xl font-serif italic mb-2">Create Account</h1>
                    <p className="text-sm text-[var(--foreground)]/50 mb-8">Join ShyamaSham to start your jewellery journey.</p>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-3 rounded mb-5">{error}</div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--foreground)]/60 mb-2">Full Name</label>
                            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 text-sm border border-gray-200 focus:border-[var(--gold)] focus:outline-none transition-colors bg-white" placeholder="Your full name" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--foreground)]/60 mb-2">Email</label>
                            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 text-sm border border-gray-200 focus:border-[var(--gold)] focus:outline-none transition-colors bg-white" placeholder="your@email.com" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--foreground)]/60 mb-2">Phone (Optional)</label>
                            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-3 text-sm border border-gray-200 focus:border-[var(--gold)] focus:outline-none transition-colors bg-white" placeholder="+91 XXXX XXXX XX" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--foreground)]/60 mb-2">Password</label>
                            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 text-sm border border-gray-200 focus:border-[var(--gold)] focus:outline-none transition-colors bg-white" placeholder="Min. 6 characters" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--foreground)]/60 mb-2">Confirm Password</label>
                            <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 text-sm border border-gray-200 focus:border-[var(--gold)] focus:outline-none transition-colors bg-white" placeholder="Re-enter password" />
                        </div>
                        <button type="submit" disabled={loading} className="btn-gold w-full text-center !py-3.5 disabled:opacity-60">
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-xs text-[var(--foreground)]/50">
                        Already have an account?{" "}
                        <Link href={`/login?redirect=${redirect}`} className="text-[var(--gold)] font-bold hover:underline">Login</Link>
                    </p>

                    <Link href="/" className="block mt-8 text-center text-[10px] tracking-[0.15em] uppercase text-[var(--foreground)]/30 hover:text-[var(--gold)] transition-colors">
                        ← Back to Store
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function RegisterPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>}>
            <RegisterContent />
        </Suspense>
    );
}
