const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
            maxlength: 120,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            maxlength: 1000,
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price cannot be negative"],
        },
        category: {
            type: String,
            required: [true, "Category is required"],
            enum: [
                "bangles",
                "necklace",
                "rings",
                "earrings",
                "anklets",
                "other",
            ],
            default: "bangles",
        },
        subcategory: {
            type: String,
            trim: true,
            // e.g. "filigree", "kundan", "meenakari", "temple", "bridal"
        },
        weight: {
            type: String,
            trim: true,
            // e.g. "32g"
        },
        purity: {
            type: String,
            enum: ["22K", "24K", "18K", "916"],
            default: "22K",
        },
        images: [
            {
                type: String, // Store image URL or file path
            },
        ],
        stock: {
            type: Number,
            default: 1,
            min: 0,
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        tags: [String],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

// Index for search and filtering
productSchema.index({ name: "text", description: "text" });
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ price: 1 });

module.exports = mongoose.model("Product", productSchema);
