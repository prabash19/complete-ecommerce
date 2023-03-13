const Product = require("../models/productModels");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

exports.getAllProducts = catchAsyncError(async (req, res) => {
  const resultsPerPage = 5;
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultsPerPage);
  const product = await apiFeature.query;
  res.status(200).json({
    message: "working",
    product,
  });
});

exports.getProductById = catchAsyncError(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  res.status(200).json({
    message: "working",
    product,
  });
});

exports.createProduct = catchAsyncError(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(200).json({
    message: "successfully added product",
    product,
  });
});

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    message: "completed successfully",
    product,
  });
  next();
});

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: " deleted completed successfully",
  });
  next();
});
