const Sale = require("../models/sales");
const Stock = require('../models/stock');

const getAllSales = async (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // Find all stock related to the email and sum up the quantities
    const stocks = await Stock.find({ email });
    const totalStocks = stocks.reduce((sum, stock) => sum + stock.quantity, 0);

    // Fetch or create sales record
    let sales = await Sale.findOne({ email });

    if (!sales) {
      sales = await Sale.create({
        email,
        totalSales: 0,
        totalRevenue: 0,
        totalStocks, // Set totalStocks from calculated value
      });
      // console.log("New sales record created successfully");
    } else {
      // Update totalStocks in existing sales record
      sales.totalStocks = totalStocks;
      await sales.save();
    }

    res.status(200).json({
      totalSales: sales.totalSales,
      totalRevenue: sales.totalRevenue,
      totalStocks: sales.totalStocks, 
    });
  } catch (error) {
    console.error("Error fetching sales data:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {
  getAllSales,
};
