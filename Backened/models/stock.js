const mongoose = require("mongoose");

const stockSchema = mongoose.Schema(
  {
    email: { type: String, required: true, trim : true },
    name: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

// Creating the Stock model from the schema
const Stock = mongoose.model("Stock", stockSchema);

// Exporting the Stock model to use in other parts of the application
module.exports = Stock  ;