const express = require("express");
const router = express.Router();
const {

    getCheckbook,
    getCheckbookSingle

} = require("../controllers/checkbookController.js");


// const {
//   verifyToken,
//   refreshToken,
// } = require("../controllers/usercontroller");


// const { auth,adminCheck } = require("../middleware/auth.js");
router.get("/", getCheckbook);
router.get("/:id", getCheckbookSingle);
// router.post("/",  createCategory);
// router.put("/",  updateCategory);

// router.get("/:id", getCategory);
// router.delete("/:id", deleteCategory);

module.exports = router;
