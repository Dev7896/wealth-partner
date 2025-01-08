const mongoose = require("mongoose");
const express = require("express");
const router = require("./routes/authRoutes");
const cors = require("cors");
require("dotenv").config();
const { checkEmail } = require("./middlewares/checkEmail");

// configuration of db
const { dbConfig } = require("./config/db/dbConfig");

// db url
const connectionUrl = process.env.DB_URL;

// configure db
dbConfig(connectionUrl);

const port = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/generateOtp/:id", checkEmail);

app.use(
  cors({
    origin: "http://localhost:5173", // Allow your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow necessary HTTP methods
    credentials: true, // If you need to send cookies or headers
  })
);

app.use(router);

app.listen(port, () => console.log(`listening on port ${port}`));
