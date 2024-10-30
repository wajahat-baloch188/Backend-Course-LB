const express = require('express');
const router = express.Router();

// Import the function directly from the controller file, not the route file itself
const {localFileUpload, imageUpload, videoUpload} = require("../controllers/fileUpload.controller.js")

// Use the imported function in the POST route
router.post('/localFileUpload', localFileUpload);
router.post('/imageUpload', imageUpload);
router.post('/videoUpload', videoUpload);

module.exports = router;
