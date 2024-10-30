const express = require("express");
const Todo = require("../models/Todo.models.js");
exports.getTodo = async (req, res) => {
  try {
    const todos = await Todo.find({});

    res.status(200).json({
      success: true,
      data: todos,
      message: "todo find successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: "internal server error",
      message: error.message,
    });
  }
};



exports.getTodoById = async (req, res) => {
    try {
      // Get the ID from the request parameters
      let todoId = req.params.id;
  
      // Use the correct Mongoose method to find by ID
      const todo = await Todo.findById({_id:todoId});
  
      if (!todo) {
        return res.status(404).json({
          success: false,
          data: null,
          message: "Todo not found",
        });
      }
  
      // Respond with success
      res.status(200).json({
        success: true,
        data: todo,
        message: "Todo found successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        data: "Internal server error",
        message: error.message,
      });
    }
  };
  