const Rating = require("../models/ratingModel");
const Restaurant = require("../models/restaurantModel");
const asyncHandler = require("../utils/asyncHandler");

// ADD RATING
const addRating = asyncHandler(async (req, res) => {
  try {
    const { rating, review } = req.body;
    const userId = req.user._id;
    const restaurant = await Restaurant.findOne();
    const resturantId = restaurant._id;

    if (!restaurant) {
      return res.status(400).json({ message: "No resturant found" });
    }
    const newRating = await Rating.create({
      user: userId,
      restaurant: resturantId,
      review,
      rating,
    });

    // Update the restaurant with the new rating
    restaurant.ratings.push(newRating);
    await restaurant.save();
    res.status(201).json({ message: "Rating added succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding ratings" });
  }
});

module.exports = { addRating };
