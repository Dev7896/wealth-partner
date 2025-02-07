const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification"); // Import the model

// GET all notifications
router.post("/", async (req, res) => {
  const {email} = req.body;
  try {
    if(!email){
        return res.status(400).json({ error: "Email is required" });
    }
    const notifications = await Notification.find({ email }).sort({ date: -1 }); // Sort by latest
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

// POST add a new notification
router.post("/add", async (req, res) => {
  try {
    const { email, title, description, date, type, isRead } = req.body;
    const newNotification = new Notification({
      email,
      title,
      description,
      date,
      type,
      isRead,
    });
    await newNotification.save();
    res.status(201).json({ message: "Notification added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add notification" });
  }
});

// ✅ PATCH: Mark Notification as Read
router.patch("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await Notification.findByIdAndUpdate(id, { isRead: true });
      res.json({ message: "Notification marked as read" });
    } catch (error) {
      res.status(500).json({ error: "Failed to update notification" });
    }
  });
  
  // ✅ DELETE: Remove Notification
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await Notification.findByIdAndDelete(id);
      res.json({ message: "Notification deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete notification" });
    }
  });

module.exports = router;
