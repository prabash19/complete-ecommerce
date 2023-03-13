const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
async function connectDB(DB) {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
    });
    console.log("DB connected");
  } catch (err) {
    console.log("DB error: ", err);
  }
}

module.exports = connectDB;
