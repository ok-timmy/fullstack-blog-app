const BlogPost = require("../Models/BlogPost");

//CREATE NEW POSTS
exports.createPost = async (req, res) => {
  const { title, content, author, category, excerpt, image, authorEmail } =
    req.body;
  try {
    const newBlogPost = await new BlogPost({
      title,
      content,
      author,
      category,
      excerpt,
      image,
      authorEmail,
    });

    if (!title) {
      res.status(403).json({
        statusCode: 403,
        message: "Please Provide a title",
      });
    }
    if (!content) {
      res.status(403).json({
        statusCode: 403,
        message: "A Blog post cannot be empty",
      });
    }
    if (!category) {
      res.status(403).json({
        statusCode: 403,
        message: "Your Blog Post Must have a category",
      });
    }
    if (!excerpt) {
      res.statusCode(403).json({
        statusCode: 403,
        message: "Please Provide an excerpt for your post",
      });
    }

    await newBlogPost.save();
    // console.log("Post was Created Successfully!!");
    res.status(200).json({
      statusCode: 200,
      message: "Post was uploaded successfully",
    });
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

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
};

//UPDATE SPECIFIC POST LIKES

/*
On the FE, when a post is fetched, we loop through the fetched post to see if the logged In user Id exist there,
If it does, we render a filled like icon and otherwise we render a plain like icon
*/
exports.updateSpecificPostLikes = async (req, res) => {
  const {userEmail} = req.body;
  const blogPost = await BlogPost.findById(req.params.id);
  const existingLikesArray = blogPost.likesArray;
  const numberOfLikes = blogPost.numberOfLikes;
  const isExist = existingLikesArray.includes(userEmail);

  console.log(isExist, userEmail, "line 100");
  console.log(existingLikesArray, "line 101");
  console.log(numberOfLikes, "line 102");

  //If User has liked the post before
  if (isExist) {

    try {
      await BlogPost.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            numberOfLikes: numberOfLikes - 1,
          },
          $pull: {
            likesArray: userEmail,
          }
        },
        {
          new: true,
        }
      );
  
      res.status(200).json({
        statusCode: 200,
        data: {
          totalLikes: blogPost.numberOfLikes,
          likesArray: blogPost.likesArray
        },
        message: "User already Liked Post before and this user unliked the post",
      });
    } catch (error) {
      console.log(error);
    }

   
  }

  //If User has not liked the post before
  else {
    try {
      await BlogPost.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            numberOfLikes: numberOfLikes + 1,
          },
          $push: {
            likesArray: userEmail,  
          }
        },
        {
          new: true,
        }
      );
      // console.log("Likes Updated Successfully!!");
      res.status(200).json({
        statusCode: 200,
        data: {
          totalLikes: blogPost.numberOfLikes,
          likesArray: blogPost.likesArray
        },
        message: "Post Likes Updated successfully",
      });
    } catch (error) {
      console.log(error);
    }
  }
};

//COMMENT ON A SPECIFIC POST
exports.commentOnSpecificPost = async (req, res) => {
  const {comment } = req.body;

  try {
    await BlogPost.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          comment: {
            commenter: comment.commenter,
            content: comment.content,
            time: new Date().getTime()
          },  
        }
      },
      {
        new: true,
      }
    );
    console.log("Comment Added Successfully!!");
    res.status(200).json({
      statusCode: 200,
      data: {
       comments: comment.reverse()
      },
      message: "Comment Added Updated successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

//DELETE SPECIFIC POST
exports.deleteSpecificPost = async (req, res) => {
  try {
    await BlogPost.findByIdAndDelete(req.params.id);
    // console.log("Post Deleted Successfully!");
    res.status(200).json({
      statusCode: 200,
      message: "Blog Post has been successfully deleted",
    });
  } catch (error) {
    console.log(error);
  }
};
