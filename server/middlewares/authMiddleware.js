const User = require("../models/userModel");
const Restaurant = require("../models/restaurantModel");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded?.id);
      req.user = user;
      req.token = token;
      next();
    } catch (error) {
      res.json({ message: "Token expired,please login again" });
    }
  } else {
    res.json({ message: "No token attached" });
  }
};

const isAdmin = async (req, res, next) => {
  const { email } = req.user;
  const user = await User.findOne({ email });
  if (user.role !== "Admin") {
    res.json({ message: "You are not admin user" });
  } else {
    next();
  }
};
const isRestaurantOwner = async (req, res, next) => {
  try {
    const { email } = req.user;
    const user = await User.findOne({ email });

    if (user.role !== "Restaurant Owner") {
      res.json({ message: "You are not a restaurant owner" });
    } else {
      // Check if the user already owns a restaurant
      const ownedRestaurants = await Restaurant.find({ owner: user._id });

      if (ownedRestaurants.length >= 1) {
        res.json({ message: "You can only add one restaurant" });
      } else {
        next();
      }
    }
  } catch (error) {
    console.error("Error in isRestaurantOwner middleware:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const isDeliveryDriver = async (req, res, next) => {
  const { email } = req.user;
  const user = await User.findOne({ email });
  if (user.role !== "Delivery Driver") {
    res.json({ message: "You are not a delivery driver" });
  } else {
    next();
  }
};
module.exports = {
  authMiddleware,
  isAdmin,
  isDeliveryDriver,
  isRestaurantOwner,
};
