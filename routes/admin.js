const express = require("express");
const router = express.Router();
const multer = require("multer");
const authenticateToken = require("../middlewares/Auth");
const AuthController = require("../controllers/AuthController");

var upload = multer();
router.post("/login", upload.none(), AuthController.Login);
router.post("/register", upload.none(), AuthController.Register);

module.exports = router;
