const express = require("express");
const router = express.Router();

const {
  createBorrow,
//   getSingleBorrow,
  endReturn,
  updateBorrow,
  getDashboard
//   getOrder,
//   getSingleOrder,
//   removeOrder,

//   gettotalSale
} = require("../controllers/dashboardController.js");
// const { remove } = require("fs-extra");

//http://localhost:5000/api/order/


router.post("/", createBorrow);
router.get("/",getDashboard)
router.post("/:id", endReturn);
router.patch("/:id",updateBorrow)
// router.get("/", getOrder);
// router.get("/total/max", gettotalSale);
// gettotalSale
// router.delete("/:id",removeOrder)
//id -> category
module.exports = router;
