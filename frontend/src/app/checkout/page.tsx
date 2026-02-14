"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
    const { user } = useAuth();
    const { cart, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const [step, setStep] = useState<"shipping" | "success">("shipping");

    const [form, setForm] = useState({
        name: user?.name || "",
        phone: user?.phone || "",
        email: user?.email || "",
        street: "",
        city: "",
        state: "",
        pincode: "",
    });

    if (!user) {
        router.push("/login?redirect=/checkout");
        return null;
    }

    if (cart.length === 0 && step !== "success") {
        return (
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center mt-[52px]">
                    <div className="text-center">
                        <p className="text-5xl mb-4">🛒</p>
                        <h2 className="text-lg font-serif italic mb-3">Your cart is empty</h2>
                        <Link href="/collections" className="btn-gold">Shop Now</Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        clearCart();
        setStep("success");
    };

    if (step === "success") {
        return (
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center mt-[52px] px-6">
                    <div className="text-center max-w-md">
                        <p className="text-6xl mb-6">🎉</p>
                        <h1 className="text-2xl md:text-3xl font-serif italic mb-3">Order Placed!</h1>
                        <p className="text-sm text-[var(--foreground)]/50 mb-8 leading-relaxed">
                            Thank you for shopping with ShyamaSham! Your order has been received and will be processed shortly. You&apos;ll receive a confirmation email at <strong>{form.email}</strong>.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link href="/collections" className="btn-gold">Continue Shopping</Link>
                            <Link href="/" className="btn-outline-gold">Back to Home</Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <div className="mt-[52px] max-w-5xl mx-auto w-full px-4 md:px-8 py-10 flex-1">
                <h1 className="text-2xl md:text-3xl font-serif italic mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Shipping Form */}
                    <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-5">
                        <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[var(--foreground)]/60 mb-3">Shipping Details</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--foreground)]/50 mb-1.5">Full Name</label>
                                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 text-sm border border-gray-200 focus:border-[var(--gold)] focus:outline-none bg-white" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--foreground)]/50 mb-1.5">Phone</label>
                                <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 text-sm border border-gray-200 focus:border-[var(--gold)] focus:outline-none bg-white" placeholder="+91" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--foreground)]/50 mb-1.5">Email</label>
                            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 text-sm border border-gray-200 focus:border-[var(--gold)] focus:outline-none bg-white" />
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--foreground)]/50 mb-1.5">Street Address</label>
                            <input type="text" required value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} className="w-full px-4 py-3 text-sm border border-gray-200 focus:border-[var(--gold)] focus:outline-none bg-white" placeholder="House/Flat, Street" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--foreground)]/50 mb-1.5">City</label>
                                <input type="text" required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full px-4 py-3 text-sm border border-gray-200 focus:border-[var(--gold)] focus:outline-none bg-white" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--foreground)]/50 mb-1.5">State</label>
                                <input type="text" required value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="w-full px-4 py-3 text-sm border border-gray-200 focus:border-[var(--gold)] focus:outline-none bg-white" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--foreground)]/50 mb-1.5">Pincode</label>
                                <input type="text" required value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} className="w-full px-4 py-3 text-sm border border-gray-200 focus:border-[var(--gold)] focus:outline-none bg-white" />
                            </div>
                        </div>

                        <button type="submit" className="btn-gold w-full sm:w-auto text-center !py-3.5 mt-4">
                            Place Order — ₹{cartTotal.toLocaleString("en-IN")}
                        </button>
                    </form>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="border border-gray-100 bg-white p-5 sticky top-20">
                            <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[var(--foreground)]/60 mb-4">Your Order ({cart.reduce((s, i) => s + i.quantity, 0)} items)</h3>

                            <div className="space-y-3 max-h-64 overflow-auto">
                                {cart.map((item) => (
                                    <div key={item.product._id} className="flex gap-3">
                                        <div className="relative w-14 h-14 shrink-0 bg-[var(--gold-soft)]/30 overflow-hidden">
                                            <Image src={item.product.images[0] || "/logo.png"} alt={item.product.name} fill className="object-cover" sizes="56px" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-semibold line-clamp-1">{item.product.name}</p>
                                            <p className="text-[10px] text-[var(--foreground)]/40">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="text-xs font-bold shrink-0">₹{(item.product.price * item.quantity).toLocaleString("en-IN")}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-100 mt-4 pt-3 space-y-2 text-sm">
                                <div className="flex justify-between text-[var(--foreground)]/50">
                                    <span>Subtotal</span>
                                    <span>₹{cartTotal.toLocaleString("en-IN")}</span>
                                </div>
                                <div className="flex justify-between text-[var(--foreground)]/50">
                                    <span>Delivery</span>
                                    <span className="text-green-600 font-semibold">FREE</span>
                                </div>
                                <div className="flex justify-between font-bold text-base border-t border-gray-100 pt-2">
                                    <span>Total</span>
                                    <span className="text-[var(--gold)]">₹{cartTotal.toLocaleString("en-IN")}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
