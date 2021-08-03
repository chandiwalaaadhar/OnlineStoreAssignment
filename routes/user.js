const express = require("express");
const router = express.Router();
const multer = require("multer");
const authenticateToken = require("../middlewares/Auth");
const CategoryController = require("../controllers/CategoryController");
const ProductController = require("../controllers/ProductController");

var upload = multer();

router.get("/categories", CategoryController.ViewCategories);

router.get("/products", ProductController.GetProductsByCategory);

router.post(
  "/purchase/product",
  upload.none(),
  ProductController.PurchaseProduct
);

router.get("/product/search", ProductController.SearchProduct);
router.get("/category/search", CategoryController.SearchCategory);

module.exports = router;
