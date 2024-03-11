const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  category: { type: String },
  discountPercentage: {
    type: Number,
    default: 0,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  itemImage: {
    type: String,
  },
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

module.exports = MenuItem;
