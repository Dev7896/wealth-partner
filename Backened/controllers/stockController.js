const Category = require("../models/category");
const Stock = require("../models/stock");
const Sale = require("../models/sales");
const mongoose = require("mongoose");
// Add New Stock
const addStock = async (req, res) => {
  try {
    const { email, name, quantity, price, category } = req.body;

    // Validate category
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(400).json({ message: "Invalid category" });
    }

    // Create new stock item
    const newStock = new Stock({
      email,
      name,
      quantity,
      price,
      category,
    });

    await newStock.save();

    // Find or create a sales record for the user
    let sales = await Sale.findOne({ email });
    if (!sales) {
      sales = new Sale({
        email,
        totalSales: 0,
        totalRevenue: 0,
        income: [],
        expenses: [],
      });
    }

    // Add to expenses array
    sales.expenses.push({
      stockName: name,
      price: price,
      quantity: quantity,
      time: new Date(),
    });

    await sales.save();

    res
      .status(201)
      .json({ message: "Stock added successfully", stock: newStock });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Stocks
const getAllStocks = async (req, res) => {
  const { email } = req.query; // Use req.query to access query params
  try {
    const stocks = await Stock.find({ email }) // Filter by email
      .populate("category", "name"); // Populate category name
    res.status(200).json({ stocks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Stock
const updateStock = async (req, res) => {
  const { id } = req.params;
  const { name, quantity, price, category } = req.body;

  try {
    // Validate category and get its ObjectId
    const existingCategory = await Category.findOne({ name: category });
    if (!existingCategory) {
      return res.status(400).json({ message: "Invalid category" });
    }

    // Use the category's ObjectId instead of its name
    const updatedStock = await Stock.findByIdAndUpdate(
      id,
      { name, quantity, price, category: existingCategory._id }, // Use ObjectId
      { new: true }
    );

    if (!updatedStock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    const sales = await Sale.findOne({ email: updatedStock.email });

    // Check if stock already exists in expenses
    const existingExpenseIndex = sales.expenses.findIndex(
      (item) => item.stockName === updatedStock.name
    );

    if (existingExpenseIndex !== -1) {
      // If it exists, update it
      sales.expenses[existingExpenseIndex] = {
        ...sales.expenses[existingExpenseIndex],
        stockName: name,
        price,
        quantity,
      };
    } else {
      // If it doesn't exist, add it as a new entry
      sales.expenses.push({
        stockName: name,
        price,
        quantity,
        time: new Date(), // Current time
      });
    }

    // Save updated sales document
    await sales.save();

    res
      .status(200)
      .json({ message: "Stock updated successfully", stock: updatedStock });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Stock
const deleteStock = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the stock item
    const deletedStock = await Stock.findByIdAndDelete(id);

    if (!deletedStock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    res.status(200).json({ message: "Stock deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const handleSell = async (req, res) => {
  try {
    const stockId = req.params.id;
    const stock = await Stock.findById(stockId);

    if (!stock) {
      return res.status(404).json({ error: "Stock not found" });
    }

    if (stock.quantity <= 0) {
      return res.status(400).json({ error: "Stock is already empty" });
    }

    // const email = stock.email;
    // const price = stock.price;
    const { email, name, price } = stock;

    // Reduce stock quantity by 1
    stock.quantity -= 1;
    await stock.save();

    // Find or create a sales record for the user
    let sales = await Sale.findOne({ email });
    if (!sales) {
      sales = new Sale({
        email,
        totalSales: 0,
        totalRevenue: 0,
        income: [],
        expenses: [],
      });
    }

    sales.totalSales += 1;
    sales.totalRevenue += price;

    // Add to income array
    sales.income.push({
      stockName: name,
      price: price,
      quantity: 1,
      time: new Date(),
    });

    await sales.save();

    res.json({ message: "Stock sold successfully" });
  } catch (error) {
    console.error("Error selling stock:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addStock,
  getAllStocks,
  updateStock,
  deleteStock,
  handleSell,
};
