"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const product = PRODUCTS.find((p) => p._id === id);
    const { user } = useAuth();
    const { addToCart, toggleWishlist, isInWishlist } = useCart();
    const router = useRouter();
    const [qty, setQty] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);

    if (!product) {
        return (
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center mt-[52px]">
                    <div className="text-center">
                        <p className="text-5xl mb-4">🔍</p>
                        <h2 className="text-xl font-serif italic mb-3">Product not found</h2>
                        <Link href="/collections" className="btn-gold">Browse Collections</Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const wishlisted = isInWishlist(product._id);
    const related = PRODUCTS.filter((p) => p._id !== product._id && (p.category === product.category || p.material === product.material)).slice(0, 4);

    const handleAddToCart = () => {
        if (!user) return router.push(`/login?redirect=/product/${product._id}`);
        addToCart(product, qty);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const handleBuyNow = () => {
        if (!user) return router.push(`/login?redirect=/product/${product._id}`);
        addToCart(product, qty);
        router.push("/checkout");
    };

    const handleWishlist = () => {
        if (!user) return router.push(`/login?redirect=/product/${product._id}`);
        toggleWishlist(product);
    };

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <div className="mt-[52px] max-w-7xl mx-auto w-full px-4 md:px-8 py-8">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-[11px] text-[var(--foreground)]/40 mb-6">
                    <Link href="/" className="hover:text-[var(--gold)]">Home</Link>
                    <span>/</span>
                    <Link href="/collections" className="hover:text-[var(--gold)]">Collections</Link>
                    <span>/</span>
                    <Link href={`/collections?category=${product.category}`} className="hover:text-[var(--gold)] capitalize">{product.category}</Link>
                    <span>/</span>
                    <span className="text-[var(--foreground)]/70">{product.name}</span>
                </div>

                {/* Product Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14">
                    {/* Image */}
                    <div className="aspect-square relative bg-[var(--gold-soft)]/30 overflow-hidden group">
                        <Image
                            src={product.images[0] || "/logo.png"}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                        {product.discount > 0 && (
                            <span className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-red-500 text-white text-[11px] font-bold rounded-sm">
                                {product.discount}% OFF
                            </span>
                        )}
                    </div>

                    {/* Details */}
                    <div className="flex flex-col justify-center">
                        <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[var(--gold)] mb-2">
                            {product.material} · {product.occasion}
                        </p>

                        <h1 className="text-2xl md:text-3xl font-serif italic font-bold mb-4 leading-tight">
                            {product.name}
                        </h1>

                        {/* Price */}
                        <div className="flex items-baseline gap-3 mb-5">
                            <span className="text-3xl font-bold text-[var(--foreground)]">₹{product.price.toLocaleString("en-IN")}</span>
                            {product.originalPrice > product.price && (
                                <span className="text-lg text-[var(--foreground)]/35 line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
                            )}
                            {product.discount > 0 && (
                                <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">{product.discount}% off</span>
                            )}
                        </div>

                        <p className="text-[13px] text-[var(--foreground)]/60 leading-relaxed mb-6">
                            {product.description}
                        </p>

                        {/* Info Pills */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {product.weight && (
                                <span className="text-[10px] font-semibold tracking-wider uppercase bg-[var(--gold-soft)] text-[var(--gold-dark)] px-3 py-1.5 rounded-sm">
                                    Weight: {product.weight}
                                </span>
                            )}
                            <span className="text-[10px] font-semibold tracking-wider uppercase bg-[var(--gold-soft)] text-[var(--gold-dark)] px-3 py-1.5 rounded-sm capitalize">
                                {product.category}
                            </span>
                            <span className={`text-[10px] font-semibold tracking-wider uppercase px-3 py-1.5 rounded-sm ${product.stock > 0 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                                {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
                            </span>
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[var(--foreground)]/60">Qty:</span>
                            <div className="flex items-center border border-gray-200">
                                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-9 h-9 flex items-center justify-center text-lg hover:bg-gray-50 transition-colors">−</button>
                                <span className="w-10 h-9 flex items-center justify-center text-sm font-bold border-x border-gray-200">{qty}</span>
                                <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="w-9 h-9 flex items-center justify-center text-lg hover:bg-gray-50 transition-colors">+</button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 mb-6">
                            <button
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                className={`flex-1 py-3.5 text-[11px] font-bold tracking-[0.2em] uppercase border-2 border-[var(--gold)] transition-all duration-300 ${addedToCart ? "bg-green-500 text-white border-green-500" : "text-[var(--gold)] hover:bg-[var(--gold)] hover:text-white"} disabled:opacity-40 disabled:cursor-not-allowed`}
                            >
                                {addedToCart ? "✓ Added!" : "Add to Cart"}
                            </button>
                            <button
                                onClick={handleBuyNow}
                                disabled={product.stock === 0}
                                className="flex-1 btn-gold !py-3.5 text-center disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                Buy Now
                            </button>
                        </div>

                        {/* Wishlist */}
                        <button onClick={handleWishlist} className="flex items-center gap-2 text-xs text-[var(--foreground)]/50 hover:text-red-500 transition-colors self-start">
                            <svg className={`w-4 h-4 ${wishlisted ? "fill-red-500 text-red-500" : "fill-none"}`} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                            {wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                        </button>

                        {/* Trust */}
                        <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-3 gap-4">
                            {[
                                { icon: "🚚", text: "Free Delivery" },
                                { icon: "🔄", text: "7 Day Returns" },
                                { icon: "🔒", text: "Secure Pay" },
                            ].map((t, i) => (
                                <div key={i} className="text-center">
                                    <span className="text-lg block mb-1">{t.icon}</span>
                                    <span className="text-[9px] font-bold tracking-wider uppercase text-[var(--foreground)]/40">{t.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {related.length > 0 && (
                    <div className="mt-16 pt-10 border-t border-gray-100">
                        <h2 className="text-xl md:text-2xl font-serif italic mb-8">You May Also Like</h2>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                            {related.map((p) => (
                                <ProductCard key={p._id} product={p} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
