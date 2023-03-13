const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} = require("../controllers/productController");
const router = express.Router();

router.route("/products").get(getAllProducts).post(createProduct);
router
  .route("/products/:id")
  .patch(updateProduct)
  .delete(deleteProduct)
  .get(getProductById);

module.exports = router;
