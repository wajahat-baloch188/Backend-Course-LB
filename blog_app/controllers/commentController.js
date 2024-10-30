// Import models
const Post = require("../models/postModel.js");
const Comment = require("../models/commentModel.js");

const createComment = async (req, res) => {
  try {
    // Fetch data from req body
    const { user, post, body } = req.body;

    // Check if required fields are provided
    if (!user || !post || !body) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create a comment object
    const comment = new Comment({ post, user, body });

    // Save the comment to the database
    const savedComment = await comment.save();

    // Find the post by ID and push the comment ID to the comments array
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: savedComment._id } }, // Updated to match Post schema
      { new: true }
    )
      .populate("comments") // Populate comments ki id ki jagah comments ka object le aoo
      .exec();

    res.json({
      post: updatedPost,
    });
  } catch (error) {
    console.error("Error while creating comment:", error);
    res.status(500).json({
      error: error.message || "Error while creating comment",
    });
  }
};

module.exports = createComment;
