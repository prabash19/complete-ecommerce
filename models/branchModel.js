const mongoose = require("mongoose");
const branchModel = new mongoose.Schema({
  id: {
    type: mongoose.Schema.objectId,
    ref: "shop",
  },
  branchName: {
    type: String,
  },
  branchType: {
    type: String,
  },
  panNumber: {
    type: Number,
  },
});

model.exports = mongoose.model("branch", branchModel);
