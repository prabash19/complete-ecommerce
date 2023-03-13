const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter name of Product"],
  },
  description: {
    type: String,
    required: [true, "Please Enter description of Product"],
  },
  price: {
    type: Number,
    unique: true,
    required: [true, "Please Enter price of Product"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: [true, "Please enter public id of imge"],
      },
      url: {
        type: String,
        required: [true, "Please enter url for an image"],
      },
    },
  ],
  category: {
    type: String,
  },
  stock: {
    type: Number,
    maxLength: [4, "Please enter less than 9999"],
    default: 1,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
      },
      rating: {
        type: String,
      },
      comment: {
        type: String,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Products", ProductSchema);
