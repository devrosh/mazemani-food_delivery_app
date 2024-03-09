const MenuItem = require("../models/menuItemModel");
const Restaurant = require("../models/restaurantModel");
const asyncHandler = require("../utils/asyncHandler");
const { uploadFileToCloudinary } = require("../utils/cloudinary.js");

//-------------------------------------------------------------------------------
//---Create Menu Item
const createMenuItem = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const { restaurantId } = req.params;
    //Checking the ownership
    const restaurant = await Restaurant.findOne({
      _id: restaurantId,
      owner: user._id,
    });

    if (!restaurant) {
      return res
        .status(403)
        .json({ message: "You are not the owner of this restaurant" });
    }

    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({
        message: "Name, description, price, and category are required",
      });
    }
    //Getting the local file path for image to upload to cloudinary
    const itemImageLocalPath = req.file?.path;

    console.log(itemImageLocalPath);
    if (!itemImageLocalPath) {
      res.json({ message: "Image is required" });
      return;
    }

    //UPLOADING IMAGE FILE IN CLOUDINARY
    const itemImage = await uploadFileToCloudinary(itemImageLocalPath);
    if (!itemImage) {
      res.json({ message: "Image file is not uploaded " });
      return;
    }

    const newMenuItem = new MenuItem({
      name,
      description,
      price,
      category,
      restaurant: restaurantId, // Set the reference to the restaurant
      itemImage: itemImage.url,
    });

    await newMenuItem.save();
    // Push the new menu item into the restaurant's menu array
    restaurant.menu.push(newMenuItem);

    // Save the updated restaurant with the new menu item
    await restaurant.save();

    res.status(201).json(newMenuItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
//-------Update menu item-------

module.exports = { createMenuItem };
