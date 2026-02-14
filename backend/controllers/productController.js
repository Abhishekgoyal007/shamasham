const Product = require("../models/Product");

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Admin
 */
const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            subcategory,
            weight,
            purity,
            stock,
            isFeatured,
            tags,
        } = req.body;

        // Handle uploaded images
        const images = req.files
            ? req.files.map((file) => `/uploads/${file.filename}`)
            : [];

        const product = await Product.create({
            name,
            description,
            price,
            category,
            subcategory,
            weight,
            purity,
            images,
            stock,
            isFeatured: isFeatured === "true" || isFeatured === true,
            tags: tags ? (typeof tags === "string" ? JSON.parse(tags) : tags) : [],
            createdBy: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully.",
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * @desc    Get all products (with filtering, search, pagination)
 * @route   GET /api/products
 * @access  Public
 */
const getProducts = async (req, res) => {
    try {
        const {
            category,
            purity,
            minPrice,
            maxPrice,
            isFeatured,
            search,
            sort,
            page = 1,
            limit = 12,
        } = req.query;

        // Build filter
        const filter = { isActive: true };

        if (category) filter.category = category;
        if (purity) filter.purity = purity;
        if (isFeatured === "true") filter.isFeatured = true;
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }
        if (search) {
            filter.$text = { $search: search };
        }

        // Sort
        let sortObj = { createdAt: -1 }; // Default newest first
        if (sort === "price_asc") sortObj = { price: 1 };
        if (sort === "price_desc") sortObj = { price: -1 };
        if (sort === "name") sortObj = { name: 1 };

        const skip = (Number(page) - 1) * Number(limit);

        const [products, total] = await Promise.all([
            Product.find(filter)
                .sort(sortObj)
                .skip(skip)
                .limit(Number(limit))
                .populate("createdBy", "name"),
            Product.countDocuments(filter),
        ]);

        res.status(200).json({
            success: true,
            data: products,
            pagination: {
                total,
                page: Number(page),
                limit: Number(limit),
                pages: Math.ceil(total / Number(limit)),
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * @desc    Get single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate(
            "createdBy",
            "name"
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found.",
            });
        }

        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * @desc    Update a product
 * @route   PUT /api/products/:id
 * @access  Admin
 */
const updateProduct = async (req, res) => {
    try {
        const updates = { ...req.body };

        // Handle tags
        if (updates.tags && typeof updates.tags === "string") {
            updates.tags = JSON.parse(updates.tags);
        }

        // Handle isFeatured
        if (updates.isFeatured !== undefined) {
            updates.isFeatured =
                updates.isFeatured === "true" || updates.isFeatured === true;
        }

        // Handle new images if uploaded
        if (req.files && req.files.length > 0) {
            const newImages = req.files.map((file) => `/uploads/${file.filename}`);
            // Append to existing or replace
            if (updates.appendImages === "true") {
                const existing = await Product.findById(req.params.id);
                updates.images = [...(existing?.images || []), ...newImages];
            } else {
                updates.images = newImages;
            }
            delete updates.appendImages;
        }

        const product = await Product.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true,
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully.",
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * @desc    Delete a product (soft delete — sets isActive to false)
 * @route   DELETE /api/products/:id
 * @access  Admin
 */
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully.",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * @desc    Permanently delete a product
 * @route   DELETE /api/products/:id/permanent
 * @access  Admin
 */
const permanentDeleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product permanently deleted.",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    permanentDeleteProduct,
};
