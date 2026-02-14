"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, CATEGORIES, MATERIALS, OCCASIONS, PRICE_RANGES, SORT_OPTIONS } from "@/lib/data";

function CollectionsContent() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get("category") || "";
    const initialMaterial = searchParams.get("material") || "";
    const initialOccasion = searchParams.get("occasion") || "";

    const [category, setCategory] = useState(initialCategory);
    const [material, setMaterial] = useState(initialMaterial);
    const [occasion, setOccasion] = useState(initialOccasion);
    const [priceRange, setPriceRange] = useState("");
    const [sort, setSort] = useState("newest");
    const [search, setSearch] = useState("");
    const [filtersOpen, setFiltersOpen] = useState(false);

    const filtered = useMemo(() => {
        let result = [...PRODUCTS];

        if (category) result = result.filter((p) => p.category === category);
        if (material) result = result.filter((p) => p.material === material);
        if (occasion) result = result.filter((p) => p.occasion === occasion);
        if (priceRange) {
            const range = PRICE_RANGES.find((r) => r.value === priceRange);
            if (range) result = result.filter((p) => p.price >= range.min && p.price <= range.max);
        }
        if (search) {
            const q = search.toLowerCase();
            result = result.filter(
                (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q))
            );
        }

        switch (sort) {
            case "price_asc": result.sort((a, b) => a.price - b.price); break;
            case "price_desc": result.sort((a, b) => b.price - a.price); break;
            case "discount": result.sort((a, b) => b.discount - a.discount); break;
            case "popular": result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)); break;
            default: result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }

        return result;
    }, [category, material, occasion, priceRange, sort, search]);

    const clearAll = () => {
        setCategory("");
        setMaterial("");
        setOccasion("");
        setPriceRange("");
        setSearch("");
        setSort("newest");
    };

    const activeFilterCount = [category, material, occasion, priceRange, search].filter(Boolean).length;

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            {/* Header */}
            <div className="mt-[52px] bg-[var(--foreground)] text-white py-12 md:py-16 px-6 text-center">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[var(--gold)] mb-2 block">Shop</span>
                <h1 className="text-3xl md:text-5xl font-serif italic">
                    {category ? CATEGORIES.find((c) => c.value === category)?.label || "All" : "All Collections"}
                </h1>
                <p className="text-sm text-white/50 mt-3 font-light">{filtered.length} products found</p>
            </div>

            <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-8 flex-1">
                {/* Search + Sort Bar */}
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-6">
                    <div className="relative flex-1 max-w-md">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search jewellery..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-none focus:border-[var(--gold)] focus:outline-none transition-colors"
                        />
                    </div>
                    <div className="flex gap-3 items-center">
                        <button onClick={() => setFiltersOpen(!filtersOpen)} className="sm:hidden text-[10px] font-bold tracking-[0.15em] uppercase border border-gray-200 px-4 py-2.5 flex items-center gap-2">
                            Filters {activeFilterCount > 0 && <span className="w-5 h-5 rounded-full bg-[var(--gold)] text-white text-[9px] flex items-center justify-center">{activeFilterCount}</span>}
                        </button>
                        <select value={sort} onChange={(e) => setSort(e.target.value)} className="text-[11px] font-semibold tracking-wider uppercase border border-gray-200 px-3 py-2.5 bg-white focus:border-[var(--gold)] focus:outline-none appearance-none cursor-pointer pr-8">
                            {SORT_OPTIONS.map((o) => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex gap-8">
                    {/* Sidebar Filters */}
                    <aside className={`${filtersOpen ? "block fixed inset-0 z-50 bg-white p-6 overflow-auto" : "hidden"} sm:block sm:static sm:z-auto sm:bg-transparent sm:p-0 sm:w-56 shrink-0`}>
                        {filtersOpen && (
                            <div className="flex items-center justify-between mb-6 sm:hidden">
                                <h3 className="text-lg font-bold">Filters</h3>
                                <button onClick={() => setFiltersOpen(false)} className="text-2xl">&times;</button>
                            </div>
                        )}

                        {activeFilterCount > 0 && (
                            <button onClick={clearAll} className="text-[10px] font-bold tracking-[0.15em] uppercase text-red-500 mb-5 hover:underline">
                                Clear All Filters ({activeFilterCount})
                            </button>
                        )}

                        {/* Category */}
                        <div className="mb-6">
                            <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[var(--foreground)] mb-3">Category</h4>
                            <div className="flex flex-col gap-1.5">
                                <button onClick={() => setCategory("")} className={`text-left text-xs py-1.5 px-2 transition-colors ${!category ? "text-[var(--gold)] font-bold bg-[var(--gold-soft)]" : "text-[var(--foreground)]/60 hover:text-[var(--foreground)]"}`}>
                                    All Categories
                                </button>
                                {CATEGORIES.map((c) => (
                                    <button key={c.value} onClick={() => setCategory(c.value)} className={`text-left text-xs py-1.5 px-2 transition-colors ${category === c.value ? "text-[var(--gold)] font-bold bg-[var(--gold-soft)]" : "text-[var(--foreground)]/60 hover:text-[var(--foreground)]"}`}>
                                        {c.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Material/Design */}
                        <div className="mb-6">
                            <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[var(--foreground)] mb-3">Design / Material</h4>
                            <div className="flex flex-col gap-1.5">
                                <button onClick={() => setMaterial("")} className={`text-left text-xs py-1.5 px-2 transition-colors ${!material ? "text-[var(--gold)] font-bold bg-[var(--gold-soft)]" : "text-[var(--foreground)]/60 hover:text-[var(--foreground)]"}`}>
                                    All Materials
                                </button>
                                {MATERIALS.map((m) => (
                                    <button key={m.value} onClick={() => setMaterial(m.value)} className={`text-left text-xs py-1.5 px-2 transition-colors ${material === m.value ? "text-[var(--gold)] font-bold bg-[var(--gold-soft)]" : "text-[var(--foreground)]/60 hover:text-[var(--foreground)]"}`}>
                                        {m.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Occasion */}
                        <div className="mb-6">
                            <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[var(--foreground)] mb-3">Occasion</h4>
                            <div className="flex flex-col gap-1.5">
                                <button onClick={() => setOccasion("")} className={`text-left text-xs py-1.5 px-2 transition-colors ${!occasion ? "text-[var(--gold)] font-bold bg-[var(--gold-soft)]" : "text-[var(--foreground)]/60 hover:text-[var(--foreground)]"}`}>
                                    All Occasions
                                </button>
                                {OCCASIONS.map((o) => (
                                    <button key={o.value} onClick={() => setOccasion(o.value)} className={`text-left text-xs py-1.5 px-2 transition-colors ${occasion === o.value ? "text-[var(--gold)] font-bold bg-[var(--gold-soft)]" : "text-[var(--foreground)]/60 hover:text-[var(--foreground)]"}`}>
                                        {o.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div className="mb-6">
                            <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[var(--foreground)] mb-3">Price Range</h4>
                            <div className="flex flex-col gap-1.5">
                                <button onClick={() => setPriceRange("")} className={`text-left text-xs py-1.5 px-2 transition-colors ${!priceRange ? "text-[var(--gold)] font-bold bg-[var(--gold-soft)]" : "text-[var(--foreground)]/60 hover:text-[var(--foreground)]"}`}>
                                    All Prices
                                </button>
                                {PRICE_RANGES.map((r) => (
                                    <button key={r.value} onClick={() => setPriceRange(r.value)} className={`text-left text-xs py-1.5 px-2 transition-colors ${priceRange === r.value ? "text-[var(--gold)] font-bold bg-[var(--gold-soft)]" : "text-[var(--foreground)]/60 hover:text-[var(--foreground)]"}`}>
                                        {r.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {filtersOpen && (
                            <button onClick={() => setFiltersOpen(false)} className="btn-gold w-full text-center mt-4 sm:hidden">
                                Show {filtered.length} Products
                            </button>
                        )}
                    </aside>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {filtered.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-5xl mb-4">😕</p>
                                <h3 className="text-lg font-serif italic mb-2">No products found</h3>
                                <p className="text-sm text-[var(--foreground)]/50 mb-6">Try adjusting your filters or search terms.</p>
                                <button onClick={clearAll} className="btn-outline-gold">Clear All Filters</button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                                {filtered.map((p) => (
                                    <ProductCard key={p._id} product={p} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default function CollectionsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-sm text-gray-400">Loading...</p></div>}>
            <CollectionsContent />
        </Suspense>
    );
}
