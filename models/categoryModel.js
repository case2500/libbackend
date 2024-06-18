const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
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
    status: {
      type: String,
      trim: true,
      default:1
    },
    description: {
      type: String,
      // required: [true, "Please add a description"],
      trim: true,
    },
    image: {
      type: Object,
      default: "noimage.png",
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
