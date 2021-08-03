const express = require("express");
const router = express.Router();
const multer = require("multer");
const authenticateToken = require("../middlewares/Auth");

var upload = multer();
router.post("/login", (req, res) => {});

module.exports = router;
