const express = require("express");

const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");
router.post("/create/:resturantId", authMiddleware, createOrder);
router.get("/", authMiddleware, getAllOrders);
router.get("/:orderId", authMiddleware, getOrderById);
router.put("/:orderId/status", authMiddleware, updateOrderStatus);
router.delete("/delete/:orderId", authMiddleware, deleteOrder);

module.exports = router;
