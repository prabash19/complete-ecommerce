const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModels");
const bcrypt = require("bcryptjs");
const createToken = require("../utils/createToken");
const passwordCompare = require("../utils/passwordCompare");
const {
  resetPasswordHandle,
  hashResetToken,
} = require("../utils/resetPasswordHandle");

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
  const { token, options } = createToken(user._id);
  res.status(201).cookie("token", token, options).json({
    success: true,
    message: "Successfully Registered",
    user,
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
    });
  }
});

exports.logOut = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(201).json({
    success: "true",
    message: "logged out",
  });
});

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("Email not found", 400));
  }
  const { resetToken, resetPasswordToken, resetPasswordExpire } =
    resetPasswordHandle();
  await User.findByIdAndUpdate(
    user._id,
    { resetPasswordToken, resetPasswordExpire },
    {
      new: true,
    }
  );
  const resetUrl = `http:localhost:5000/reset/${resetToken}`;
  try {
    // method for sending mail:- sendMail(options)
    res.status(201).json({
      status: "success",
      message: resetUrl,
    });
  } catch (error) {
    await User.findByIdAndUpdate(
      user._id,
      { resetPasswordToken: undefined, resetPasswordExpire: undefined },
      {
        new: true,
      }
    );
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = hashResetToken(req.params.token);
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler("Reset Password token invaild or has been expired", 400)
    );
  }
  user.password = await bcrypt.hash(req.body.password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  user.save();
  const { token, options } = createToken(user._id);
  res.status(201).cookie("token", token, options).json({
    message: "logged in Successfully",
  });
});
