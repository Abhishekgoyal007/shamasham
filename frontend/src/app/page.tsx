"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, CATEGORIES } from "@/lib/data";

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1515562141589-67f0d999b7f3?w=1600&q=80&auto=format&fit=crop",
    alt: "Ornamental bangles collection",
  },
  {
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1600&q=80&auto=format&fit=crop",
    alt: "Traditional jewellery",
  },
  {
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=1600&q=80&auto=format&fit=crop",
    alt: "Elegant ornaments",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const featured = PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* ═══ HERO CAROUSEL ═══ */}
      <section className="relative w-full h-[80vh] md:h-screen mt-[52px] overflow-hidden">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className="hero-slide"
            style={{
              opacity: currentSlide === i ? 1 : 0,
              transition: "opacity 1.2s ease-in-out, transform 8s ease-out",
              transform: currentSlide === i ? "scale(1.04)" : "scale(1)",
            }}
          >
            <Image src={slide.image} alt={slide.alt} fill className="object-cover" priority={i === 0} sizes="100vw" />
          </div>
        ))}
        <div className="hero-overlay" />

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-16 md:pb-24 px-6 text-center text-white">
          <div className="fade-up mb-5">
            <div className="relative w-20 h-20 mx-auto mb-3 animate-pulse-slow">
              <Image src="/logo.png" alt="ShyamaSham" fill className="object-contain drop-shadow-2xl brightness-[2]" />
            </div>
          </div>
          <h1 className="fade-up fade-up-d1 text-4xl md:text-6xl lg:text-7xl font-serif font-bold italic tracking-tight leading-tight mb-4">
            Ornamental Elegance
          </h1>
          <p className="fade-up fade-up-d2 max-w-lg text-sm md:text-lg text-white/80 font-light tracking-wide mb-8">
            Handcrafted jewellery that brings tradition and beauty to your everyday. Affordable luxury, delivered with love.
          </p>
          <div className="fade-up fade-up-d3 flex flex-col sm:flex-row gap-4">
            <Link href="/collections" className="btn-gold">Shop Collections</Link>
            <Link href="/about" className="btn-outline-gold !border-white/40 !text-white hover:!bg-white/10 hover:!text-white">Our Story</Link>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)} className={`h-[3px] rounded-full transition-all duration-500 ${currentSlide === i ? "w-8 bg-[var(--gold)]" : "w-4 bg-white/40"}`} />
          ))}
        </div>
      </section>

      {/* ═══ CATEGORIES ═══ */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[var(--gold)] mb-3 block">Browse By Category</span>
            <h2 className="text-2xl md:text-4xl font-serif italic">Shop Our Collections</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.value}
                href={`/collections?category=${cat.value}`}
                className="group flex flex-col items-center p-6 border border-[var(--glass-border)] bg-white/60 hover:border-[var(--gold)] hover:shadow-lg transition-all duration-500 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-[var(--gold-soft)] flex items-center justify-center mb-3 group-hover:bg-[var(--gold)]/10 transition-colors">
                  <svg className="w-6 h-6 text-[var(--gold)]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[var(--foreground)]">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED PRODUCTS ═══ */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10 border-b border-[var(--gold)]/10 pb-5">
            <div>
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[var(--gold)] mb-2 block">Trending Now</span>
              <h2 className="text-2xl md:text-4xl font-serif italic">Featured Picks</h2>
            </div>
            <Link href="/collections" className="hidden md:inline-block text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--gold)] hover:text-[var(--gold-dark)] border-b border-[var(--gold)]/30 pb-1 transition-colors">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featured.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
          <div className="mt-10 text-center md:hidden">
            <Link href="/collections" className="btn-outline-gold">View All Products</Link>
          </div>
        </div>
      </section>

      {/* ═══ WHY SHYAMASHAM ═══ */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[var(--gold)] mb-3 block">Why Choose Us</span>
            <h2 className="text-2xl md:text-4xl font-serif italic">Crafted with <span className="text-gold-gradient">Purpose</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: "✨", title: "Premium Quality", desc: "Finest metal-based ornaments that look and feel luxurious without the luxury price tag." },
              { icon: "🎨", title: "Handcrafted Designs", desc: "Each piece designed with care, inspired by Indian tradition and modern fashion trends." },
              { icon: "🚚", title: "Fast Delivery", desc: "Secure and insured doorstep delivery across India. Quick shipping on all orders." },
              { icon: "🔄", title: "Easy Returns", desc: "Hassle-free 7-day return policy. Your satisfaction is our top priority." },
            ].map((item, i) => (
              <div key={i} className="trust-card flex flex-col items-center">
                <span className="text-3xl mb-4">{item.icon}</span>
                <h3 className="text-[11px] font-black tracking-[0.2em] uppercase mb-2 text-[var(--foreground)]">{item.title}</h3>
                <p className="text-xs text-[var(--foreground)]/50 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRUST BAR ═══ */}
      <section className="py-12 border-y border-[var(--gold)]/10 bg-[var(--gold-soft)]/30">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap items-center justify-center gap-8 md:gap-14 text-center">
          {["🏷️ Best Prices", "📦 Pan-India Delivery", "💎 Premium Quality", "🔒 Secure Payments", "🔄 Easy Returns"].map((t, i) => (
            <span key={i} className="text-[11px] font-bold tracking-[0.1em] uppercase text-[var(--foreground)]/50">{t}</span>
          ))}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative w-24 h-24 mx-auto mb-8 animate-pulse-slow">
            <Image src="/logo.png" alt="ShyamaSham" fill className="object-contain" />
          </div>
          <h2 className="text-2xl md:text-4xl font-serif italic mb-5 leading-tight">
            Elegance that speaks <br /><span className="text-gold-gradient">before you do.</span>
          </h2>
          <p className="text-[var(--foreground)]/50 font-light text-sm md:text-base max-w-md mx-auto mb-8 tracking-wide">
            Browse our curated collection of ornamental jewellery. From traditional to western — find your perfect piece.
          </p>
          <Link href="/collections" className="btn-gold">Explore Now</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
