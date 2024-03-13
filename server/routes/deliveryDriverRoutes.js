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
} = require("../controllers/deliveryDriverController");

router.post("/add", authMiddleware, addDeliverydriver);
router.get("/", getAllDrivers);
router.get("/:driverId", getDriver);
router.put("/:driverId",authMiddleware,isDeliveryDriver,updateDriver);
router.put("/assign-order", authMiddleware, assignOrderToDriver);

module.exports = router;
