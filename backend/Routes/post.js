const router = require("express").Router();

const Post = require("../Models/posts");

// CREATE NEW POST
router.post("/", async function (req, res) {
  try {
    const newPost = await new Post({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      category: req.body.category,
      excerpt: req.body.excerpt,
      image: req.body.image,
      authorEmail: req.body.authorEmail
    });

    const post = await newPost.save();
    console.log("Post was Created Successfully!!");
    res.status(200).json(post);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

// GET ALL POST
router.get("/allposts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
  }
});


//GET SPECIFIC POST
router.get("/:id", async (req, res) => {
  try { 
    const post = await Post.findById( req.params.id );  
    console.log("Post Found Successfully!");
    console.log(post)
    res.status(200).json(post);
  } catch (error) {
    console.log(error); 
  }
});

//GET SPECIFIC USER POST
router.get("/:email", async (req, res) => {
  try { 
    const post = await Post.find({}); 
    const userpost = post.filter((p)=>{return p.authorEmail === req.params.email}) 
    console.log("Posts Found Successfully!");
    console.log(userpost)
    res.status(200).json(post);
  } catch (error) {
    console.log(error.message); 
  }
});



//UPDATE POST

router.put("/update", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
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
    console.log("Post Updated Successfully!!");
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
  }
});

//DELETE POST
router.delete('/:id', async (req, res) => {
  try {
     await Post.findByIdAndDelete( req.params.id );
    console.log("Post Deleted Successfully!");
    res.status(200).json("deleted successfully");
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;
