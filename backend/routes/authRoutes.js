const express = require("express");
const router = express.Router();
const {
    register,
    login,
    getMe,
    updateMe,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");

// Public
router.post("/register", register);
router.post("/login", login);

// Private
router.get("/me", protect, getMe);
router.put("/me", protect, updateMe);

module.exports = router;
