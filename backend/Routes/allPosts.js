const router = require("express").Router();
const {
  getAllPosts,
  getSpecificPost,
} = require("../Controllers/allPostsController");

// GET ALL POST
router.get("/", getAllPosts);

//GET SPECIFIC POST
router.get("/specificPost/:id", getSpecificPost);

module.exports = router;