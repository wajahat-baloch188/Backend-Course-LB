const Todo = require("../models/Todo.models.js");

// Update an existing todo
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params; // Extract id from URL parameters
    // Update the todo with the new data and return the updated document
    const todo = await Todo.findByIdAndDelete(id);


    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
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
