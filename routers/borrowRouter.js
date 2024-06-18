const express = require("express");
const router = express.Router();

const {
  createBorrow,
  getSingleBorrow,
  endReturn,
  updateBorrow
//   getOrder,
//   getSingleOrder,
//   removeOrder,

//   gettotalSale
} = require("../controllers/borrowDetailController.js");
// const { remove } = require("fs-extra");

//http://localhost:5000/api/order/


router.post("/", createBorrow);
router.get("/:id",getSingleBorrow)
router.post("/:id", endReturn);
router.patch("/:id",updateBorrow)
// router.get("/", getOrder);
// router.get("/total/max", gettotalSale);
// gettotalSale
// router.delete("/:id",removeOrder)
//id -> category
module.exports = router;
