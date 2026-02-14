"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }: { product: Product }) {
    const { user } = useAuth();
    const { addToCart, toggleWishlist, isInWishlist } = useCart();
    const router = useRouter();
    const wishlisted = isInWishlist(product._id);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!user) return router.push(`/login?redirect=/collections`);
        addToCart(product);
    };

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!user) return router.push(`/login?redirect=/collections`);
        toggleWishlist(product);
    };

    return (
        <Link href={`/product/${product._id}`} className="product-card group block">
            {/* Image */}
            <div className="aspect-[4/5] relative bg-[var(--gold-soft)]/30 overflow-hidden">
                <Image
                    src={product.images[0] || "/logo.png"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-[1.2s] ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Discount Badge */}
                {product.discount > 0 && (
                    <span className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-red-500 text-white text-[10px] font-bold rounded-sm">
                        {product.discount}% OFF
                    </span>
                )}

                {/* Wishlist Button */}
                <button
                    onClick={handleWishlist}
                    className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all shadow-sm"
                >
                    <svg
                        className={`w-4 h-4 transition-colors ${wishlisted ? "fill-red-500 text-red-500" : "fill-none text-gray-600"}`}
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                </button>

                {/* Quick Add to Cart */}
                <button
                    onClick={handleAddToCart}
                    className="absolute bottom-0 left-0 right-0 bg-[var(--foreground)]/90 text-white text-[10px] font-bold tracking-[0.2em] uppercase py-3 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 hover:bg-[var(--gold)]"
                >
                    Add to Cart
                </button>
            </div>

            {/* Info */}
            <div className="p-4">
                <p className="text-[9px] text-[var(--gold)] font-semibold tracking-[0.15em] uppercase mb-1">
                    {product.material} · {product.occasion}
                </p>
                <h3 className="text-[13px] font-bold tracking-[0.02em] text-[var(--foreground)] mb-2 leading-snug line-clamp-2">
                    {product.name}
                </h3>
                <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-[var(--foreground)]">₹{product.price.toLocaleString("en-IN")}</span>
                    {product.originalPrice > product.price && (
                        <span className="text-xs text-[var(--foreground)]/40 line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
                    )}
                    {product.discount > 0 && (
                        <span className="text-[10px] font-bold text-green-600">{product.discount}% off</span>
                    )}
                </div>
            </div>
        </Link>
    );
}
