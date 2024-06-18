const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "User",
    // },
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      default: "SKU",
      trim: true,
    },
    category: {
      type: String,
    //  required: [true, "Please add a category"],
      trim: true,
    },
    quantity: {
      type: String,
     // required: [true, "Please add a quantity"],
      trim: true,
    },
    price: {
      type: String,
   //   required: [true, "Please add a price"],
      trim: true,
    },
    description: {
      type: String,
      // required: [true, "Please add a description"],
      trim: true,
    },
    isbn: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      // required: [true, "Please add a quantity"],
      trim: true,
      default: "Enable",
    },
    image: {
      type: Object,
      default: "https://i.ibb.co/4pDNDk1/avatar.png",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
