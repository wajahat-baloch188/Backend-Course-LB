const Post = require("../models/postModel.js");

const createPost = async (req, res) => {
  try {
    const { title, body } = req.body;

    // Ensure we await the creation of the post
    const post = new Post({ title, body });

    const savedPost = await post.save();

    res.status(201).json({ post: savedPost });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    // const posts = await Post.find({});
    const posts = await Post.find()
      .populate("likes")
      .populate("comments")
      .exec();
    res.json({ posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
};
