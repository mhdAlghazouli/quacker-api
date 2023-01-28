var express = require('express');
var router = express.Router();
var multer = require('multer')
var path = require('path');
const { User, Products } = require("../models");

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

//post product route
router.post("/",upload.single('image'), async (req, res, next) => {
  const {title, description, price, contact, userId} = req.body;
  const { file } = req;
  const product = await Products.create({title: title, image: (file && file.path || null), description: description, price: price,contact:contact, userId:userId})
  res.json(product)
});

//products route get
router.get("/", async (req,res,next) => {
  
  const products = await Products.findAll({
    include: [{
      model: User,
      attributes: ["id","firstName", "lastName", "userName", "email"]
    }]
  });
  res.json(products)

});

//products route get my product only
router.get("/:id", async (req,res,next) => {
  const {id} = req.params;
  const products = await Products.findAll({
    where: {
      userId: id
    },
    include: [{
      model: User,
      attributes: ["id", "firstName", "lastName", "userName", "email"]
    }]
  });
  res.json(products)

});

//delete product route
router.delete("/:id", async (req,res,next) => {
  const {id} = req.params;
  const deleteProduct = await Products.destroy({
    where : {
      id : id
    }
  })
  res.json(deleteProduct)
  
});

module.exports = router;