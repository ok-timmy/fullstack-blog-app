const router = require("express").Router();
const {
  getAllPosts,
  getSpecificPost,
  getPostsBySearchName,
  // getAllComments,
  getBlogPostComments,
} = require("../Controllers/allPostsController");

// GET ALL POST
router.get("/all", getAllPosts);

//GET SPECIFIC POST
router.get("/specificPost/:title", getSpecificPost);


//FETCH COMMENTS FOR A PARTICULAR BLOGPOST
router.get("/comments/:id", getBlogPostComments)

//GET POSTS WHEN A USER SEARCHES BY NAME
router.get("/all/search/:name", getPostsBySearchName);

//GET ALL POST COMMENTS
// router.get("/specificPostComment/:id", getAllComments);

module.exports = router;
