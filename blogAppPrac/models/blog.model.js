const { default: mongoose } = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // references the User schema
      },
    ],
    unlikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // references the User schema
      },
    ],
    comment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // references the User schema
      },
    ],
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
