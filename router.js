const express = require("express");
const router = express.Router();
const InfoRouter = require("./infoSchema");


//create
router.post("/",async(req,res) => {
    var createPost = new InfoRouter({
        Title:req.body.Title,
        Post:req.body.Post,
    });
    await createPost.save();
    res.json(createPost);
})

//Get
router.get("/",async (req,res) => {
    var findPost = await InfoRouter.find();
    res.json(findPost);
})

//Update
router.put("/edit",async(req,res) => {
    var editPost = await InfoRouter.updateOne({_id:req.body._id},{$set:{
        Title:req.body.Title,
        Post:req.body.Post
    }});
    res.json(editPost)
})

//Delete
router.delete("/del/:id",async(req,res) => {
    var delPost = await InfoRouter.findByIdAndRemove(req.params.id).then(e => {
        res.json({message:"Post Deleted"})
    })
})



router.get("/", (req,res) => {
    res.json(" Hello world from router")
})

module.exports = router;