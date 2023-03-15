const Shop = require("../models/shopModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

exports.getAllShops = catchAsyncError(async (req, res) => {
  const apiFeature = new ApiFeatures(Shop.find(), req.query).search().filter();
  const shop = await apiFeature.query;
  res.status(200).json({
    message: "working",
    shop,
  });
});

exports.getShopById = catchAsyncError(async (req, res) => {
  const shop = await Shop.findById(req.params.id);
  if (!shop) {
    return next(new ErrorHandler("shop not found", 404));
  }
  res.status(200).json({
    message: "working",
    shop,
  });
});

exports.createShop = catchAsyncError(async (req, res) => {
  req.body.id = req.user.id;
  const shop = await Shop.create(req.body);
  res.status(200).json({
    message: "successfully added shop",
    shop,
  });
});

exports.updateShop = catchAsyncError(async (req, res, next) => {
  let shop = await Shop.findById(req.params.id);
  if (!shop) {
    return next(new ErrorHandler("shop not found", 404));
  }
  shop = await Shop.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    message: "completed successfully",
    shop,
  });
  next();
});

exports.deleteShop = catchAsyncError(async (req, res, next) => {
  let shop = await Shop.findById(req.params.id);
  if (!shop) {
    return next(new ErrorHandler("shop not found", 404));
  }
  await Shop.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: " deleted completed successfully",
  });
  next();
});
