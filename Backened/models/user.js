const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [50, "Username cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      select: false, // Do not return password in queries
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    resetPasswordToken: {
      type: String,
      select: false, // Do not return this in queries
    },
    resetPasswordExpires: {
      type: Date,
      select: false,
    },
    paymentDone : {
      type : Boolean,
      default : false
    } 
  },
  {
    timestamps: true,
  }
);

// pre middleware for hashing password before saving to db
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Check if password is modified

  try {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next(); // Proceed with the save operation
  } catch (error) {
    next(error); // Pass the error to the next middleware (error handling)
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
