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
    
    const blogPost = await BlogPost.findOne({title: req.params.title});
    res.status(200).json(blogPost);
  } catch (error) {
    console.log(error);
  }
};

// FETCH COMMENTS ON A SPECIFIC POST
exports.getBlogPostComments = async (req, res) => {
  const { id } = req.params;
  
  try {
    const blogPostComments = await Comments.find({
      postId: id,
    }).populate("commenter", "image firstName secondName userName");
  
    res.status(200).json({
      message: "Fetched blogpost comments",
      data: blogPostComments,
    });
  } catch (error) {
    res.status(500).json({
      message: "An Error occured!",
    });
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
    


    //Send the found and populated array to the frontend
    res.status(200).json(blogPosts);
  } catch (error) {
    console.log(error);
  }
};

// exports.getAllComments = async(req, res) => {
//   const {id} = req.params

//   try {
//     const foundComments = await BlogPost.findById({_id: id}).populate("comments")

//     res.status(200).send(foundComments);
//   } catch (error) {
//     console.log(error)
//   }
// }
