const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");
const { upload } = require("../utils/fileUpload");

router.post("/",  upload.single("image"), createProduct);
router.patch("/:id",  upload.single("image"), updateProduct);
router.get("/",  getProducts);
router.get("/:id",  getProduct);
router.delete("/:id",  deleteProduct);

module.exports = router;


// router.post("/", protect, upload.single("image"), createProduct);
// router.patch("/:id", protect, upload.single("image"), updateProduct);
// router.get("/", protect, getProducts);
// router.get("/:id", protect, getProduct);
// router.delete("/:id", protect, deleteProduct);