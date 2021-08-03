const express = require("express");
const router = express.Router();
const multer = require("multer");
const multerS3 = require("multer-s3");
const authenticateToken = require("../middlewares/Auth");
const AuthController = require("../controllers/AuthController");
const CategoryController = require("../controllers/CategoryController");
const ProductController = require("../controllers/ProductController");
const config = require("../config");
var upload = multer();

var img_upload = multer({
  storage: multerS3({
    s3: config.s3,
    bucket: "heeko/images",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + file.originalname);
    },
  }),
});

router.post("/login", upload.none(), AuthController.Login);

router.post("/register", upload.none(), AuthController.Register);

router.post(
  "/create/category",
  authenticateToken,
  img_upload.single("picture"),
  CategoryController.CreateNewCategory
);

router.post(
  "/create/product",
  authenticateToken,
  upload.none(),
  ProductController.CreateNewProduct
);

module.exports = router;
