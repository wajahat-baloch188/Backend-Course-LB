const bcrypt = require("bcrypt");
const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// signup route handler
exports.signup = async (req, res) => {
  try {
    //get data
    const { name, email, password, role } = req.body;

    // check if user is already exist
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, msg: "User already exists" });
    }

    //secure password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, msg: "Error in Hashing Password" });
    }

    // create entry for new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(200).json({
      success: true,
      msg: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      msg: "user cannot be registered, please try again letter",
    });
  }
};

// login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation on email and password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details carefully",
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered",
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };
    // verify password & generate a jwt token

    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      // make new entry in user
      user = user.toObject();
      user.token = token;

      user.password = undefined;
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // expire in 3 days
        httpOnly: true, // you cannot acces token client side
      };

     
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "user loggedIn Successfully",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Password incorrect",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      msg: "login failure",
    });
  }
};
