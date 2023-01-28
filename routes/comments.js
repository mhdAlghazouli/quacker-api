var express = require('express');
var router = express.Router();
const { Posts, User, Likes, Comments } = require("../models");

//post comment route
router.post("/", async (req, res, next) => {
  const {commentText, userId, postId} = req.body;
  const comment = await Comments.create({commentText: commentText, userId: userId, postId: postId})
  res.json(comment)
});

//delete comment route
router.delete("/:id", async (req,res,next) => {
  const {id} = req.params;
  const deleteComment = await Comments.destroy({
    where : {
      id : id
    }
  })
  res.json(deleteComment)
  
});

//comments route edit
router.put("/", async (req,res,next) => {
  const { id,commentText, userId, postId } = req.body;
  const updatedComment = await Comments.update({
    commentText: commentText
  },{
    where: {
      id: id,
      userId: userId,
      postId: postId
    }
  })
  res.json(updatedComment)
})

module.exports = router;