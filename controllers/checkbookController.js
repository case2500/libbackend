// Create Prouct
const express = require("express");
const router = express.Router();
// const constants = require("../constant.js");
const BorrowDetail = require("../models/borrowDetailModel.js");

const getCheckbook = async (req, res) => {
  const borrowdetail = await BorrowDetail.find({ borrow_returnStatus: 1 })
    .populate("product_id", "name image")
    .sort({ username: 1 });

  // console.log(borrowdetail);

  if (borrowdetail) {
    res.json(borrowdetail);
  } else {
    res.json({ msg: "no borrow" });
  }
};

const getCheckbookSingle = async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const borrowdetail = await BorrowDetail.find({ user_id: id });

  if (borrowdetail) {
    res.json(borrowdetail);
  } else {
    res.json({ msg: "no borrow" });
  }
};

module.exports = {
  getCheckbook,
  getCheckbookSingle,
};
