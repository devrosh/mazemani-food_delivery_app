const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  menu: [{ type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" }],
  location: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rating" }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
