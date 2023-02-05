var express = require('express');
var router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Posts, Follows } = require("../models");

let errors = {
  userName: "",
  email: ""
}

//create the createToken function
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "moe's secret", {
    expiresIn: maxAge,
  });
}

/* login. */
router.post('/', async function(req, res, next) {
  const {id ,userName, password } = req.body;
  const user = await User.findOne({where : {userName: userName}});
  if(user) {
    bcrypt.compare(password, user.password, (err, result) => {
      console.log(user)
      if(err) {
        console.error(err);
        
      }else if(result) {
        const token = createToken(user.id);
        const data = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          email: user.email,
          jwt: token
        }
        res.json({status: "ok", data})
      }else{
        console.error(err)
        res.json({error: "incorrect password"});
      }
    });
  }else{
    console.log("error")
    res.json({error: "this email is not registered"});
  }
  
});

// users login get
router.get('/', async function(req, res, next) {
  const {id ,userName, password } = req.body;
  const user = await User.findAll();
  res.json({user});
});

/* User Sign up. */
router.post("/signup", async function (req, res, next){

  const {firstName, lastName ,userName, email, password} = req.body;
  const user = { firstName: firstName, lastName: lastName, userName: userName, email: email, password: password }
  

    bcrypt.hash(user.password, 10, (err, hash) => {
      if(err) {
        console.error("this is err ya homara:",err);
      }else {
         User.create({ firstName: firstName, lastName: lastName, userName: userName, email: email, password: hash }).then(() => {
          res.json({ user: user.id })
          console.log("User created successfully");
        }).catch((error) => {
          if(error.errors[0].message === "userName must be unique"){
            errors.userName = "this userName is already exist";
            
          }else if(error.errors[0].message === "email must be unique"){
            errors.email = "this email is already exist";
            
          }
          
          res.json({errors}  );
        })
      }
    })
  
  
});





module.exports = router;
