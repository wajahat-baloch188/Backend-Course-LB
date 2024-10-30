const express = require('express');

const router = express.Router();

// Import controllers
const createComment = require('../controllers/commentController.js')
const { createPost, getAllPosts } = require('../controllers/postController.js');
const {likePost, unlikePost} = require('../controllers/likeController.js');


// mapping create
router.post('/comments/create', createComment); 
router.post('/posts/create', createPost);
router.get('/posts/allPosts', getAllPosts);
router.post('/likes/like', likePost);
router.post('/likes/unlike', unlikePost);

// export

module.exports = router;
