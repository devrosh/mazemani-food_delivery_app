const mongoose = require("mongoose");

const deliveryDriverSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  currentLocation: { type: String },
  status: { type: String, enum: ["Available", "Busy"] },
});

const DeliveryDriver = mongoose.model("DeliveryDriver", deliveryDriverSchema);

module.exports = DeliveryDriver;
