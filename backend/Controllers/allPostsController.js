const BlogPost = require('../Models/BlogPost')


// GET ALL POSTS
exports.getAllPosts = async(req, res) => {
    try {
        const blogPosts = await BlogPost.find();
        res.status(200).json(blogPosts);
      } catch (error) {
        console.log(error);
      }
}


//GET SPECIFIC POSTS
exports.getSpecificPost = async(req,res) => {
    try { 
        const blogPost = await BlogPost.findById( req.params.id );  
        // console.log("Post Found Successfully!");
        // console.log(post)
        res.status(200).json(blogPost);
      } catch (error) {
        console.log(error); 
      }
}


//GET SPECIFIC POSTS WHEN A USER SEARCHES BY TITLE
exports.getPostsBySearchName = async(req, res) => {}