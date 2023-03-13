const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModels");

exports.registerUser = catchAsyncError(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is public id",
      url: "this is a url",
    },
  });
  res.status(201).json({
    success: true,
    user,
  });
});
