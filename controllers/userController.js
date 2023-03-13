const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModels");
const bcrypt = require("bcryptjs");
const createToken = require("../utils/createToken");
exports.registerUser = catchAsyncError(async (req, res) => {
  const { name, email } = req.body;
  const password = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is public id",
      url: "this is a url",
    },
  });
  const token = createToken(user._id);
  res.status(201).json({
    success: true,
    message: "Successfully Registered",
    token,
  });
});
