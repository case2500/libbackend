const express = require("express");
const router = express.Router();
const Transactionreturns = require("../models/transactionreturns");



const createTransactionreturns = async (req, res) => {
  const {id, userid, newdatedo, newdatereturn, staff_user,username,items } = req.body;
    const transactions = new Transactionreturns({
      user_id: id,
      username: username,
      borrow_datedo: newdatedo,
      borrow_datereturn: newdatereturn,
      staff_user: staff_user,
      items:items
    });
    transactions.save();
};


const getTransactionreturns = async (req, res) => {
  // const con = { status: "open" };
  const data = await Transactionreturns.find({}).sort("-updatedAt");
  res.json({ data });
};

const getSingle = async (req, res) => {
  // console.log(req.params.id);
  try {
      const transactions = await Transactionreturns.findById(req.params.id);
      res.status(200).json(transactions);
  } catch (error) {
    return res.status(404).json({ error: "ข้อมูลผิดพลาด ไม่มีรหัส" });
  }

 
};


module.exports = {
  createTransactionreturns,
  getTransactionreturns,
  // updateOrder,
  getSingle
};
