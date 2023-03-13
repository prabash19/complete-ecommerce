const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    success: "false",
    message: err.message,
    // these below are not necessary. just for ease of use in devlopment //
    err: err,
    errorStack: err.stack,
    // these below are not necessary. just for ease of use in devlopment //
  });
};
