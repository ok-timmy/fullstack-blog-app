const mongoose = require("mongoose");
const Comments = require("./Comments");
const { Schema } = mongoose;

const blogPostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
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
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comments",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BlogPost", blogPostSchema);
