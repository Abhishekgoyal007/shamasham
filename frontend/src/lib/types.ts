// ── Product Types ──
export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;        // Sale price
    originalPrice: number; // MRP (crossed out)
    discount: number;      // Discount percentage
    category: string;      // bangles, necklace, rings, earrings, anklets
    material: string;      // kundan, velvet, metal, stone, pearl, beaded
    occasion: string;      // traditional, bridal, western, festive, daily, party
    weight?: string;
    images: string[];
    stock: number;
    isFeatured: boolean;
    isActive: boolean;
    tags: string[];
    createdAt: string;
}

// ── Cart ──
export interface CartItem {
    product: Product;
    quantity: number;
}

// ── User ──
export interface User {
    _id: string;
    name: string;
    email: string;
    role: "user" | "admin";
    phone?: string;
    address?: {
        street: string;
        city: string;
        state: string;
        pincode: string;
    };
    token: string;
}

// ── Filter ──
export interface Filters {
    category?: string;
    material?: string;
    occasion?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
    search?: string;
}
