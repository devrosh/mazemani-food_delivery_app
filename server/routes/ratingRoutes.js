const express = require("express");

const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const { addRating } = require("../controllers/ratingController");

router.post("/create", authMiddleware, addRating);

module.exports = router;
