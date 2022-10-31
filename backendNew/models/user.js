const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    // address: {
    //   type: String,
    // },
    // country: {
    //   type: String,
    // },
    // zipCode: {
    //   type: String,
    // },
    // city: {
    //   type: String,
    // },
    // state: {
    //   type: String,
    // },
    visibility: {
      type: Boolean,
      default: true,
    },
    bio: {
      type: String,
      default: "Welcome to Fastguy!",
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
