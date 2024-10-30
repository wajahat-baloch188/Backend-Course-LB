const express = require("express");

const router = express.Router();

const { login, signup } = require("../Controllers/Auth.controller.js");

const {
  auth,
  isAdmin,
  isStudent,
} = require("../middlewares/auth.middleware.js");
const User = require("../models/user.model.js");

// router.post('/login', login)
router.post("/signup", signup);
router.post("/login", login);

// protected route

router.get("/test", auth, (req, res) => {
  // testing route
  res.json({
    success: true,
    message: "Welcome to the protected route for test",
  });
});

router.get("/student", auth, isStudent, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the protected route for students",
  });
});

router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the protected route for admin",
  });
});
/*
router.get("/getEmail", auth, async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id);
        
        res.status(200).json({
      success: true,
      user: user,
      message: "welcome to the email route",
    });
} catch (error) {
    res.status(400).json({
        success: false,
        error: error.message,
        message: "phat gaya code",
    });
}
});
*/

module.exports = router;
