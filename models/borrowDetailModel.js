const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new mongoose.Schema({
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  user_id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    // required: true,
  },
  isbn: {
    type: String,
    // required: true,
  },
  borrow_datedo: {
    type: Date,
    // required: true,
  },
  borrow_datereturn: {
    type: Date,
    required: true,
  },
  borrow_returnStatus: {
    type: Number,
    default: 1,
  },
  staff_user: {
    type: String,
    // required: true,
  },
  
},
{
  timestamps: true,
}
);

//compile to form model
const BorrowDetail = mongoose.model("BorrowDetail", schema);

module.exports = mongoose.models.BorrowDetail;
