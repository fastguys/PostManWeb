const mongoose = require("mongoose");
// mongoose.connect('mongodb://localhost/USER')
const userSchema = mongoose.Schema({
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
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  country: {
    type: String,
  },
  zipCode: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  bio: {
    type: String,
    default: "Hello From Postman"
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
},{
    timestamps: true,
});

const User = mongoose.model("User", userSchema);
module.exports = User;