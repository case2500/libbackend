const express = require("express");
const router = express.Router();

const {
    createTransactionreturns,
    getTransactionreturns,
    // updateOrder,
    getSingle
} = require("../controllers/transactionreturnsController.js");
const { remove } = require("fs-extra");

//http://localhost:4000/api/order/


router.post("/", createTransactionreturns);
// router.put("/:id",updateOrder)
router.get("/", getTransactionreturns);
router.get("/:id", getSingle);
// router.delete("/:id",removeOrder)
//id -> category
module.exports = router;
