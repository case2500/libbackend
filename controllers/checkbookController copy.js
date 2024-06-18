// Create Prouct
const express = require("express");
const router = express.Router();
const BorrowDetail = require("../models/borrowDetailModel.js");

const getCheckbook = async (req, res) => {
  //   const borrowdetail = await BorrowDetail.aggregate([
  //     {
  //       $match: {
  //         borrow_returnStatus: {
  //           $eq: 1,
  //         },
  //       },
  //     },
  //        {
  //       $group: {
  //         _id: "$product_id",
  //         product_id: { $push: "$$ROOT" },
  //       },
  //     },
  //   ]);

  const borrowdetail = await BorrowDetail.find({ borrow_returnStatus: 1 })
    .populate("product_id", "name image")
    .sort({ product_id: 1 });

  console.log(borrowdetail);

  const sent = [];
  borrowdetail.forEach(function (p) {
    var con = { product_id: p._id };

    // console.log(con);
    console.log(JSON.stringify(p.product_id) + p.username);
    sent.push(...sent, {
      product_id: p.product_id,
      username: p.username,
      borrow_datedo: p.borrow_datedo,
    });

    // var quanlitySale = 0
    // //รายการซื้อ
    // BuyDetail.find(con).then((findbuydetail) => {
    //   counter++;
    //   if (findbuydetail != null) {
    //     findbuydetail.forEach(function (findbuy) {
    //       findlength = product.length;
    //       qty -= findbuy.quanlity;
    //     });
    //     var row1 = {
    //       product_id: p._id,
    //       productname: p.name,
    //       quanlity_Buy: qty,
    //     };
    //     arrayBuy.push(row1);
    //   }
  }); //end รายการซื้อ

  if (borrowdetail) {
    res.json(borrowdetail);
  } else {
    res.json({ msg: "no borrow" });
  }
};

const getCheckbookSingle = async (req, res) => {
  const { id } = req.params; //product_id
  console.log(id);
  const borrowdetail = await BorrowDetail.find({ product_id: id }).populate(
    "product_id",
    "name image"
  );

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
