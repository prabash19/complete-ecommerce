module.exports = (catchAsyncFunction) => (req, res, next) => {
  Promise.resolve(catchAsyncFunction(req, res, next)).catch(next);
};
