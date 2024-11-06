const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");
dotenv.config();
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ username, email, password });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Error => " + error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }


    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "180d",
    });

    res.status(201).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
