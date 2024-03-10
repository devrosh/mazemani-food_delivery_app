const express = require("express");

const router = express.Router();

const { authMiddleware } = require("../middlewares/authMiddleware");
const { createOrderItem } = require("../controllers/orderItemController");

//Routes
router.post("/create/:menuItemId", authMiddleware, createOrderItem);

module.exports = router;
