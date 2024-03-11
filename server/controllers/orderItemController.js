const OrderItem = require("../models/orderItemModel");
const Order = require("../models/orderModel");
const MenuItem = require("../models/menuItemModel");
const asyncHandler = require("../utils/asyncHandler");

// CREATE ORDER ITEM
const createOrderItem = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { menuItemId } = req.params;
    const { quantity } = req.body;

    // Retrieve the corresponding menu item
    const menuItem = await MenuItem.findById(menuItemId);

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    const subTotal = menuItem.price * quantity;

    // Create the new order item
    const newOrderItem = await OrderItem.create({
      menuItem: menuItemId,
      quantity,
      subTotal,
    });

    // Find the order associated with the user and restaurant
    let order = await Order.findOne({
      user: userId,
      restaurant: menuItem.restaurant,
      status: "Pending", // Adjust based on your order flow
    });

    // If no order exists, create a new order for the user and restaurant
    if (!order) {
      console.log("Order not found. Creating a new order.");
      order = await Order.create({
        user: userId,
        restaurant: menuItem.restaurant,
        totalAmount: 0,
        discountPercentage: 0,
        totalAmountAfterDiscount: 0,
        status: "Pending", // Adjust based on your order flow
      });
    }

    // Push the new order item into the items array of the order
    order.items.push(newOrderItem._id);

    // Update the total amount in the order based on the new order item
    order.totalAmount += subTotal;

    await order.save();
    await newOrderItem.save();

    res.status(201).json(newOrderItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding order item" });
  }
});
// GET ALL ORDER ITEMS
const getOrderItems = asyncHandler(async (req, res) => {
  try {
    const orderItems = await OrderItem.find().populate();
    if (!orderItems) {
      return res.status(200).json({ message: "Order items not found" });
    }
    res.status(200).json(orderItems);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching order items" });
  }
});

//GET A SINGLE ORDER ITEM
const getOrderItem = asyncHandler(async (req, res) => {
  const { orderItemId } = req.params;
  try {
    const orderItem = await OrderItem.findById(orderItemId);
    if (!orderItem) {
      res.status(400).json({ message: "No item found" });
    }
    res.status(200).json(orderItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching order item" });
  }
});
//UPDATE ORDER ITEM
const updateOrderItem = asyncHandler(async (req, res) => {
  const { orderItemId } = req.params;
  const { quantity } = req.body;
  try {
    // Find the existing order item
    const orderItem = await OrderItem.findById(orderItemId).populate(
      "menuItem"
    );

    if (!orderItem) {
      return res.status(404).json({ message: "Order item not found" });
    }
    // Update the quantity
    orderItem.quantity = quantity;

    // Recalculate the subtotal based on the new quantity
    let subTotal = quantity * orderItem.menuItem.price;

    // Update the subTotal property
    orderItem.subTotal = subTotal;

    // Save the updated order item
    await orderItem.save();
    res.status(200).json(orderItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating order item" });
  }
});

// DELETE OR REMOVE ORDER ITEM
const removeOrderItem = asyncHandler(async (req, res) => {
  const { orderItemId } = req.params;
  try {
    const orderItem = await OrderItem.findByIdAndDelete(orderItemId);
    if (!orderItem) {
      return res.status(400).json({ message: "Order items mot found" });
    }
    res.status(200).json({ message: "Order item deleted succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting order item" });
  }
});

module.exports = {
  createOrderItem,
  getOrderItems,
  getOrderItem,
  updateOrderItem,
  removeOrderItem,
};
