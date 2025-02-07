const express = require("express");
const {
  getData,
  updateData,
} = require("../controllers/userProfileControllers");

const router = express.Router();

router.post("/profile", getData);
router.post("/update", updateData);

module.exports = router;
