const express = require("express");

const router = express.Router();

const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  createOrderItem,
  getOrderItems,
  getOrderItem,
  removeOrderItem,
  updateOrderItem,
} = require("../controllers/orderItemController");

//Routes
router.post("/create/:menuItemId", authMiddleware, createOrderItem);
router.get("/order-items", authMiddleware, getOrderItems);
router.get("/item/:orderItemId", authMiddleware, getOrderItem);
router.put("/update/:orderItemId", authMiddleware, updateOrderItem);
router.delete("/:orderItemId", authMiddleware, removeOrderItem);

module.exports = router;
