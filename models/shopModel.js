const mongoose = require("mongoose");
const shopModel = new mongoose.Schema({
  id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  shopName: {
    type: String,
  },
  shopType: {
    type: String,
  },
  panNumber: {
    type: Number,
  },
});

module.exports = mongoose.model("shop", shopModel);
