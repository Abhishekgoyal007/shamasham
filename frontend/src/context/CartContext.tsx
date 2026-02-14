"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product, CartItem } from "@/lib/types";

interface CartContextType {
    cart: CartItem[];
    wishlist: Product[];
    addToCart: (product: Product, qty?: number) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, qty: number) => void;
    clearCart: () => void;
    toggleWishlist: (product: Product) => void;
    isInWishlist: (productId: string) => boolean;
    cartTotal: number;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [wishlist, setWishlist] = useState<Product[]>([]);

    // Load from localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem("shyamasham_cart");
        const savedWish = localStorage.getItem("shyamasham_wishlist");
        if (savedCart) try { setCart(JSON.parse(savedCart)); } catch { /* skip */ }
        if (savedWish) try { setWishlist(JSON.parse(savedWish)); } catch { /* skip */ }
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        localStorage.setItem("shyamasham_cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem("shyamasham_wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    const addToCart = (product: Product, qty = 1) => {
        setCart((prev) => {
            const exists = prev.find((i) => i.product._id === product._id);
            if (exists) {
                return prev.map((i) =>
                    i.product._id === product._id
                        ? { ...i, quantity: i.quantity + qty }
                        : i
                );
            }
            return [...prev, { product, quantity: qty }];
        });
    };

    const removeFromCart = (productId: string) => {
        setCart((prev) => prev.filter((i) => i.product._id !== productId));
    };

    const updateQuantity = (productId: string, qty: number) => {
        if (qty <= 0) return removeFromCart(productId);
        setCart((prev) =>
            prev.map((i) =>
                i.product._id === productId ? { ...i, quantity: qty } : i
            )
        );
    };

    const clearCart = () => setCart([]);

    const toggleWishlist = (product: Product) => {
        setWishlist((prev) => {
            const exists = prev.find((p) => p._id === product._id);
            if (exists) return prev.filter((p) => p._id !== product._id);
            return [...prev, product];
        });
    };

    const isInWishlist = (productId: string) =>
        wishlist.some((p) => p._id === productId);

    const cartTotal = cart.reduce(
        (sum, i) => sum + i.product.price * i.quantity,
        0
    );

    const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                wishlist,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                toggleWishlist,
                isInWishlist,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
}
