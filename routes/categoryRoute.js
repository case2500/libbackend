const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
  createCategory,
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController.jsx");
const { upload } = require("../utils/fileUpload");

router.post("/",  upload.single("image"), createCategory);
router.patch("/:id",  upload.single("image"), updateCategory);
router.get("/",  getCategories);
router.get("/:id",  getCategory);
router.delete("/:id",  deleteCategory);

module.exports = router;


// router.post("/", protect, upload.single("image"), createProduct);
// router.patch("/:id", protect, upload.single("image"), updateProduct);
// router.get("/", protect, getProducts);
// router.get("/:id", protect, getProduct);
// router.delete("/:id", protect, deleteProduct);