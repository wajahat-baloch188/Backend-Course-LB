const express = require('express');
const router = express.Router();

const userCreateController = require("../controllers/userCreate.controller.js");
const blogCreateController = require('../controllers/blogCreate.controller.js');
const likeController = require('../controllers/blogCreate.controller.js');
router.post('/createUser', userCreateController);
router.post('/create-blog', blogCreateController);
router.put('/like-blog/:id', likeController);


module.exports = router;