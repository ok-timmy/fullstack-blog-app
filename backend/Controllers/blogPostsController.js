const BlogPost = require("../Models/BlogPost");
const Comments = require("../Models/Comments");
const User = require("../Models/User");

//GET A USER POSTS
exports.getUserPosts = async (req, res) => {
  const { authorEmail } = req.params;

  try {
    const usersPosts = await BlogPost.find({ authorEmail });

    res.status(200).json(usersPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//CREATE NEW POSTS
exports.createPost = async (req, res) => {
  const { title, content, author, category, excerpt, image, authorEmail } =
    req.body;

  const checkIfTitleExists = await BlogPost.findOne({ title: req.body.title });

  if (checkIfTitleExists) {
    res.status(409).json({
      status: 409,
      message: "Title Already Exists, Please Select a new title",
    });
  } else {
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
      } else if (!content) {
        res.status(403).json({
          statusCode: 403,
          message: "A Blog post cannot be empty",
        });
      } else if (!category) {
        res.status(403).json({
          statusCode: 403,
          message: "Your Blog Post Must have a category",
        });
      } else if (!excerpt) {
        res.statusCode(403).json({
          statusCode: 403,
          message: "Please Provide an excerpt for your post",
        });
      } else {
        await newBlogPost.save();

        res.status(200).json({
          statusCode: 200,
          message: "Post was uploaded successfully",
        });
      }
    } catch (error) {
      res.status(500).send(error);
      console.log(error);
    }
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

    res.status(200).json({ status: 200, data: updatedBlogPost });
  } catch (error) {
    console.log(error);
  }
};

//UPDATE SPECIFIC POST LIKES
exports.updateSpecificPostLikes = async (req, res) => {
  const { userEmail } = req.body;
  const blogPost = await BlogPost.findById(req.params.id);
  const existingLikesArray = blogPost.likesArray;
  const numberOfLikes = blogPost.numberOfLikes;
  const isExist = existingLikesArray.includes(userEmail);

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
          },
        },
        {
          new: true,
        }
      );

      res.status(200).json({
        statusCode: 200,
        data: {
          totalLikes: blogPost.numberOfLikes,
          likesArray: blogPost.likesArray,
        },
        message:
          "User already Liked Post before and this user unliked the post",
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
          },
        },
        {
          new: true,
        }
      );

      res.status(200).json({
        statusCode: 200,
        data: {
          totalLikes: blogPost.numberOfLikes,
          likesArray: blogPost.likesArray,
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
  // const {comment} = req.body;
  const { commenter, content, postId } = req.body;

  const { id } = req.params;

  const newComment = await new Comments({
    postId,
    commenter,
    content,
  });
  var comm = await Comments.create(newComment);
  comm = await comm.populate(
    "commenter",
    "firstName secondName userName image"
  );
  comm = await comm.populate("postId", "title author excerpt");

  comm = await User.populate(comm, {
    path: "blogposts",
    select: "commenter content",
  });

  try {
    res.status(200).json({
      statusCode: 200,
      // data: {
      //  comments: comment.reverse()
      // },
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

    res.status(200).json({
      statusCode: 200,
      message: "Blog Post has been successfully deleted",
    });
  } catch (error) {
    console.log(error);
  }
};
