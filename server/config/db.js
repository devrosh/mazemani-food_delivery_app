const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to database succesfully");
  } catch (error) {
    console.log("Error connecting database");
  }
};

module.exports = dbConnect;
