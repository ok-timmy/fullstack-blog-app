const router = require("express").Router();
const {
  getAllPosts,
  getSpecificPost,
  getPostsBySearchName
} = require("../Controllers/allPostsController");

// GET ALL POST
router.get("/all", getAllPosts);

//GET SPECIFIC POST
router.get("/specificPost/:id", getSpecificPost);

//GET POSTS WHEN A USER SEARCHES BY NAME 
router.get('/all/search/:name', getPostsBySearchName)

module.exports = router;