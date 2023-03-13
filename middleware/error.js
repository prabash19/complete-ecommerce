const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Mongo ID Error
  if (err.name === "CastError") {
    const message = `Resource Not Found, Invalid : ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: "false",
    message: err.message,
    // these below are not necessary. just for ease of use in devlopment //
    err: err,
    errorStack: err.stack,
    // these below are not necessary. just for ease of use in devlopment //
  });
};
