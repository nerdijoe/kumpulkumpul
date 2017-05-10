const User = require('../models/users')
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const methods = {}

methods.signin = function(req, res){
  let user = req.user
  let token = jwt.sign({
    username: req.user.username,
    role: req.user.role}, process.env.SECRET_KEY);
    res.send(token)
}

methods.signup = function(req, res){
  let data = req.body
  data.password = passwordHash.generate(req.body.password)
  User.find({ username : req.body.username})
  .exec((error, records)=>{
    if(error){
      res.json({error})
    } else {
      let source = data
      if(records.length !== 0){
        res.json(records)
      }else{
        User.create(source, function(error, user){
          if(error){
            res.json({error})
          } else {
            res.json(user)
          }
        })
      }
    }
  })

}

module.exports = methods
