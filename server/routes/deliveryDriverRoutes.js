const express = require("express");

const router = express.Router();
const {
  authMiddleware,
  isDeliveryDriver,
} = require("../middlewares/authMiddleware");
const {
  addDeliverydriver,
  getAllDrivers,
  getDriver,
  assignOrderToDriver,
  updateDriver,
  updateDriverLocation,
  orderTrackingInfo,
} = require("../controllers/deliveryDriverController");

router.post("/add", authMiddleware, addDeliverydriver);
router.post("/update-location/:driverId", authMiddleware, updateDriverLocation);
router.get("/", getAllDrivers);
router.get("/:driverId", getDriver);
router.get("/order-tracking/:orderId", authMiddleware, orderTrackingInfo);
router.put("/:driverId", authMiddleware, isDeliveryDriver, updateDriver);
router.put("/assign-order", authMiddleware, assignOrderToDriver);

module.exports = router;
