const express = require("express");
const router = express.Router();
const {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    permanentDeleteProduct,
} = require("../controllers/productController");
const { protect, authorize } = require("../middleware/auth");
const upload = require("../middleware/upload");

// Public
router.get("/", getProducts);
router.get("/:id", getProduct);

// Admin only
router.post("/", protect, authorize("admin"), upload.array("images", 5), createProduct);
router.put("/:id", protect, authorize("admin"), upload.array("images", 5), updateProduct);
router.delete("/:id", protect, authorize("admin"), deleteProduct);
router.delete("/:id/permanent", protect, authorize("admin"), permanentDeleteProduct);

module.exports = router;
