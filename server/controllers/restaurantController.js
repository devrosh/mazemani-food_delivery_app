const Restaurant = require("../models/restaurantModel");
const asyncHandler = require("../utils/asyncHandler");
const { uploadFileToCloudinary } = require("../utils/cloudinary.js");

// --Add new restaurant
const addRestaurant = asyncHandler(async (req, res) => {
  try {
    const { name, description, menu, location, ratings, orders } = req.body;
    // Get the user ID from the authenticated user
    const owner = req.user._id;
    const restaurant = await Restaurant.findOne({ name: name });
    if (restaurant) {
      return res.status(200).json({ message: "Restaurant already exists" });
    }

    //Getting the local file path for image to upload to cloudinary
    const restaurantImgLocalPath = req.file?.path;

    console.log(restaurantImgLocalPath);
    if (!restaurantImgLocalPath) {
      res.json({ message: "Image is required" });
      return;
    }

    //UPLOADING IMAGE FILE IN CLOUDINARY
    const restaurantImage = await uploadFileToCloudinary(
      restaurantImgLocalPath
    );
    if (!restaurantImage) {
      res.json({ message: "Image file is not uploaded " });
      return;
    }

    const newRestaurant = await Restaurant.create({
      name: name,
      description: description,
      location: location,
      menu: menu,
      ratings: ratings,
      owner: owner,
      orders: orders,
      restaurantImage: restaurantImage.url,
    });
    res.status(200).json(newRestaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
//Get all restaurants------
const getRestaurants = asyncHandler(async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
//--Update Restaurant---
const updateRestaurant = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params; // id of the restaurant
    const { name, description, menu, location, ratings, orders } = req.body;
    const owner = req.user._id;
    const user = req.user; //logged in user
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    if (restaurant.owner.toString() !== user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not the owner of this restaurant" });
    }
    const restaurantImageLocalPath = req.file?.path;
    // Use optional chaining to avoid errors if no image is provided

    //UPLOADING IMAGE FILE IN CLOUDINARY
    const restaurantImage = await uploadFileToCloudinary(
      restaurantImageLocalPath
    );
    if (!restaurantImage) {
      res.json({ message: "Image file is not uploaded " });
      return;
    }
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      id,
      {
        name,
        description,
        menu,
        location,
        ratings,
        orders,
        owner: owner,
        restaurantImage: restaurantImage.url,
      },
      { new: true }
    );

    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(updatedRestaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: " Error updating restaurants" });
  }
});

//--Delete restaurant---
const deleteRestaurant = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(403).json({ message: "Restaurant not found" });
    } else {
      // Check if the authenticated user is the owner of the restaurant
      if (restaurant.owner.toString() !== user._id.toString()) {
        return res
          .status(403)
          .json({ message: "You are not the owner of this restaurant" });
      }
      res.status(200).json({ message: "Restaurant deleted succesfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting restaurant" });
  }
});

module.exports = {
  addRestaurant,
  getRestaurants,
  updateRestaurant,
  deleteRestaurant,
};
