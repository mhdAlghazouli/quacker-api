var express = require('express');
var router = express.Router();
var multer = require('multer')
var path = require('path');
const { Posts, User, Likes, Comments } = require("../models");

//upload image controller
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/Images/')
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, '-')}`
    cb(null, fileName)
  }
});

var upload = multer({
  storage: storage,
  limits: { fileSize: '1000000'},
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/
    const mimeType = fileTypes.test(file.mimetype)
    const extname = fileTypes.test(path.extname(file.originalname))

    if(mimeType && extname){
      return cb(null, true)
    }
    cb('Give proper files formate to upload')
  }
})


//posts route post
router.post("/",upload.single('image'), async (req,res,next) => {
  const { textContent, userId} = req.body;
  const { file } = req;
  console.log("file:",file)
  const post = await Posts.create({image:(file && file.path || null) , textContent: textContent, userId: userId });
  res.json(post);
});
//posts route get
router.get("/:id", async (req,res,next) => {
  const { id } = req.params

  const posts = await Posts.findAll({
    where: {
      userId: id
    },

    include:[{
      model: User,
      attributes: ["firstName", "lastName", "userName", "email"]
    },
    {
      model: Likes,
      attributes:["userId","postId"]
    },
    {
      model: Comments,
      attributes: ["id","commentText", "userId", "postId"],
      include: [{
        model: User,
        attributes: ["id","firstName","lastName", "userName"]
      },
      {
        model: Posts,
        attributes: ["id","userId"]
      }
    ]
    }
  ],
    order: [["createdAt", "DESC"]]
  })
  console.log(posts)
  
  res.json(posts)
});

//posts route delete
router.delete("/:id", async (req,res,next) => {
  try {
    const { id } = req.params;
    await Likes.destroy({
        where: {
            postId: id
        }
    });
    await Comments.destroy({
      where: {
        postId: id
      }
    })
    await Posts.destroy({ where: { id } });
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  
});

//posts route edit
router.put("/", async (req,res,next) => {
  const { id, image, textContent, userId } = req.body;
  const updatedPost = await Posts.update({
    textContent: textContent
  },
  {
    where: {
      id: id
    }
  })
  res.json(updatedPost)
})

module.exports = router;