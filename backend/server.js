const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const connectDB = require("./config/db");

// Route imports
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");

// ── App Init ──
const app = express();
const PORT = process.env.PORT || 5000;

// ── Ensure uploads directory exists ──
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// ── Middleware ──
app.use(cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ── Routes ──
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

// ── Health Check ──
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "ShyamaSham API is running ✨",
        timestamp: new Date().toISOString(),
    });
});

// ── 404 Handler ──
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found.`,
    });
});

// ── Global Error Handler ──
app.use((err, req, res, next) => {
    console.error("❌ Error:", err.message);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal server error.",
    });
});

// ── Start Server ──
const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`\n🚀 ShyamaSham API running on http://localhost:${PORT}`);
        console.log(`📦 Environment: ${process.env.NODE_ENV || "development"}`);
        console.log(`\n── API Endpoints ──`);
        console.log(`   Auth:     POST /api/auth/register, /api/auth/login`);
        console.log(`   Profile:  GET/PUT /api/auth/me`);
        console.log(`   Products: GET /api/products (public)`);
        console.log(`   Products: POST/PUT/DELETE /api/products (admin)`);
        console.log(`   Orders:   POST /api/orders, GET /api/orders/my`);
        console.log(`   Admin:    GET /api/admin/stats, /api/admin/users`);
        console.log(`   Health:   GET /api/health\n`);
    });
};

startServer();
