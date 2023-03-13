const bcrypt = require("bcryptjs");
async function passwordCompare(candidatePassword, userPassword) {
  console.log("password is", candidatePassword, userPassword);
  return await bcrypt.compare(candidatePassword, userPassword);
}

module.exports = passwordCompare;
