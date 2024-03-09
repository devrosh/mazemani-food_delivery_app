const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  isRestaurantOwner,
} = require("../middlewares/authMiddleware");
const { upload } = require("../middlewares/multerMiddleware");
const { createMenuItem } = require("../controllers/menuItemController");

router.post(
  "/create/:restaurantId",
  authMiddleware,
  upload.single("itemImage"),
  createMenuItem
);

module.exports = router;
