const express = require("express");
const {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

router.get("/", getAllProducts);
router.get("/:productId", getProductById);

router.use(requireAuth); // Protect all routes below this middleware

router.post("/", createProduct);
router.put("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);

module.exports = router;