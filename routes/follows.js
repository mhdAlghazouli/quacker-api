var express = require('express');
var router = express.Router();
const { User, Follows, Posts, Likes, Comments } = require("../models");

//follows post route
router.post("/", async (req, res, next) => {
  const {followerId, followedId, isFollow} = req.body;
  const [follow, created] = await Follows.findOrCreate({where: {
    followerId: followerId,
    followedId: followedId,

  },
    include: [{
      model: User,
      as: "followed",
      attributes: ["firstName", "lastName", "userName", "email"],
    }],
  
});
if(created){
  res.json({msg: "new connection", follow: follow})
}else{

  res.json({msg: "this connection is already there", follow: follow})
}
});

//follows get route
router.get("/:id", async (req,res, next) => {
  const { id } = req.params;
 
   let follows = await Follows.findAll({
     where: {
       followerId: id
     },
      
        include:[
          {
            model:User,
            as: "follower",
            attributes: ["firstName", "lastName", "userName", "email"],
            include:[{
              model: Posts,
              
            }],
          },
          {
            model: User,
            as: "followed",
            attributes: ["firstName", "lastName", "userName", "email"],
            include:[{
              model: Posts,
              attributes: ["id","image","textContent","userId","createdAt","updatedAt"],
              include:[{
                model: Likes,
                attributes: ["userId","postId"]
              },
              {
                model: Comments,
                attributes: ["id", "commentText", "userId", "postId"],
                include: [{
                  model: User,
                  attributes: ["id", "firstName", "lastName", "userName"]
                },
                {
                  model: Posts,
                  attributes: ["id"],
                  include: [{
                    model: User,
                    attributes: ["id","userName"]
                  }]
                }],
                
              
              },

              {
                model: User,
              }
            ]
            }],
          }],
          
      })
     
       res.json(follows)
    });
  

//unFollow route
router.delete("/", async (req,res,next) => {
  const {followerId, followedId} = req.body;
  const unFollow = await Follows.destroy({
    where : {
      followerId: followerId,
      followedId: followedId
    }
  })
  console.log(unFollow)
  res.json(unFollow)
  
});


module.exports = router;