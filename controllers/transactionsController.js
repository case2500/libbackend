const express = require("express");
const router = express.Router();
const Transactions = require("../models/transactions");

const createTransactions = async (req, res) => {
  // console.log("ok");
  // console.log(JSON.stringify(req.body));

  const {id, userid, newdatedo, newdatereturn, staff_user,username,items } = req.body;
    const transactions = new Transactions({
      user_id: id,
      username: username,
      borrow_datedo: newdatedo,
      borrow_datereturn: newdatereturn,
      staff_user: staff_user,
      items:items
    });
    transactions.save();
  // });
};

const updateTransactions = async (req, res) => {
  // const { showID } = req.params;
  // console.log(req.params.id);

  const {_id, status } = req.body;
  const filter = { _id: req.params._id };
  const update = {
    status: "close",
  };

  const data = await Transactions.findOneAndUpdate(filter, update, {
    returnOriginal: false,
  });
  // console.log(JSON.stringify(data));
  
  res.json({ data });
};

const getTransactions = async (req, res) => {
  // const con = { status: "open" };
  const data = await Transactions.find({}).sort({ borrow_datedo : -1});
  // console.log(JSON.stringify(data))
  res.json({ data });
};

const getSingle = async (req, res) => {
  // console.log(req.params.id);
  try {
      const transactions = await Transactions.findById(req.params.id);
      res.status(200).json(transactions);
  } catch (error) {
    return res.status(404).json({ error: "ข้อมูลผิดพลาด ไม่มีรหัส" });
  }

 
};

function dayInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

module.exports = {
  createTransactions,
  getTransactions,
  updateTransactions,
  getSingle
};
