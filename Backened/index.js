const mongoose = require("mongoose");
const express = require("express");
const router = require("./routes/authRoutes");
const stockRoutes = require("./routes/stockRoutes.js");
const categoryRoutes = require("./routes/categoryRoutes");
const paymentRoutes = require("./routes/paymentRoutes.js");
const plaidRoutes = require("./controllers/plaidController.js");
const salesRoutes = require('./routes/salesRoutes.js');
const notificationRoutes = require('./routes/Notifications.js')
const userProfileRoutes = require('./routes/userProfileRoutes.js')
const cors = require("cors");
require("dotenv").config();
const { checkEmail } = require("./middlewares/checkEmail");

// configuration of db
const { dbConfig } = require("./config/db/dbConfig");

// db url
const connectionUrl = process.env.DB_URL;

// configure db
dbConfig(connectionUrl);
// console.log('hello world')
const port = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/generateOtp/:id", checkEmail);

app.use(
  cors({
    origin: "http://localhost:5173", // Allow your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Allow necessary HTTP methods
    credentials: true, // If you need to send cookies or headers
  })
);

app.use(router);
app.use("/api/stocks", stockRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/plaid", plaidRoutes);
app.use("/api/sales", salesRoutes);
app.use('/api/notifications', notificationRoutes)
app.use('/api/user', userProfileRoutes)

app.listen(port, () => console.log(`listening on port ${port}`));
