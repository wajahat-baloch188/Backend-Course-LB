const express = require("express");
const User = require("../models/User.Model.js"); // Adjust path if necessary

const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log(name, email);

    let userExist = await User.findOne({ email });

    let hashedPassword;

    if (userExist) {
      res.status(401).json({
        status: false,
        message: "Email already exist please login",
      });
    } else {
      hashedPassword = await bcrypt.hash(password, 10);
      // Create a new user instance
      const newUser = new User({ name, email, password: hashedPassword, role });

      // Save the user to the database
      await newUser.save();
    }

    res.status(200).json({
      success: true,
      message: "Signup successful",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Signup failed",
      error: error.message,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter email and password",
      });
    }

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(404).json({
        success: false,
        message: "User does not exist. Please sign up.",
      });
    }

    const passwordCheck = await bcrypt.compare(password, userExist.password);
    if (!passwordCheck) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Successful login
    return res.status(200).json({
      success: true,
      message: "Successfully logged in",
      user: {
        name: userExist.name,
        email: userExist.email,
        role: userExist.role,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during login",
      error: error.message,
    });
  }
};

module.exports = { signUp, signIn };
