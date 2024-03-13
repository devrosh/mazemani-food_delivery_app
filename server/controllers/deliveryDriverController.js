const DeliveryDriver = require("../models/deliveryDriverModel");
const Order = require("../models/orderModel");

const asyncHandler = require("../utils/asyncHandler");

//--ADD NEW DRIVER---
const addDeliverydriver = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const {
    currentLocation,
    vehicleType,
    vehicleNumber,
    numOfDeliveries,
    isAvailable,
  } = req.body;
  const isAvailableBoolean = Boolean(isAvailable);
  try {
    const newDriver = await DeliveryDriver.create({
      driver: userId,
      currentLocation,
      vehicleType,
      vehicleNumber,
      numOfDeliveries,
      isAvailable: isAvailableBoolean,
    });
    res.status(201).json(newDriver);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering driver" });
  }
});

//---UPDATE  DRIVER DETAILS----
const updateDriver = asyncHandler(async (req, res) => {
  const { driverId } = req.params;
  const userId = req.user._id;
  const {
    currentLocation,
    vehicleType,
    vehicleNumber,
    numOfDeliveries,
    isAvailable,
  } = req.body;
  const isAvailableBoolean = Boolean(isAvailable);
  try {
    const updatedDriver = await DeliveryDriver.findByIdAndUpdate(
      driverId,
      {
        driver: userId,
        currentLocation,
        vehicleType,
        vehicleNumber,
        numOfDeliveries,
        isAvailable: isAvailableBoolean,
      },
      { new: true }
    );
    await updatedDriver.save();
    res.status(200).json(updatedDriver);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed" });
  }
});

//----GET ALL DRIVERS----
const getAllDrivers = asyncHandler(async (req, res) => {
  try {
    const drivers = await DeliveryDriver.find();
    if (!drivers) {
      res.status(400).json({ message: "No drivers found" });
    }
    res.status(200).json(drivers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching drivers" });
  }
});
//--GET A DRIVER----
const getDriver = asyncHandler(async (req, res) => {
  const { driverId } = req.params;
  try {
    const driver = await DeliveryDriver.findById(driverId);
    if (!driver) {
      res.status(400).json({ message: "Driver not found" });
    }
    res.status(200).json(driver);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching driver" });
  }
});

//ASSIGN ORDER TO DRIVER
const assignOrderToDriver = asyncHandler(async (req, res) => {
  const { orderId, driverId } = req.body;

  try {
    // Find the order by orderId
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Find the delivery driver by driverId
    const driver = await DeliveryDriver.findById(driverId);

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    // Check if the driver is available
    if (!driver.isAvailable) {
      return res.status(400).json({ message: "Driver is not available" });
    }

    // Assign the order to the driver
    order.deliveryDriver = driverId;

    // Update the order status to "Assigned"
    order.status = "Assigned";

    // Save the changes
    await order.save();

    // Update the driver's status to "Busy"
    driver.isAvailable = false;
    await driver.save();

    res
      .status(200)
      .json({ message: "Order assigned to the driver successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error assigning order to the driver" });
  }
});

module.exports = {
  addDeliverydriver,
  getAllDrivers,
  getDriver,
  assignOrderToDriver,
  updateDriver,
};
