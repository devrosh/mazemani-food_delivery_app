const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const asyncHandler = require("../utils/asyncHandler");
const { uploadFileToCloudinary } = require("../utils/cloudinary.js");
const generateAccessToken = require("../config/accessToken.js");
const generateRefreshToken = require("../config/refreshToken.js");

//-----------------------------------------------------------
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password, address } =
      req.body;
    const user = await User.findOne({ email: email });

    if (user) {
      res.json({ message: "User already exists" });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      //Getting the local file path for image to upload to cloudinary
      const profileImgLocalPath = req.file?.path;

      console.log(profileImgLocalPath);
      if (!profileImgLocalPath) {
        res.json({ message: "Image is required" });
        return;
      }

      //UPLOADING IMAGE FILE IN CLOUDINARY
      const profileImage = await uploadFileToCloudinary(profileImgLocalPath);
      if (!profileImage) {
        res.json({ message: "Image file is not uploaded " });
        return;
      }
      const newUser = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        phoneNumber: phoneNumber,
        address: address,
        profileImage: profileImage.url,
      });
      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(400).json({ message: "registration failed" });
    console.log(error);
  }
});

//Login User

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    const isValidPassword = await bcrypt.compare(password, user.password);

    // Generate & store refresh and access Token to the Cookies in the browser headers
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 72 * 60 * 60 * 1000,
      sameSite: "none",
    });

    if (user && isValidPassword) {
      res.json({
        _id: user?._id,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        address: user?.address,
        profileImage: user?.profileImage,
        accessToken: accessToken,
      });
    } else {
      res.status(200).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error Logging User" });
  }
});

//Update user deatils
const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  try {
    const { firstName, lastName, email, phoneNumber, password, address } =
      req.body;

    // Getting the local file path for the image to upload to cloudinary
    const profileImgLocalPath = req.file?.path;

    // Create an object with only the fields that should be updated
    const updatedFields = {};

    if (firstName) updatedFields.firstName = firstName;
    if (lastName) updatedFields.lastName = lastName;
    if (email) updatedFields.email = email;
    if (password) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      updatedFields.password = hashedPassword;
    }
    if (phoneNumber) updatedFields.phoneNumber = phoneNumber;
    if (address) updatedFields.address = address;

    // Handle profile image update
    if (profileImgLocalPath) {
      // UPLOADING IMAGE FILE TO CLOUDINARY
      const profileImage = await uploadFileToCloudinary(profileImgLocalPath);
      if (!profileImage) {
        return res.status(400).json({ message: "Image file upload failed" });
      }
      updatedFields.profileImage = profileImage.url;
    }

    // Update the user with the validated and sanitized fields
    const updatedUser = await User.findByIdAndUpdate(_id, updatedFields, {
      new: true,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).json({ message: "Error updating user" });
  }
});

//----Forgot Password----------

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "15m",
      });

      const resetLink = `http://localhost:3000/reset-password/${user._id}/${token}`;
      res.json({ message: "Pasword reset link is sent to your email" });

      console.log(resetLink);

      //Sending email to user
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      const info = await transporter.sendMail({
        from: "roshrkd@gmail.com",
        to: user.email,
        subject: `Hello ${user.firstName}, Please check the link sent to your email account`,

        html: `<a href=${resetLink}>Click here<a/>
       to reset your password`,
      });
    } else {
      res.json({ message: "User not found in database" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ messge: "internal server error" });
  }
};

//------Reset Password--------------------
const resetPassword = async (req, res) => {
  try {
    const { id, token } = req.params;

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Update the user's password in the database
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "User password saved" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(400).json({ message: "Token has expired" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
//---LogOut user-----------------------------------------------
const logoutUser = asyncHandler(async (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.json({ message: "User logged out" });
  } catch (error) {
    res.json({ message: "Logout failed" });
  }
});

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  resetPassword,
  forgotPassword,
  logoutUser,
};
