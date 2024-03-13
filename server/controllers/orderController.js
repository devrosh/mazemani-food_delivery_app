const Order = require("../models/orderModel");
const OrderItem = require("../models/orderItemModel");
const Restaurant = require("../models/restaurantModel");
const asyncHandler = require("../utils/asyncHandler");

//CREATE ORDER
const createOrder = asyncHandler(async (req, res) => {
  try {
    const { status } = req.body;

    const userId = req.user._id;

    const items = await OrderItem.find().populate("menuItem");
    const resturantId = items.length > 0 ? items[0].menuItem.restaurant : null;
    console.log(resturantId);

    // Create OrderItems from the provided data
    const orderItems = items.map((item) => {
      const { menuItem, quantity, subTotal } = item;

      return new OrderItem({ menuItem, quantity, subTotal });
    });

    // Calculate total amount before discount by adding order items subTotal..
    let totalAmount = items.reduce((acc, item) => acc + item.subTotal, 0);

    // Calculate total amount after discount
    const discountedAmount = items.reduce((acc, item) => {
      let discountPercentage = items[0].menuItem.discountPercentage || 0;
      return acc + (item.subTotal * discountPercentage) / 100;
    }, 0);

    let totalAmountAfterDiscount = totalAmount - discountedAmount;

    // Create the order
    const newOrder = await Order.create({
      user: userId,
      restaurant: resturantId,
      items: orderItems,
      totalAmount,
      totalAmountAfterDiscount,
      status,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating order" });
  }
});
//GET ALL ORDERS
const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find();
    if (!orders) {
      return res.status(400).json({ message: "Orders not found" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.json({ message: "Error fetching orders" });
  }
});
//GET A SINGLE ORDER
const getSingleOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      res.status(400).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching order" });
  }
});
//UPDATE A ORDER
const updateOrder = asyncHandler(async (req, res) => {
  try {
    const { status } = req.body;
    const orderId = req.params.orderId;

    // Fetch the existing order
    const existingOrder = await Order.findById(orderId);

    if (!existingOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update the status
    existingOrder.status = status;

    // Save the updated order
    await existingOrder.save();

    res.status(200).json({ message: "Order status updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating order status" });
  }
});

//DELETE A ORDER
const deleteOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      res.status(400).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting order" });
  }
});

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};
