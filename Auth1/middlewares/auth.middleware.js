// auth, isStudent, isAdmin
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    // extract jwt token
    // PENDING: other ways to fetch token
    // 3 ways to get token
    console.log("cookies", req.cookies.token);
    console.log("body", req.body.token);
    // console.log("header", req.header("Authorization"))
    const token =
      req.body.token ||
      req.cookies.token ||
      req.header("Authorization").replace("Bearer", "").trim();
   
    if (!token || token === undefined) {
      return res.status(401).json({
        success: false,
        message: "token missing",
      });
    }

    // verify the token
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      console.log(payload);
      req.user = payload;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "something went wrong while verifying the token",
    });
  }
};

exports.isStudent = (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for student",
      });
    }
    next();
  } catch (error) {
    return res.status(500).status({
      success: false,
      message: "user role is not matching",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for admin",
      });
    }
    next();
  } catch (error) {
    return res.status(500).status({
      success: false,
      message: "admin role is not matching",
    });
  }
};
