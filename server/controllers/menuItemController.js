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

    const { name, description, price, category, discountPercentage } = req.body;

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
      discountPercentage,
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
const updateMenuItem = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const { restaurantId, itemId } = req.params;

    // Check ownership of the restaurant
    const restaurant = await Restaurant.findOne({
      _id: restaurantId,
      owner: user._id,
    });

    if (!restaurant) {
      return res
        .status(403)
        .json({ message: "You are not the owner of this restaurant" });
    }

    // Find the menu item within the restaurant's menu array
    const menuItemIndex = restaurant.menu.findIndex(
      (item) => item.toString() === itemId
    );

    if (menuItemIndex === -1) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    // Update the menu item properties
    const { name, description, price, category, discountPercentage } = req.body;

    // Check if a new image file is provided
    let itemImage;
    if (req.file) {
      // Getting the local file path for the image to upload to Cloudinary
      const itemImageLocalPath = req.file.path;

      // UPLOADING IMAGE FILE TO CLOUDINARY
      itemImage = await uploadFileToCloudinary(itemImageLocalPath);
      if (!itemImage) {
        res.json({ message: "Image file is not uploaded " });
        return;
      }
    }

    // Update the properties of the existing menu item
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      itemId,
      {
        name,
        description,
        price,
        category,
        discountPercentage,
        // Assign the new image URL only if an image is provided
        ...(itemImage && { itemImage: itemImage.url }),
      },
      { new: true }
    );

    // Save the updated restaurant with the modified menu item
    await restaurant.save();

    res.status(200).json(updatedMenuItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//----- Delete Menu item-------
const deleteMenuItem = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const { restaurantId, itemId } = req.params;

    // Check if the user is the owner of the restaurant
    const restaurant = await Restaurant.findOne({
      _id: restaurantId,
      owner: user._id,
    });

    if (!restaurant) {
      return res
        .status(403)
        .json({ message: "You are not the owner of this restaurant" });
    }

    // Check if the menu item exists
    const menuItem = await MenuItem.findByIdAndDelete(itemId);

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    // Removing menu item from the restaurant's menu array
    restaurant.menu.pull(itemId);

    // Saving updated restaurant without the deleted menu item
    await restaurant.save();

    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
//----Get all menu items
const getAllMenuItems = asyncHandler(async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    if (!menuItems) {
      return res.status(400).json({ message: "Mneu items not found" });
    }
    res.status(200).json(menuItems);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error fetching menu items" });
  }
});

module.exports = {
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getAllMenuItems,
};
