const Rating = require("../models/ratingModel");
const Restaurant = require("../models/restaurantModel");
const asyncHandler = require("../utils/asyncHandler");

//---- ADD RATING----
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
//----UPDATE RATING------
const updateRating = asyncHandler(async (req, res) => {
  try {
    const { ratingId } = req.params;
    const { rating, review } = req.body;
    const userId = req.user._id;
    const restaurant = await Restaurant.findOne();
    const resturantId = restaurant._id;

    if (!restaurant) {
      return res.status(400).json({ message: "No resturant found" });
    }
    const updatedRating = await Rating.findByIdAndUpdate(
      ratingId,
      {
        user: userId,
        restaurant: resturantId,
        review,
        rating,
      },
      {
        new: true,
      }
    );

    // Update the restaurant with the new rating
    restaurant.ratings.push(updatedRating);
    await restaurant.save();
    res.status(201).json({ message: "Rating updated succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding ratings" });
  }
});

//-----GET ALL RATINGS
const getallRatings = asyncHandler(async (req, res) => {
  try {
    const ratings = await Rating.find();
    if (!ratings) {
      return res.status(403).json({ message: "Ratings not found" });
    }
    res.status(200).json(ratings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching ratings" });
  }
});
//---- GET A RATING
const getRating = asyncHandler(async (req, res) => {
  const { ratingId } = req.params;
  try {
    const rating = await Rating.findById(ratingId);
    if (!rating) {
      return res.status(403).json({ message: "Ratings not found" });
    }
    res.status(200).json(rating);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching rating" });
  }
});
module.exports = { addRating, updateRating, getallRatings, getRating };
