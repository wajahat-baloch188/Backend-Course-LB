// Import models
const Post = require("../models/postModel.js");
const Like = require("../models/likeModel.js");

const likePost = async (req, res) => {
  try {
    // Fetch data from req body
    const { user, post } = req.body;

    // Check if required fields are provided
    if (!user || !post) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create a comment object
    const like = new Like({ post, user });

    // Save the comment to the database
    const savedLiked = await like.save();

    // Find the post by ID and push the comment ID to the comments array
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { likes: savedLiked._id } }, // Updated to match Post schema
      { new: true }
    )
      .populate("likes") // Populate likes ki id ki jagah comments ka object le aoo
      .exec();

    res.json({
      post: updatedPost,
    });
  } catch (error) {
    console.error("Error while creating like:", error);
    res.status(500).json({
      error: error.message || "Error while creating comment",
    });
  }
};

// unlike a post
const unlikePost = async (req, res) => {
  try {
    const { post, like } = req.body;

    //find and delete the like collection mein se (like collection mein se delete)
    const unLikedPost = await Like.findOneAndDelete({ post: post, _id: like });

    //update the post collection (post collection mein se delete)
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $pull: { likes: unLikedPost._id } }, // Updated to match Post schema
      { new: true }
    )
      .populate("likes") // Populate likes ki id ki jagah comments ka object le aoo
      .exec();

    res.json({
      post: updatedPost,
    });
  } catch (error) {
    return res.status(400).json({
      error: "Error while unlinking post",
    });
  }
};

module.exports = { likePost, unlikePost };
