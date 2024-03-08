const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateUser,
  forgotPassword,
  resetPassword,
  logoutUser,
} = require("../controllers/userController");
const { upload } = require("../middlewares/multerMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/register", upload.single("profileImage"), registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:id/:token", resetPassword);
router.put("/edit", authMiddleware, upload.single("profileImage"), updateUser);
router.get("/logout", authMiddleware, logoutUser);

module.exports = router;
