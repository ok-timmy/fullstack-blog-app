const router = require("express").Router();

const BlogPost = require("../Models/blogPosts");

// CREATE NEW POST
router.post("/", async function (req, res) {
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
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

// GET ALL POST
router.get("/allposts", async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();
    res.status(200).json(blogPosts);
  } catch (error) {
    console.log(error);
  }
});


//GET SPECIFIC POST
router.get("/:id", async (req, res) => {
  try { 
    const blogPost = await BlogPost.findById( req.params.id );  
    // console.log("Post Found Successfully!");
    // console.log(post)
    res.status(200).json(blogPost);
  } catch (error) {
    console.log(error); 
  }
});


//UPDATE POST

router.put("/update", async (req, res) => {
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
});

// UPDATE POST LIKES
router.patch("/updatelikes/:id", async (req, res) => {
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
});

//DELETE POST
router.delete('/:id', async (req, res) => {
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
})

module.exports = router;
