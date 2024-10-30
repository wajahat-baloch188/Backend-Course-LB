const { default: mongoose } = require("mongoose");
const User = require("../models/user.model.js"); // Make sure your model is correctly named as 'User'

const userCreateController = async (req, res) => {
  try {
    const { username } = req.body;

    // Check if the username is provided
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    // Create the user and store the result in a variable
    const newUser = await User.create({ username });

    // Respond with the created user data
    res.status(201).json({
      success: true,
      data: newUser,
      message: "User created successfully",
    });
  } catch (error) {
    console.log("user creation error", error);

    // Respond with the error message
    res.status(500).json({
      success: false,
      data: "internal server error",
      message: error.message,
    });
  }
};

module.exports = userCreateController;
