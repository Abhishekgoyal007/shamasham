const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");

/**
 * @desc    Get all users (admin)
 * @route   GET /api/admin/users
 * @access  Admin
 */
const getAllUsers = async (req, res) => {
    try {
        const { role, page = 1, limit = 20 } = req.query;

        const filter = {};
        if (role) filter.role = role;

        const skip = (Number(page) - 1) * Number(limit);

        const [users, total] = await Promise.all([
            User.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(Number(limit)),
            User.countDocuments(filter),
        ]);

        res.status(200).json({
            success: true,
            data: users,
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
 * @desc    Get single user (admin)
 * @route   GET /api/admin/users/:id
 * @access  Admin
 */
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * @desc    Update user role (admin)
 * @route   PUT /api/admin/users/:id/role
 * @access  Admin
 */
const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;

        if (!["user", "admin"].includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Role must be 'user' or 'admin'.",
            });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: `User role updated to '${role}'.`,
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * @desc    Delete a user (admin)
 * @route   DELETE /api/admin/users/:id
 * @access  Admin
 */
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted.",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * @desc    Dashboard stats for admin
 * @route   GET /api/admin/stats
 * @access  Admin
 */
const getDashboardStats = async (req, res) => {
    try {
        const [totalUsers, totalProducts, totalOrders, recentOrders] =
            await Promise.all([
                User.countDocuments(),
                Product.countDocuments({ isActive: true }),
                Order.countDocuments(),
                Order.find()
                    .populate("user", "name email")
                    .sort({ createdAt: -1 })
                    .limit(5),
            ]);

        // Revenue calculation
        const revenueResult = await Order.aggregate([
            { $match: { paymentStatus: "paid" } },
            { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } },
        ]);
        const totalRevenue = revenueResult[0]?.totalRevenue || 0;

        // Orders by status
        const ordersByStatus = await Order.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } },
        ]);

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalProducts,
                totalOrders,
                totalRevenue,
                ordersByStatus,
                recentOrders,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getAllUsers,
    getUser,
    updateUserRole,
    deleteUser,
    getDashboardStats,
};
