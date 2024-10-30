const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: "string",
    required: true,
    maxLength: 50,
  },
  description: {
    type: "string",
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const todo = mongoose.model("Todo", todoSchema);

module.exports = todo;
