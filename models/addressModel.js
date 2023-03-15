const mongoose = require("mongoose");
const addressModel = new mongoose.Schema({
  id: {
    type: mongoose.Schema.objectId,
    ref: "user",
  },
  country: {
    type: String,
  },
  district: {
    type: String,
  },
  city: {
    type: String,
  },
});

model.exports = mongoose.model("address", addressModel);
