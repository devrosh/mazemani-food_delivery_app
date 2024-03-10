const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const { upload } = require("../middlewares/multerMiddleware");
const {
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getAllMenuItems,
} = require("../controllers/menuItemController");

router.post(
  "/create/:restaurantId",
  authMiddleware,
  upload.single("itemImage"),
  createMenuItem
);
router.put(
  "/update/:restaurantId/:itemId",
  authMiddleware,
  upload.single("itemImage"),
  updateMenuItem
);
router.get("/", getAllMenuItems);
router.delete("/delete/:restaurantId/:itemId", authMiddleware, deleteMenuItem);

module.exports = router;
