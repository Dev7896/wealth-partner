const express = require("express");
const {
  addStock,
  getAllStocks,
  updateStock,
  deleteStock,
  handleSell ,
} = require("../controllers/stockController.js");

const router = express.Router();

router.post("/add", addStock);
router.get("/", getAllStocks);
router.patch("/sell/:id", handleSell);
router.patch("/:id", updateStock);

module.exports = router;
