const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModels");
const bcrypt = require("bcryptjs");
const createToken = require("../utils/createToken");
const passwordCompare = require("../utils/passwordCompare");

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

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invaid email or password", 400));
  }
  const isCorrectPassword = await passwordCompare(password, user.password);
  if (!isCorrectPassword) {
    return next(new ErrorHandler("Incorrect Email or Password", 400));
  } else {
    const { token, options } = createToken(user._id);
    res.status(201).cookie("token", token, options).json({
      message: "logged in Successfully",
      token,
    });
  }
});
