const Order = require("../models/orderModel");
const OrderItem = require("../models/orderItemModel");
const asyncHandler = require("../utils/asyncHandler");

//CREATE ORDER
const createOrder = asyncHandler(async (req, res) => {
  try {
    const { items, totalAmount, discountPercentage, status } = req.body;
    const userId = req.user._id;
    const { restaurantId } = req.params;

    // Create OrderItems from the provided data
    const orderItems = items.map((item) => {
      const { menuItem, quantity, subTotal } = item;
      return new OrderItem({ menuItem, quantity, subTotal });
    });

    // Calculate total amount after discount
    const discountedAmount = (discountPercentage / 100) * totalAmount;
    const finalAmount = totalAmount - discountedAmount;

    // Create the order
    const newOrder = await Order.create({
      user: userId,
      restaurant: restaurantId,
      items: orderItems,
      totalAmount,
      discountPercentage,
      totalAmountAfterDiscount: finalAmount,
      status,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating order" });
  }
});
//GET ALL ORDERS
const getAllOrders = asyncHandler(async (req, res) => {});
//GET A SINGLE ORDER
const getOrderById = asyncHandler(async (req, res) => {});
//UPDATE A ORDER
const updateOrderStatus = asyncHandler(async (req, res) => {});
//DELETE A ORDER
const deleteOrder = asyncHandler(async (req, res) => {});

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
