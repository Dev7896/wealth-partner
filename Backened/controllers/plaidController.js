const express = require("express");
const plaid = require("plaid");
require("dotenv").config();

const router = express.Router();

const client = new plaid.PlaidApi(
  new plaid.Configuration({
    basePath: plaid.PlaidEnvironments.sandbox, // Change for production
    baseOptions: {
      headers: {
        "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
        "PLAID-SECRET": process.env.PLAID_SECRET,
      },
    },
  })
);

// Route to create a Link Token
router.post("/create-link-token", async (req, res) => {
  try {
    const response = await client.linkTokenCreate({
      user: { client_user_id: "user-123" }, // Unique user ID
      client_name: "Wealth Partner",
      products: [
        "auth",
        "identity",
        "investments",
        "liabilities",
        "transactions",
      ],
      country_codes: ["US"],
      language: "en",
    });

    res.json({ link_token: response.data.link_token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create link token" });
  }
});

// Route to exchange Public Token for Access Token
router.post("/exchange-token", async (req, res) => {
  try {
    const { public_token } = req.body;
    const response = await client.itemPublicTokenExchange({ public_token });
    res.json({ access_token: response.data.access_token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to exchange token" });
  }
});

router.post("/transactions", async (req, res) => {
  try {
    const { accessToken } = req.body;
    if (!accessToken) {
      return res.status(400).json({ error: "access token is required" });
    }

    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1); // Get transactions from the last month
    const endDate = new Date();

    const response = await client.transactionsGet({
      access_token: accessToken,
      start_date: startDate.toISOString().split("T")[0],
      end_date: endDate.toISOString().split("T")[0],
      options: { count: 10 }, // Limit to 10 transactions
    });

    res.json({ transactions: response.data.transactions });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

router.post("/yearly-transactions", async (req, res) => {
  try {
    const { accessToken } = req.body;
    if (!accessToken) {
      return res.status(400).json({ message: "Access token is required" });
    }

    const today = new Date();
    const startDate = new Date(
      today.getFullYear() - 1,
      today.getMonth(),
      today.getDate()
    ) // 12 months ago
      .toISOString()
      .split("T")[0];
    const endDate = today.toISOString().split("T")[0];

    const response = await client.transactionsGet({
      access_token: accessToken,
      start_date: startDate,
      end_date: endDate,
    });

    res.status(200).json({ transactions: response.data.transactions });
  } catch (error) {
    console.error("Error fetching yearly transactions:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
