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
    numberOfLikes: {
      type: Number,
      default: 0,
    },
    likesArray: {
      type: Array,
      default: [],
    },
    image: {
      type: String,
    },
    authorEmail: {
      type: String,
      required: true,
    },
    comments: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BlogPost", blogPostSchema);
