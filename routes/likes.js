var express = require('express');
var router = express.Router();
const { User, Follows, Posts, Likes } = require("../models");

//posts route post
router.post("/", async (req,res,next) => {
  const {userId, postId} = req.body;
  const [like, created] = await Likes.findOrCreate({
    where: {
      userId: userId,
      postId: postId
    },
    include:[{
      model: User,
      attributes: ["firstName", "lastName", "userName", "email"]
    }, {
      model: Posts,
      attributes: ["id","image","textContent","userId"]
      
    }],
    
  })
  if(created){
    res.json({msg: "new like", like: like})
  }else{
  
    res.json({msg: "you liked this post already", like: like})
  }
});

//unLike route
router.delete("/", async (req,res,next) => {
  const {userId, postId} = req.body;
  const unLike = await Likes.destroy({
    where : {
      userId: userId,
      postId: postId
    }
  })
  res.json(unLike)
  
});

module.exports = router;