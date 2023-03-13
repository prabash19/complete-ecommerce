const jwt = require("jsonwebtoken");
function sendToken(id) {
  return jwt.sign({ id: id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}
module.exports = sendToken;
