var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken");
const { User, Follows } = require("../models");

router.post("/", async (req,res,next) => {
  
  const { token } = req.body;
  console.log("this is token", token)
  try {
    const user = jwt.verify(token, "moe's secret");
    const userId = user.id;
    User.findByPk(userId)
    .then(data => {
      console.log("dataaaaaa:", data)
      res.send({ status: "ok", data: data})
    })
    .catch(error => {
      res.send({ status: "error", data: error})
    })
  } catch (error) {
    console.log(error)
  }
});



//get profile
router.get("/:id", async (req,res,next) => {
  const { id } = req.params
  const oneUser = await User.findAll({
    where: {
      id: id
    },
    include: [{
      model: Follows,
      attributes: ["isFollow"]
    }]
  });
  res.json({oneUser, id:id})
})

//user route edit
router.put("/:id", async (req,res,next) => {
  const { id } = req.params;
  const {firstName, lastName, userName, email} = req.body
  const updatedUser = await User.update({
    firstName : firstName,
    lastName: lastName,
    userName: userName,
    email: email
  },
  {
    where: {
      id: id
    }
  })
  res.json(updatedUser)
})

module.exports = router;