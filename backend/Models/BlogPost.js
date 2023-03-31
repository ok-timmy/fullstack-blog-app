const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogPostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
    },
    authorEmail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BlogPost", blogPostSchema);
