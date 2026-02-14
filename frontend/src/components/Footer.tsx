import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="w-full bg-[var(--foreground)] text-white/80">
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Image src="/logo.png" alt="ShyamaSham" width={28} height={28} className="brightness-200" />
                            <span className="font-serif text-lg tracking-wider text-white">ShyamaSham</span>
                        </div>
                        <p className="text-[9px] tracking-[0.4em] uppercase text-[var(--gold)]/60 mb-4">Divine Elegance Jewellery</p>
                        <p className="text-xs text-white/40 leading-relaxed">
                            Your trusted online destination for beautifully crafted ornamental jewellery. Premium quality, affordable prices.
                        </p>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[var(--gold)] mb-5">Shop</h4>
                        <div className="flex flex-col gap-2.5">
                            <Link href="/collections?category=bangles" className="text-xs text-white/50 hover:text-[var(--gold)] transition-colors">Bangles</Link>
                            <Link href="/collections?category=necklace" className="text-xs text-white/50 hover:text-[var(--gold)] transition-colors">Necklaces</Link>
                            <Link href="/collections?category=earrings" className="text-xs text-white/50 hover:text-[var(--gold)] transition-colors">Earrings</Link>
                            <Link href="/collections?category=rings" className="text-xs text-white/50 hover:text-[var(--gold)] transition-colors">Rings</Link>
                            <Link href="/collections?category=bracelets" className="text-xs text-white/50 hover:text-[var(--gold)] transition-colors">Bracelets</Link>
                            <Link href="/collections?category=anklets" className="text-xs text-white/50 hover:text-[var(--gold)] transition-colors">Anklets</Link>
                        </div>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[var(--gold)] mb-5">Company</h4>
                        <div className="flex flex-col gap-2.5">
                            <Link href="/about" className="text-xs text-white/50 hover:text-[var(--gold)] transition-colors">About Us</Link>
                            <Link href="/collections" className="text-xs text-white/50 hover:text-[var(--gold)] transition-colors">Collections</Link>
                            <Link href="#" className="text-xs text-white/50 hover:text-[var(--gold)] transition-colors">Return Policy</Link>
                            <Link href="#" className="text-xs text-white/50 hover:text-[var(--gold)] transition-colors">Shipping Info</Link>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[var(--gold)] mb-5">Contact</h4>
                        <div className="flex flex-col gap-2.5 text-xs text-white/50">
                            <p>📞 +91 XXXX XXXX XX</p>
                            <p>✉️ hello@shyamasham.com</p>
                            <p>📍 India</p>
                            <div className="flex gap-4 mt-2">
                                <a href="#" className="hover:text-[var(--gold)] transition-colors">Instagram</a>
                                <a href="#" className="hover:text-[var(--gold)] transition-colors">Facebook</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-[9px] tracking-[0.2em] text-white/30 uppercase">
                        © 2026 ShyamaSham • All Rights Reserved
                    </p>
                    <div className="flex gap-6 text-[9px] font-semibold tracking-[0.12em] uppercase text-white/30">
                        <Link href="#" className="hover:text-[var(--gold)] transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-[var(--gold)] transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
