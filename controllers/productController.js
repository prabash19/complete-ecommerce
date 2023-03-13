const Product = require("../models/productModels");
const ErrorHandler = require("../utils/errorHandler");

exports.getAllProducts = async (req, res) => {
  const product = await Product.find();
  res.status(200).json({
    message: "working",
    product,
  });
};

exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  res.status(200).json({
    message: "working",
    product,
  });
  next();
};

exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(200).json({
    message: "successfully added product",
    product,
  });
  next();
};

exports.updateProduct = async (req, res, next) => {
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
};

exports.deleteProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: " deleted completed successfully",
  });
  next();
};
