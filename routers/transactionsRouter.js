const express = require("express");
const router = express.Router();

const {
    createTransactions,
    getTransactions,
    updateTransactions,
    getSingle
} = require("../controllers/transactionsController.js");
const { remove } = require("fs-extra");

//http://localhost:4000/api/order/


router.post("/", createTransactions);
router.put("/:id",updateTransactions)
router.get("/", getTransactions);
router.get("/:id", getSingle);
// router.delete("/:id",removeOrder)
//id -> category
module.exports = router;
