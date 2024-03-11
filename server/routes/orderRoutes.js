const express = require("express");

const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
router.post("/create", authMiddleware, createOrder);
router.get("/", authMiddleware, getAllOrders);
router.get("/:orderId", authMiddleware, getSingleOrder);
router.put("/:orderId", authMiddleware, updateOrder);
router.delete("/delete/:orderId", authMiddleware, deleteOrder);

module.exports = router;
