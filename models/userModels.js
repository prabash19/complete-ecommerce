const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    max: [30, "Please enter name less than 30 characters"],
    min: [4, "Please enter name more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    max: [30, "Please enter name less than 30 characters"],
    validate: [validator.isEmail, "Please enter email correctly"],
  },
  password: {
    type: String,
    required: [true, "Please enter your Password"],
    max: [30, "Please enter name less than 30 characters"],
    min: [8, "Please enter password more than 7 characters"],
    // select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: [true, "Please enter public id of imge"],
    },
    url: {
      type: String,
      required: [true, "Please enter url for an image"],
    },
  },
  role: {
    type: String,
    default: "User",
  },
  resetPasswordToken: String,
  resetPasswordExpire: String,
});

module.exports = mongoose.model("user", userSchema);
