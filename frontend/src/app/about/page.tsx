"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            {/* Hero */}
            <div className="mt-[52px] relative h-[50vh] md:h-[60vh] overflow-hidden bg-[var(--foreground)]">
                <div className="absolute inset-0 opacity-20">
                    <Image src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1600&q=80&auto=format&fit=crop" alt="" fill className="object-cover" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-center text-white z-10 px-6">
                    <div>
                        <div className="relative w-20 h-20 mx-auto mb-6 animate-pulse-slow">
                            <Image src="/logo.png" alt="ShyamaSham" fill className="object-contain brightness-200" />
                        </div>
                        <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-[var(--gold)] mb-3 block">Our Story</span>
                        <h1 className="text-3xl md:text-5xl font-serif italic">About ShyamaSham</h1>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 md:px-10 py-16 md:py-24">
                {/* Mission */}
                <div className="mb-16">
                    <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[var(--gold)] mb-3 block">Our Mission</span>
                    <h2 className="text-2xl md:text-3xl font-serif italic mb-6">Bringing Elegance to Everyone</h2>
                    <p className="text-[15px] text-[var(--foreground)]/60 leading-relaxed mb-4">
                        ShyamaSham is your trusted online destination for beautifully crafted ornamental jewellery. We believe that every woman deserves to feel elegant and beautiful — without needing to spend a fortune on precious metals and gemstones.
                    </p>
                    <p className="text-[15px] text-[var(--foreground)]/60 leading-relaxed">
                        Our collection features premium-quality metal-based jewellery that captures the timeless beauty of Indian craftsmanship. From intricate Kundan work to vibrant Meenakari designs, from bold oxidised pieces to delicate pearl accessories — every item in our store is designed to make you feel special.
                    </p>
                </div>

                {/* What We Offer */}
                <div className="mb-16">
                    <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[var(--gold)] mb-3 block">What We Offer</span>
                    <h2 className="text-2xl md:text-3xl font-serif italic mb-8">Curated Collections</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {[
                            { title: "Bangles & Kadas", desc: "Traditional and contemporary bangles in Kundan, Meenakari, Lacquer, and oxidised finishes." },
                            { title: "Necklaces & Chokers", desc: "Statement pieces from velvet chokers to pearl layered necklaces, perfect for every occasion." },
                            { title: "Earrings & Jhumkas", desc: "Oxidised jhumkas, stone studs, chandbalis, and modern danglers for daily and festive wear." },
                            { title: "Rings & Bracelets", desc: "Adjustable rings, charm bracelets, cuff bangles, and delicate chain bracelets." },
                            { title: "Bridal Collections", desc: "Complete bridal sets with matching necklace, earrings, maang tikka, and bangles." },
                            { title: "Anklets & More", desc: "Playful beaded anklets, toe rings, and accessories to complete your look." },
                        ].map((item, i) => (
                            <div key={i} className="p-6 border border-[var(--glass-border)] bg-white/60 hover:border-[var(--gold)] transition-all duration-500">
                                <h3 className="text-sm font-bold tracking-[0.1em] uppercase mb-2 text-[var(--foreground)]">{item.title}</h3>
                                <p className="text-xs text-[var(--foreground)]/50 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Us */}
                <div className="mb-16">
                    <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[var(--gold)] mb-3 block">Why ShyamaSham</span>
                    <h2 className="text-2xl md:text-3xl font-serif italic mb-8">Our Promises</h2>

                    <div className="space-y-6">
                        {[
                            { emoji: "💎", title: "Premium Quality Materials", desc: "We use only the finest metals, stones, and materials. Every piece undergoes quality checks to ensure it meets our high standards of durability and finish." },
                            { emoji: "🎨", title: "Handcrafted with Love", desc: "Our designs draw inspiration from centuries-old Indian jewellery traditions, reimagined for the modern woman. Each piece carries the touch of skilled artisans." },
                            { emoji: "💰", title: "Affordable Luxury", desc: "We believe elegance shouldn't come with a heavy price tag. Our jewellery offers the look and feel of fine jewellery at a fraction of the cost." },
                            { emoji: "🚚", title: "Pan-India Delivery", desc: "We deliver across India with secure, insured packaging. Your jewellery reaches you in perfect condition, every time." },
                            { emoji: "🔄", title: "Hassle-Free Returns", desc: "Not satisfied? We offer a 7-day easy return policy. Your happiness is our top priority." },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-5 items-start">
                                <span className="text-2xl shrink-0 mt-1">{item.emoji}</span>
                                <div>
                                    <h3 className="text-sm font-bold mb-1.5">{item.title}</h3>
                                    <p className="text-[13px] text-[var(--foreground)]/50 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center border-t border-[var(--glass-border)] pt-14">
                    <h2 className="text-2xl md:text-3xl font-serif italic mb-4">Start Exploring</h2>
                    <p className="text-sm text-[var(--foreground)]/50 mb-8 max-w-md mx-auto">
                        Discover our latest collection and find the perfect accessory for every occasion.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link href="/collections" className="btn-gold">Shop Collections</Link>
                        <Link href="/collections?occasion=bridal" className="btn-outline-gold">Bridal Collection</Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
