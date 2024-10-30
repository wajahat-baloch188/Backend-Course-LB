const { default: mongoose } = require("mongoose");
const blog = require("../models/blog.model.js"); // Make sure your model is correctly named as 'User'

const blogCreateController = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Check if the username is provided
    if (!title) {
      return res.status(400).json({ message: "title is required" });
    }

    // Create the user and store the result in a variable
    const newBlog = await blog.create({ title, content });

    // Respond with the created user data
    res.status(201).json({
      success: true,
      data: newBlog,
      message: "Blog created successfully",
    });
  } catch (error) {
    console.log("blog creation error", error);

    // Respond with the error message
    res.status(500).json({
      success: false,
      data: "internal server error",
      message: error.message,
    });
  }
};

// like controller
const likeController = async (req, res) => {
    try {
      // Destructure the id directly from req.params
      const { id } = req.params;
  
      // Increment the likes count by 1
      const blog = await blog.findByIdAndUpdate(
        id, 
        { $inc: { likes: 1 } }, 
        { new: true } // Return the updated document
      );
  
      // Check if the blog was found and updated
      if (!blog) {
        return res.status(404).json({
          success: false,
          message: "Blog not found",
        });
      }
  
      // Respond with the updated blog
      res.status(200).json({
        success: true,
        data: blog,
        message: "Blog liked successfully",
      });
    } catch (error) {
      console.log("blog like error", error);
  
      // Respond with the error message
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  };
  
 


module.exports = blogCreateController;
module.exports = likeController;
