const express = require("express");

const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  addRating,
  updateRating,
  getallRatings,
  getRating,
} = require("../controllers/ratingController");

router.post("/create", authMiddleware, addRating);
router.get("/", getallRatings);
router.get("/:ratingId", getRating);
router.put("/update/:ratingId", authMiddleware, updateRating);

module.exports = router;
