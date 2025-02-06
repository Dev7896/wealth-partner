const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  email: { type: String, required: true ,trim :true },
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
