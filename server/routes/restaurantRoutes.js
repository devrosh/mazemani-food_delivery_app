const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  isRestaurantOwner,
} = require("../middlewares/authMiddleware");
const {
  addRestaurant,
  getRestaurants,
  updateRestaurant,
  deleteRestaurant,
} = require("../controllers/restaurantController");
const { upload } = require("../middlewares/multerMiddleware");

router.post(
  "/add",
  authMiddleware,
  isRestaurantOwner,
  upload.single("restaurantImage"),
  addRestaurant
);
router.get("/restaurants", getRestaurants);
router.put(
  "/update/:id",
  authMiddleware,
  upload.single("restaurantImage"),
  updateRestaurant
);
router.delete(
  "/delete/:id",
  authMiddleware,
  deleteRestaurant
);

module.exports = router;
