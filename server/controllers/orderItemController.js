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

module.exports = { createOrderItem };
