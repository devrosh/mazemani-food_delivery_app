const mongoose = require("mongoose");

const deliveryDriverSchema = new mongoose.Schema(
  {
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    currentLocation: {
      longitude: {
        type: Number,
        required: true,
      },
      latitude: {
        type: Number,
        required: true,
      },
      longitudeDelta: {
        type: Number,
        required: true,
      },
      latitudeDelta: {
        type: Number,
        required: true,
      },
    },
    vehicleType: {
      type: String,
      enum: ["Bike", "Scooter", "Car"],
      required: true,
    },
    vehicleNumber: {
      type: String,
      required: true,
    },
    numOfDeliveries: {
      type: String,
      default: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const DeliveryDriver = mongoose.model("DeliveryDriver", deliveryDriverSchema);

module.exports = DeliveryDriver;
