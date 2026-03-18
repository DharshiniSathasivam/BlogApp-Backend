const express =require('express');
const router= express.Router();
const Post =require('../models/Post')

//get all post

router.get('/',async(req,res)=>{
    try{
        const posts=await Post.find()
        res.json(posts)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

//Get a single Post By ID

router.get('/:id',async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({message:"post not founded"})
        }
        res.json(post)
    }catch(err){
       res.status(500).json({message:err.message})
    }
})

//create a new post

router.post('/',async(req,res)=>{
    console.log("Reacevied Body:",req.body)
    const post=new Post({
        title:req.body.title,
        content:req.body.content,
        category:req.body.category,
        author:req.body.author || 'Anonymous',
        image:req.body.image,
        tags:req.body.tags,
    })
    try{
        const newPost=await post.save()
        res.status(201).json(newPost)
    }catch(err){
        console.log("validation error:",err.message)
        res.status(400).json({message:err.message})
    }
})

//update a post

router.put('/:id',async(req,res)=>{
     try{
        const post =await Post.findById(req.params.id)
        if(!post){
          return res.status(404).json({message:"post not Updated"})
        }
        post.title=req.body.title || post.title;
        post.content=req.body.content || post.content;
        post.category=req.body.category || post.category;
        post.author=req.body.author || post.author;
        post.image=req.body.image || post.image;
        post.tags=req.body.tags || post.tags;
        post.updatedAt=Date.now()

        const updatedPost=await post.save()
        res.json(updatedPost)
     }
     catch(err){
       res.status(400).json({message:"Post Not founded"})
     }
})

//Deleted a POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports=router;

