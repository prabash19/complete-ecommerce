const Product = require("../models/productModels");
exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(200).json({
    message: "successfully added product",
    product,
  });
  next();
};

exports.getAllProducts = (req, res) => {
  res.status(200).json({
    message: "working",
  });
};
