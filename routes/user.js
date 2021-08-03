const express = require("express");
const router = express.Router();
const multer = require("multer");
const authenticateToken = require("../middlewares/Auth");
const CategoryController = require("../controllers/CategoryController");
const ProductController = require("../controllers/ProductController");

router.get("/categories", CategoryController.ViewCategories);

router.get("/products", ProductController.GetProductsByCategory);

module.exports = router;
