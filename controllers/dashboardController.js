// Create Prouct
const express = require("express");
const router = express.Router();
const BorrowDetail = require("../models/borrowDetailModel.js");

// {"items":[{

//   "borrow_datedo": "2024-01-30T17:10:39.614+00:00",
//   "borrow_datereturn": "2024-01-30T17:10:39.614+00:00",
//    "product_id": "65b4b6475b1c021349a0e483",
//    "productname": "เขียนโปรแกรม react js1111"
// },
// {
//   "borrow_datedo": "2024-01-30T17:10:39.614+00:00",
//   "borrow_datereturn": "2024-01-30T17:10:39.614+00:00",
//    "product_id": "65b4b6475b1c021349a0e483",
//    "productname": "เขียนโปรแกรม react js1111"
// }],"userid":"a1111"}

const createBorrow = async (req, res) => {
  const {
    items,
    userid,
    newdatedo,
    newdatereturn,
    username,
    isbn,
    staff_user,
  } = req.body;
  // console.log(JSON.stringify(req.body));
  try {
    const insertItems = [];
    items.map((item) =>
      insertItems.push({
        product_id: item._id,
        productname: item.name,
        borrow_datedo: newdatedo,
        borrow_datereturn: newdatereturn,
        user_id: userid,
        isbn: item.isbn,
        username: username,
        staff_user: staff_user,
      })
    );
    const borrowdetail = await BorrowDetail.insertMany(insertItems);
    res.status(200).json({ message: "ok" });
  } catch (error) {
    console.log(error);
  }
};
const getDashboard = async (req, res) => {
  try {
    const countdashbord = await BorrowDetail.aggregate([
  
      {
        $group: {
          _id: {
            year: { $year: "$borrow_datedo" },
            month: { $month: "$borrow_datedo" },
            day: { $dayOfMonth: "$borrow_datedo" },
            
          },
          //   totalPrice: { $sum: { $multiply: [ "$price", "$quantity" ] } },
          //   averageQuantity: { $avg: "$quantity" },

          count: { $sum: 1 },
     
        },
      },
      {
        $sort: { '_id': -1 }
      }
    ]);
    var sumday = [];
    countdashbord.map((dash) =>
      sumday.push({
        name:
          String(dash._id.day) +
          "-" +
          String(dash._id.month) +
          "-" +
          String(dash._id.year+543),
       amout: dash.count,
      })
    );


    // console.log("getDashboard" + countdashbord);
    res.json(sumday);
  } catch (error) {
      console.log("error");
  }

};

//post   http://localhost:4000/api/borrow/6583a2663f545d9626de16b1
const endReturn = async (req, res) => {
  const id = req.params.id;
  try {
    const updateItems = [];
    await req.body.items.map((p, index) => {
      // console.log(p.product_id);
      updateItems.push(p._id);
    });
    // console.log("updateItems==" + updateItems);
    await BorrowDetail.updateMany(
      { _id: updateItems },
      {
        $set: {
          borrow_returnStatus: "0",
        },
      },
      { upsert: true }
    );
    res.json({ msg: "success" });
  } catch (error) {
    res.json({ msg: "err" });
  }
};

//put   http://localhost:5000/api/borrow/
const updateBorrow = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const { borrow_returnStatus } = req.body;

  console.log("updateBorrow");

  console.log(req.body);

  try {
    // Update Product
    const updatedProduct = await BorrowDetail.findByIdAndUpdate(
      { _id: id },
      {
        borrow_returnStatus: borrow_returnStatus,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json({ msg: "success" });
  } catch (error) {
    res.json({ msg: "err" });
  }
};

module.exports = {
  createBorrow,
  //   getSingleBorrow,
  endReturn,
  updateBorrow,
  getDashboard,
};
