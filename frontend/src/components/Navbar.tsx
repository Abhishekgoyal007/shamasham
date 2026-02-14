"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userMenu, setUserMenu] = useState(false);

    return (
        <header className="fixed top-0 z-50 w-full backdrop-blur-xl bg-[var(--background)]/70 border-b border-[var(--gold)]/10">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-10 py-3">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group" onClick={() => setMobileOpen(false)}>
                    <div className="relative w-7 h-7 shrink-0">
                        <Image src="/logo.png" alt="ShyamaSham" fill className="object-contain" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-serif text-lg font-bold tracking-wider leading-none">ShyamaSham</span>
                        <span className="text-[7px] tracking-[0.4em] text-[var(--gold)] uppercase mt-0.5 font-black">Divine Elegance</span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-7 text-[11px] font-semibold tracking-[0.15em] uppercase text-[var(--foreground)]/60">
                    <Link href="/collections" className="hover:text-[var(--gold)] transition-colors duration-300">Collections</Link>
                    <Link href="/collections?category=bangles" className="hover:text-[var(--gold)] transition-colors duration-300">Bangles</Link>
                    <Link href="/collections?category=necklace" className="hover:text-[var(--gold)] transition-colors duration-300">Necklaces</Link>
                    <Link href="/about" className="hover:text-[var(--gold)] transition-colors duration-300">About</Link>
                </nav>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {/* Wishlist */}
                    <Link href={user ? "/wishlist" : "/login?redirect=/wishlist"} className="relative hover:text-[var(--gold)] transition-colors" title="Wishlist">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                    </Link>

                    {/* Cart */}
                    <Link href={user ? "/cart" : "/login?redirect=/cart"} className="relative hover:text-[var(--gold)] transition-colors" title="Cart">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[var(--gold)] text-white text-[8px] font-bold flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* User */}
                    {user ? (
                        <div className="relative">
                            <button onClick={() => setUserMenu(!userMenu)} className="flex items-center gap-2 hover:text-[var(--gold)] transition-colors">
                                <div className="w-7 h-7 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/30 flex items-center justify-center text-[10px] font-bold text-[var(--gold)] uppercase">
                                    {user.name[0]}
                                </div>
                            </button>
                            {userMenu && (
                                <div className="absolute right-0 top-10 w-48 bg-white rounded-lg shadow-xl border border-[var(--glass-border)] py-2 z-50">
                                    <div className="px-4 py-2 border-b border-gray-100">
                                        <p className="text-xs font-bold text-[var(--foreground)]">{user.name}</p>
                                        <p className="text-[10px] text-[var(--foreground)]/50">{user.email}</p>
                                        {user.role === "admin" && (
                                            <span className="text-[8px] bg-[var(--gold)]/10 text-[var(--gold)] px-2 py-0.5 rounded-full font-bold mt-1 inline-block">ADMIN</span>
                                        )}
                                    </div>
                                    <Link href="/cart" className="block px-4 py-2 text-xs hover:bg-[var(--gold-soft)] transition-colors" onClick={() => setUserMenu(false)}>My Cart</Link>
                                    <Link href="/wishlist" className="block px-4 py-2 text-xs hover:bg-[var(--gold-soft)] transition-colors" onClick={() => setUserMenu(false)}>Wishlist</Link>
                                    <button onClick={() => { logout(); setUserMenu(false); }} className="block w-full text-left px-4 py-2 text-xs text-red-500 hover:bg-red-50 transition-colors">
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href="/login" className="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--gold)] border border-[var(--gold)]/30 px-4 py-2 hover:bg-[var(--gold)] hover:text-white transition-all duration-300">
                            Login
                        </Link>
                    )}

                    {/* Mobile Toggle */}
                    <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                            {mobileOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden bg-white border-t border-[var(--glass-border)] py-4 px-6 space-y-3">
                    <Link href="/collections" className="block text-sm font-semibold tracking-wider uppercase py-2 hover:text-[var(--gold)]" onClick={() => setMobileOpen(false)}>All Collections</Link>
                    <Link href="/collections?category=bangles" className="block text-sm font-semibold tracking-wider uppercase py-2 hover:text-[var(--gold)]" onClick={() => setMobileOpen(false)}>Bangles</Link>
                    <Link href="/collections?category=necklace" className="block text-sm font-semibold tracking-wider uppercase py-2 hover:text-[var(--gold)]" onClick={() => setMobileOpen(false)}>Necklaces</Link>
                    <Link href="/collections?category=earrings" className="block text-sm font-semibold tracking-wider uppercase py-2 hover:text-[var(--gold)]" onClick={() => setMobileOpen(false)}>Earrings</Link>
                    <Link href="/about" className="block text-sm font-semibold tracking-wider uppercase py-2 hover:text-[var(--gold)]" onClick={() => setMobileOpen(false)}>About Us</Link>
                </div>
            )}
        </header>
    );
}
