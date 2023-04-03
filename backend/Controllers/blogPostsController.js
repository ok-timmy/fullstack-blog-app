const BlogPost = require('../Models/BlogPost')

//CREATE NEW POSTS
exports.createPost = async(req, res) => {
    try {
        const newBlogPost = await new BlogPost({
          title: req.body.title,
          content: req.body.content,
          author: req.body.author,
          category: req.body.category,
          excerpt: req.body.excerpt,
          image: req.body.image,
          authorEmail: req.body.authorEmail
        });
    
        const newPost = await newBlogPost.save();
        // console.log("Post was Created Successfully!!");
        res.status(200).json({
          statusCode: 200,
          message: "Post was uploaded successfully"
        });
      } catch (error) {
        res.status(500).send(error);
        console.log(error);
      }
}


//UPDATE SPECIFIC POST
exports.updateSpecificPost = async (req, res) => {
    try {
        const updatedBlogPost = await BlogPost.findByIdAndUpdate(
          { _id: req.body.id },
          {
            $set: {
              content: req.body.content,
              category: req.body.category,
              title: req.body.title,
            },
          },
          {
            new: true,
          }
        );
        // console.log("Post Updated Successfully!!");
        res.status(200).json(updatedBlogPost);
      } catch (error) {
        console.log(error);
      }
}

//UPDATE SPECIFIC POST LIKES
exports.updateSpecificPostLikes = async (req, res) => {
    try {
        const updatedBlogPostLikes = await BlogPost.findByIdAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              likes : req.body.likes
            },
          },
          {
            new: true,
          }
        );
        // console.log("Likes Updated Successfully!!");
        res.status(200).json(updatedBlogPostLikes);
      } catch (error) {
        console.log(error);
      }
}

exports.deleteSpecificPost = async(req, res) => {
    try {
        await BlogPost.findByIdAndDelete( req.params.id );
       // console.log("Post Deleted Successfully!");
       res.status(200).json({
         statusCode: 200,
         message: "Blog Post has been successfully deleted"
       });
     } catch (error) {
       console.log(error);
     }
}