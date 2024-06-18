const mongoose = require("mongoose");
const { Schema } = mongoose;
//Generate random numbers for order
// const randomTxt = Math.random().toString(36).substring(7).toLocaleUpperCase();
// const randomNumbers = Math.floor(1000 + Math.random() * 90000);
const schema = new mongoose.Schema(
  {
    // user_id:
    // {
    //   type: String,
    //   required: true,
    // },
    user_id: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    borrow_datedo: {
      type: Date,
      // required: true,
    },
    borrow_datereturn: {
      type: Date,
      // required: true,
    },

    staff_user: {
      type: String,
      required: true,
    },
    items:{
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

//compile to form model
const Transactions = mongoose.model("Transactions", schema );

module.exports =mongoose.models.Transactions;
