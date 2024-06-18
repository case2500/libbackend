const mongoose = require("mongoose");

const memberSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    classroom: {
      type: String,
      // required: [true, "Please add a quantity"],
      trim: true,
    },
    phone: {
      type: String,
      // required: [true, "Please add a quantity"],
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
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Member = mongoose.model("Member", memberSchema);
module.exports = Member;
