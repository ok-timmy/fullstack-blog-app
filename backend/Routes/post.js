const router = require('express').Router();

const Post = require('../Models/posts');

router.post("/", async function(req, res) {
    try {
    const newPost = await new Post( {
        title : req.body.title,
        content : req.body.content,
        author : req.body.author,
        category: req.body.category
      } )

      const post = await newPost.save();
      res.status(200).json(post);
      
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
})

router.get("/allposts", async(req, res)=> {
    try {
        const posts = await Post.find();
        res.status(200).json(posts)
    } catch (error) {
        console.log(error)
    }
})

router.get("/:id", async(req, res) => {
    try {
        const post = await Post.findOne({id:req.params.id})
        console.log("Post Found Successfully!")
        res.status(200).json(post)
    } catch (error) {
        console.log(error)
    }
})

router.put("/update", async (req, res) => {
    try {
       const updatedPost = await Post.findOneAndUpdate({title: req.body.title}, {content: req.body.content}, {
           new: true
       })
       console.log("Post Updated Successfully!!")
       res.status(200).json(updatedPost)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;