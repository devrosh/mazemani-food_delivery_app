const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderItem" }],
  totalAmount: { type: Number, required: true },
  discountPercentage: { type: Number, default: 0 }, // Added discount percentage
  totalAmountAfterDiscount: { type: Number },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "In Progress", "Delivered", "Cancelled"],
  },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
