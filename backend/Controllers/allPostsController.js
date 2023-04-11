const BlogPost = require("../Models/BlogPost");
const Comments = require("../Models/Comments");

// GET ALL POSTS
exports.getAllPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();
    res.status(200).json(blogPosts);
  } catch (error) {
    console.log(error);
  }
};

//GET SPECIFIC POSTS
exports.getSpecificPost = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    res.status(200).json(blogPost);
  } catch (error) {
    console.log(error);
  }
};

// Try to test out this endpoint before connecting to frontend

//GET SPECIFIC POSTS WHEN A USER SEARCHES BY TITLE
exports.getPostsBySearchName = async (req, res) => {
  const searchInput = req.params.name;
  try {
    if (searchInput) {
      return;
    }
    const blogPosts = await BlogPost.find({
      title: { $elemMatch: { $eq: searchInput } },
    }).sort({ updatedAt: -1 });
    console.log(blogPosts);

    //Send the found and populated array to the frontend
    res.status(200).json(blogPosts);
  } catch (error) {
    console.log(error);
  }
};

exports.getAllComments = async(req, res) => {
  const {id} = req.params
  console.log(id);
  try {
    const foundComments = await BlogPost.findById({_id: id}).populate("comments")
    console.log(foundComments);
    res.status(200).send(foundComments);
  } catch (error) {
    console.log(error)
  }
}
