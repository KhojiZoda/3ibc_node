const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const config = require('../../config/secrets');

exports.user_register = function(req, res) {
  var new_user = new User(req.body);

  new_user.save(function(err, user){
    if(err) res.send(err);
    res.json(user);
  })
}

exports.user_login = function(req, res){
  User.findOne({email: req.body.email}, function(err, user){
    if(err) res.send(err);
console.log(user)
    if(user.email === req.body.email && user.password === req.body.password){
      jwt.sign({user}, config.secrets.jwt_key, {expiresIn: '30 days'}, (err, token) => {
        if(err) res.send(err);
        res.json({token});
      })
    }
    else{
      res.sendStatus(400);
    }
  })
}
