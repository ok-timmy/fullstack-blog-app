const router = require("express").Router();
const {
  createPost,
  updateSpecificPost,
  updateSpecificPostLikes,
  deleteSpecificPost,
  commentOnSpecificPost,
  getUserPosts
} = require("../Controllers/blogPostsController");

//GET A USER POSTS
router.get("/user/:authorEmail", getUserPosts)

// CREATE NEW POST
router.post("/create", createPost);

//UPDATE SPECIFIC POST
router.put("/update/:id", updateSpecificPost);

// UPDATE POST LIKES
router.patch("/updatelikes/:id", updateSpecificPostLikes);

//COMMENT ON A PARTICULAR POST
router.put("/comment/:id", commentOnSpecificPost);

//DELETE POST
router.delete("/deletePost/:id", deleteSpecificPost);

module.exports = router;
