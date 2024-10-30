const Todo = require("../models/Todo.models.js");

// Update an existing todo
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params; // Extract id from URL parameters
    const { title, description } = req.body; // Extract title and description from the request body

    // Update the todo with the new data and return the updated document
    const todo = await Todo.findByIdAndUpdate(
      id, // Used to find the document by its unique identifier (_id)
      { title, description, updatedAt: Date.now() }, // The fields to update
      { new: true } // Option to return the updated document
    );

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: todo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: error.message,
    });
  }
};
