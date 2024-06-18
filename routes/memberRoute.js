const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
  createMember,
  getMembers,
  getMember,
  deleteMember,
  updateMember,
} = require("../controllers/memberController");
const { upload } = require("../utils/fileUpload");

router.post("/",  upload.single("image"), createMember);
router.patch("/:id",  upload.single("image"), updateMember);
router.get("/",  getMembers);
router.get("/:id",  getMember);
router.delete("/:id",  deleteMember);

module.exports = router;

//app.use("/api/members", memberRoute);

// router.post("/", protect, upload.single("image"), createProduct);
// router.patch("/:id", protect, upload.single("image"), updateProduct);
// router.get("/", protect, getProducts);
// router.get("/:id", protect, getProduct);
// router.delete("/:id", protect, deleteProduct);