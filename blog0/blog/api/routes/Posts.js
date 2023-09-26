const router = require("express").Router();
const User = require("../models/users");
const Post = require("../models/posts")


router.post("/",async(req,res)=>{
    const newPost = new Post(req.body);
    try {
        const savedPost =await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error);
        
    }
});

router.put("/:id", async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id,{$set: req.body,},{new:true}); 
                res.status(200).json(updatedPost);
            } catch (error) {
                res.status(500).json(error);
            }
        }else{
            res.status(401).json("You can update only your posts")
        }
    } catch (error) {
        res.status(500).json(error);
    }
});



router.delete("/:id", async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json("Post not found");
      }
  
      if (post.username !== req.body.username) {
        return res.status(401).json( "You can only delete your own posts" );
      }
  
      await Post.findByIdAndDelete(postId);
      res.status(200).json( "Post deleted successfully");
    } catch (err) {
      console.error(err);
      res.status(500).json( err);
    }
  });
  
router.get("/:id", async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json( err);
    }
    
})

router.get("/", async (req,res)=>{
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if(username){
            posts = await Post.find({username})
        } else if(catName){
            posts = await Post.find({ categories:{$in :[catName],},});
           

        }else{
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json( err);
    }
    
})
module.exports = router;