const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  email: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  date: { type: Date, default: Date.now }, // Store date as a Date object
  type: { type: String, enum: ["info", "warning", "success"], required: true },
  isRead: { type: Boolean, default: false },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

const Notification = mongoose.model("Notification", NotificationSchema);
module.exports = Notification;
