const express = require("express");
const router = express.Router();
const {
    getAllUsers,
    getUser,
    updateUserRole,
    deleteUser,
    getDashboardStats,
} = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/auth");

// All admin routes are protected + admin only
router.use(protect, authorize("admin"));

router.get("/stats", getDashboardStats);
router.get("/users", getAllUsers);
router.get("/users/:id", getUser);
router.put("/users/:id/role", updateUserRole);
router.delete("/users/:id", deleteUser);

module.exports = router;
