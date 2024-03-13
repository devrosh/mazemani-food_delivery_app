const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/db.js");
const userRoutes = require("./routes/userRoutes.js");
const restaurantRoutes = require("./routes/restaurantRoutes.js");
const menuItemRoutes = require("./routes/menuItemRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const orderItemRoutes = require("./routes/orderItemRoutes.js");
const ratingRoutes = require("./routes/ratingRoutes.js");
const deliveryDriverRoutes = require("./routes/deliveryDriverRoutes.js");
const app = express();
dotenv.config();
dbConnect();
const port = process.env.PORT;

//-----Middlewares---------
app.use(express.json({ limit: "16mb" }));
app.use(express.urlencoded({ extended: true }, { limit: "10mb" }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.static("public"));
app.use(cookieParser());

//------Routes------
app.use("/api/user", userRoutes);
app.use("/api/restaurant", restaurantRoutes);
app.use("/api/menu-item", menuItemRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/order-item", orderItemRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/delivery-driver", deliveryDriverRoutes);

//-----Server initialisation
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
