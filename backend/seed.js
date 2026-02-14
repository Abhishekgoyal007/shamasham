/**
 * Seed Script — Creates an admin user and sample bangle products.
 * Run with: npm run seed
 */
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");
const Product = require("./models/Product");

const connectDB = require("./config/db");

const seedData = async () => {
    try {
        await connectDB();

        console.log("🧹 Clearing existing data...");
        await User.deleteMany({});
        await Product.deleteMany({});

        // ── Create Admin User ──
        console.log("👤 Creating admin user...");
        const admin = await User.create({
            name: "ShyamaSham Admin",
            email: "admin@shyamasham.com",
            password: "admin123",
            role: "admin",
            phone: "+91 9999999999",
        });
        console.log(`   ✅ Admin created: ${admin.email} / admin123`);

        // ── Create Sample User ──
        console.log("👤 Creating sample user...");
        const user = await User.create({
            name: "Priya Sharma",
            email: "priya@example.com",
            password: "user1234",
            role: "user",
            phone: "+91 8888888888",
            address: {
                street: "42, MG Road",
                city: "Jaipur",
                state: "Rajasthan",
                pincode: "302001",
            },
        });
        console.log(`   ✅ User created: ${user.email} / user1234`);

        // ── Create Sample Bangles ──
        console.log("💍 Creating sample products...");
        const products = await Product.insertMany([
            {
                name: "Royal Filigree Kada",
                description:
                    "An exquisite handcrafted gold kada featuring intricate filigree work inspired by Rajput heritage. Each piece takes over 40 hours of meticulous craftsmanship by our master karigars.",
                price: 85000,
                category: "bangles",
                subcategory: "filigree",
                weight: "32g",
                purity: "22K",
                images: [],
                stock: 5,
                isFeatured: true,
                tags: ["bestseller", "handcrafted", "filigree", "kada"],
                createdBy: admin._id,
            },
            {
                name: "Peacock Motif Bangle",
                description:
                    "Stunning peacock-inspired bangle with meenakari enamel work in brilliant blues and greens. The peacock symbolizes grace and beauty, making this a perfect adornment for special occasions.",
                price: 120000,
                category: "bangles",
                subcategory: "meenakari",
                weight: "45g",
                purity: "22K",
                images: [],
                stock: 3,
                isFeatured: true,
                tags: ["new-arrival", "meenakari", "peacock", "premium"],
                createdBy: admin._id,
            },
            {
                name: "Temple Bloom Bangle Set",
                description:
                    "A set of two matching bangles inspired by South Indian temple jewelry. Adorned with lotus and deity motifs, this set carries the blessings of tradition.",
                price: 65000,
                category: "bangles",
                subcategory: "temple",
                weight: "28g",
                purity: "22K",
                images: [],
                stock: 8,
                isFeatured: true,
                tags: ["heritage", "temple", "set", "traditional"],
                createdBy: admin._id,
            },
            {
                name: "Kundan Bridal Pair",
                description:
                    "Magnificent bridal bangles featuring authentic Kundan setting with uncut diamonds and rubies. These statement pieces are designed to be the crown jewel of your bridal trousseau.",
                price: 250000,
                category: "bangles",
                subcategory: "kundan",
                weight: "58g",
                purity: "24K",
                images: [],
                stock: 2,
                isFeatured: true,
                tags: ["bridal", "kundan", "premium", "diamonds"],
                createdBy: admin._id,
            },
            {
                name: "Daily Wear Slim Bangle",
                description:
                    "Elegant and lightweight gold bangle perfect for everyday wear. Simple yet sophisticated, with a smooth polished finish that catches the light beautifully.",
                price: 35000,
                category: "bangles",
                subcategory: "plain",
                weight: "14g",
                purity: "22K",
                images: [],
                stock: 15,
                isFeatured: false,
                tags: ["daily-wear", "lightweight", "plain", "polished"],
                createdBy: admin._id,
            },
            {
                name: "Antique Jadau Bangle",
                description:
                    "Museum-quality Jadau bangle featuring traditional Mughal-era craftsmanship with precious stone settings. A collector's piece that bridges centuries of artisan excellence.",
                price: 180000,
                category: "bangles",
                subcategory: "jadau",
                weight: "52g",
                purity: "22K",
                images: [],
                stock: 1,
                isFeatured: true,
                tags: ["antique", "jadau", "collector", "mughal"],
                createdBy: admin._id,
            },
            {
                name: "Diamond Cut Spiral Bangle",
                description:
                    "Modern spiral bangle with diamond-cut patterns that create a dazzling play of light. Perfect fusion of contemporary design with traditional gold craftsmanship.",
                price: 72000,
                category: "bangles",
                subcategory: "modern",
                weight: "24g",
                purity: "22K",
                images: [],
                stock: 6,
                isFeatured: false,
                tags: ["modern", "diamond-cut", "spiral", "contemporary"],
                createdBy: admin._id,
            },
            {
                name: "Twisted Rope Gold Bangle",
                description:
                    "Classic twisted rope design bangle in solid gold. This timeless pattern has been a symbol of strength and unity for generations.",
                price: 48000,
                category: "bangles",
                subcategory: "classic",
                weight: "18g",
                purity: "22K",
                images: [],
                stock: 10,
                isFeatured: false,
                tags: ["classic", "twisted", "rope", "timeless"],
                createdBy: admin._id,
            },
        ]);

        console.log(`   ✅ ${products.length} products created.`);

        console.log("\n═══════════════════════════════════════");
        console.log("  🎉 Seed completed successfully!");
        console.log("═══════════════════════════════════════");
        console.log("\n  Admin Login:");
        console.log("    Email:    admin@shyamasham.com");
        console.log("    Password: admin123");
        console.log("\n  User Login:");
        console.log("    Email:    priya@example.com");
        console.log("    Password: user1234");
        console.log("═══════════════════════════════════════\n");

        process.exit(0);
    } catch (error) {
        console.error("❌ Seed failed:", error.message);
        process.exit(1);
    }
};

seedData();
