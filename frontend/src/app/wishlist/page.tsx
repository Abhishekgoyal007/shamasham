"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function WishlistPage() {
    const { user } = useAuth();
    const { wishlist } = useCart();
    const router = useRouter();

    if (!user) {
        router.push("/login?redirect=/wishlist");
        return null;
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <div className="mt-[52px] max-w-7xl mx-auto w-full px-4 md:px-8 py-10 flex-1">
                <h1 className="text-2xl md:text-3xl font-serif italic mb-8">My Wishlist</h1>

                {wishlist.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-5xl mb-4">💝</p>
                        <h2 className="text-lg font-serif italic mb-2">Your wishlist is empty</h2>
                        <p className="text-sm text-[var(--foreground)]/50 mb-6">Save your favourite pieces here for later!</p>
                        <Link href="/collections" className="btn-gold">Browse Collections</Link>
                    </div>
                ) : (
                    <>
                        <p className="text-sm text-[var(--foreground)]/50 mb-6">{wishlist.length} item{wishlist.length !== 1 ? "s" : ""} saved</p>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                            {wishlist.map((p) => (
                                <ProductCard key={p._id} product={p} />
                            ))}
                        </div>
                    </>
                )}
            </div>

            <Footer />
        </div>
    );
}
