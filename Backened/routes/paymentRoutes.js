const express = require("express");
const Razorpay = require("razorpay");
require("dotenv").config();
const User = require("../models/user");

const router = express.Router();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Order API
router.post("/create-order", async (req, res) => {
  const { email, amount } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    
    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const options = {
      amount: amount * 100, // Amount in paise (e.g., ₹500 = 50000 paise)
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    const user = await User.findOne({ email: email }); // Await the query
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.paymentDone = true;
    await user.save();

    res.json({ order, message: "Order created successfully, payment status updated" });

  } catch (error) {
    console.error("Error in create-order:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
