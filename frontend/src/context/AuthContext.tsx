"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/lib/types";

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string, phone?: string) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("shyamasham_user");
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch {
                localStorage.removeItem("shyamasham_user");
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (data.success) {
                setUser(data.data);
                localStorage.setItem("shyamasham_user", JSON.stringify(data.data));
                return true;
            }
            return false;
        } catch {
            // Fallback for demo — accept any credentials
            const demoUser: User = {
                _id: "demo_" + Date.now(),
                name: email.split("@")[0],
                email,
                role: email.includes("admin") ? "admin" : "user",
                token: "demo_token_" + Date.now(),
            };
            setUser(demoUser);
            localStorage.setItem("shyamasham_user", JSON.stringify(demoUser));
            return true;
        }
    };

    const register = async (name: string, email: string, password: string, phone?: string): Promise<boolean> => {
        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, phone }),
            });
            const data = await res.json();
            if (data.success) {
                setUser(data.data);
                localStorage.setItem("shyamasham_user", JSON.stringify(data.data));
                return true;
            }
            return false;
        } catch {
            // Fallback for demo
            const demoUser: User = {
                _id: "demo_" + Date.now(),
                name,
                email,
                role: "user",
                token: "demo_token_" + Date.now(),
            };
            setUser(demoUser);
            localStorage.setItem("shyamasham_user", JSON.stringify(demoUser));
            return true;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("shyamasham_user");
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
