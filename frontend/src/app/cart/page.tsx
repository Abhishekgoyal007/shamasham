"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
    const { user } = useAuth();
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
    const router = useRouter();

    if (!user) {
        router.push("/login?redirect=/cart");
        return null;
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <div className="mt-[52px] max-w-5xl mx-auto w-full px-4 md:px-8 py-10 flex-1">
                <h1 className="text-2xl md:text-3xl font-serif italic mb-8">Shopping Cart</h1>

                {cart.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-5xl mb-4">🛒</p>
                        <h2 className="text-lg font-serif italic mb-2">Your cart is empty</h2>
                        <p className="text-sm text-[var(--foreground)]/50 mb-6">Add some beautiful jewellery to your cart!</p>
                        <Link href="/collections" className="btn-gold">Browse Collections</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item) => (
                                <div key={item.product._id} className="flex gap-4 p-4 border border-gray-100 bg-white">
                                    {/* Image */}
                                    <div className="relative w-24 h-24 md:w-28 md:h-28 shrink-0 bg-[var(--gold-soft)]/30 overflow-hidden">
                                        <Image src={item.product.images[0] || "/logo.png"} alt={item.product.name} fill className="object-cover" sizes="112px" />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0">
                                        <Link href={`/product/${item.product._id}`} className="text-sm font-bold hover:text-[var(--gold)] transition-colors line-clamp-1">
                                            {item.product.name}
                                        </Link>
                                        <p className="text-[10px] text-[var(--foreground)]/40 uppercase tracking-wider mt-0.5">
                                            {item.product.material} · {item.product.category}
                                        </p>

                                        {/* Price */}
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-base font-bold">₹{item.product.price.toLocaleString("en-IN")}</span>
                                            {item.product.originalPrice > item.product.price && (
                                                <span className="text-xs text-[var(--foreground)]/30 line-through">₹{item.product.originalPrice.toLocaleString("en-IN")}</span>
                                            )}
                                        </div>

                                        {/* Quantity + Remove */}
                                        <div className="flex items-center gap-4 mt-3">
                                            <div className="flex items-center border border-gray-200">
                                                <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center text-sm hover:bg-gray-50">−</button>
                                                <span className="w-8 h-7 flex items-center justify-center text-xs font-bold border-x border-gray-200">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center text-sm hover:bg-gray-50">+</button>
                                            </div>
                                            <button onClick={() => removeFromCart(item.product._id)} className="text-[10px] uppercase tracking-wider text-red-400 hover:text-red-600 font-semibold transition-colors">
                                                Remove
                                            </button>
                                        </div>
                                    </div>

                                    {/* Item Total */}
                                    <div className="text-right shrink-0">
                                        <p className="text-base font-bold">₹{(item.product.price * item.quantity).toLocaleString("en-IN")}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="border border-gray-100 bg-white p-6 sticky top-20">
                                <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[var(--foreground)]/60 mb-5">Order Summary</h3>

                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-[var(--foreground)]/50">Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                                        <span className="font-semibold">₹{cartTotal.toLocaleString("en-IN")}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[var(--foreground)]/50">Delivery</span>
                                        <span className="font-semibold text-green-600">FREE</span>
                                    </div>
                                    <div className="border-t border-gray-100 pt-3 flex justify-between">
                                        <span className="font-bold">Total</span>
                                        <span className="text-lg font-bold text-[var(--gold)]">₹{cartTotal.toLocaleString("en-IN")}</span>
                                    </div>
                                </div>

                                <Link href="/checkout" className="btn-gold w-full text-center block mt-6 !py-3.5">
                                    Proceed to Checkout
                                </Link>
                                <Link href="/collections" className="block text-center mt-3 text-[10px] tracking-[0.15em] uppercase text-[var(--foreground)]/40 hover:text-[var(--gold)] transition-colors">
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
