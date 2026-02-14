const Order = require("../models/Order");
const Product = require("../models/Product");

/**
 * @desc    Create a new order
 * @route   POST /api/orders
 * @access  Private (User)
 */
const createOrder = async (req, res) => {
    try {
        const { items, shippingAddress, notes } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Order must have at least one item.",
            });
        }

        // Calculate total and validate products
        let totalAmount = 0;
        const orderItems = [];

        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product || !product.isActive) {
                return res.status(404).json({
                    success: false,
                    message: `Product ${item.product} not found or unavailable.`,
                });
            }
            if (product.stock < (item.quantity || 1)) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${product.name}.`,
                });
            }

            const qty = item.quantity || 1;
            totalAmount += product.price * qty;
            orderItems.push({
                product: product._id,
                quantity: qty,
                price: product.price,
            });

            // Reduce stock
            product.stock -= qty;
            await product.save();
        }

        const order = await Order.create({
            user: req.user._id,
            items: orderItems,
            totalAmount,
            shippingAddress,
            notes,
        });

        res.status(201).json({
            success: true,
            message: "Order placed successfully.",
            data: order,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * @desc    Get current user's orders
 * @route   GET /api/orders/my
 * @access  Private (User)
 */
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate("items.product", "name price images category")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * @desc    Get all orders (admin)
 * @route   GET /api/orders
 * @access  Admin
 */
const getAllOrders = async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;

        const filter = {};
        if (status) filter.status = status;

        const skip = (Number(page) - 1) * Number(limit);

        const [orders, total] = await Promise.all([
            Order.find(filter)
                .populate("user", "name email phone")
                .populate("items.product", "name price images")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(Number(limit)),
            Order.countDocuments(filter),
        ]);

        res.status(200).json({
            success: true,
            data: orders,
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
 * @desc    Get single order
 * @route   GET /api/orders/:id
 * @access  Private (Owner or Admin)
 */
const getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate("user", "name email phone")
            .populate("items.product", "name price images category");

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found.",
            });
        }

        // Only owner or admin can view
        if (
            order.user._id.toString() !== req.user._id.toString() &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to view this order.",
            });
        }

        res.status(200).json({
            success: true,
            data: order,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * @desc    Update order status (admin)
 * @route   PUT /api/orders/:id/status
 * @access  Admin
 */
const updateOrderStatus = async (req, res) => {
    try {
        const { status, paymentStatus } = req.body;

        const updates = {};
        if (status) updates.status = status;
        if (paymentStatus) updates.paymentStatus = paymentStatus;

        const order = await Order.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true,
        })
            .populate("user", "name email")
            .populate("items.product", "name price");

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Order status updated.",
            data: order,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createOrder,
    getMyOrders,
    getAllOrders,
    getOrder,
    updateOrderStatus,
};
