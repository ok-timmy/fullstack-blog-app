const router = require("express").Router();
const { createPost, getAllPosts, getSpecificPost, updateSpecificPost, updateSpecificPostLikes, deleteSpecificPost } = require("../Controllers/blogPostsController");
const BlogPost = require("../Models/BlogPost");

// CREATE NEW POST
router.post("/", createPost);

// GET ALL POST
router.get("/allposts", getAllPosts);


//GET SPECIFIC POST
router.get("/:id", getSpecificPost);


//UPDATE SPECIFIC POST 
router.put("/update", updateSpecificPost);

// UPDATE POST LIKES
router.patch("/updatelikes/:id", updateSpecificPostLikes);

//DELETE POST
router.delete('/:id', deleteSpecificPost)

module.exports = router;
