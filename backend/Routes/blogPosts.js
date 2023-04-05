const router = require("express").Router();
const {
  createPost,
  updateSpecificPost,
  updateSpecificPostLikes,
  deleteSpecificPost,
} = require("../Controllers/blogPostsController");

// CREATE NEW POST
router.post("/create", createPost);

//UPDATE SPECIFIC POST
router.put("/update/:id", updateSpecificPost);

// UPDATE POST LIKES
router.patch("/updatelikes/:id", updateSpecificPostLikes);

//DELETE POST
router.delete("/deletePost/:id", deleteSpecificPost);

module.exports = router;
