const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
  businessName: { type: String, default : ''  },
  dateOfBirth: { type: Date,default : new Date("2000-01-01") },
  deviceInfo: { type: String, default: "" },
  email: { type: String,  unique: true , required : true },
  emailNotifications: { type: String, enum: ["on", "off"], default: "on" },
  income: { type: Number, default : 0 },
  loginInfo: { type: String, default: "" },
  phone: { type: String, default : '' },
  securityAnswer: { type: String, default: "" },
  siteNotifications: { type: String, enum: ["on", "off"], default: "on" },
  username: { type: String, default: "" },
});

const UserProfile = mongoose.model("UserProfile", UserProfileSchema);
module.exports = UserProfile;
