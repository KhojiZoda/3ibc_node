const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const config = require('../../config/secrets');
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: 'localhost',
  port: 1025,
  ignoreTLS: true,
  // other settings...
});
var mailOptions = {
  from: '"Kojak" <kojak@esgi.com>', // sender address
  subject: "Login", // Subject line
  text: "You have logged in", // plain text body
  html: "<b>Welcome, You have logged in</b>" // html body
}


exports.user_register = function(req, res){
  var new_user = new User(req.body);
  if (new_user.password != req.body.password_confirmation) {
    res.json("Password Confirmation does not match the password");
  }else {
    var user_exists = User.findOne({email: req.body.email}, function(err, user){
      if(err) res.send(err);
      if (user === null) {
        bcrypt.hash(new_user.password, 10, function(err, hash){
          new_user.password = hash;
          new_user.save(function(err, user){
            if(err) res.send(err);
            res.json(user);
          });
        });
      }else {
        res.json("User with given email already exists");
      }
    });
  }
}

exports.user_login = function(req, res){
  User.findOne({email: req.body.email}, function(err, user){
    if(err) res.send(err);
    if(user.email === req.body.email){
      bcrypt.compare(req.body.password, user.password, function(err, response) {
        if(response) {
          jwt.sign({user}, config.secrets.jwt_key, {expiresIn: '30 days'}, (err, token) => {
            if(err){
                return res.json({
                  success: false,
                  message: 'Something went wrong'
                });
            }else {
              mailOptions.to = user.email
              transport.sendMail(mailOptions, (err, details) => {
                if(err){
                  console.log(err);
                }else {
                  res.setHeader('auth_token', token);
                  res.status(200)
                  return res.json({
                    success: true,
                    message: user
                  });
                }
              });
            }
          })
        } else {
          console.log(res);
          return res.json({
            success: false,
            message: 'Invalid password'
          });
        }
      });

    }
    else{
      res.sendStatus(400);
    }
  })
}


exports.user_index = function(req, res){
  User.find({}, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user;
    });

    res.json(userMap);
  });
}

exports.user_show = function(req, res){
  User.findOne({email: req.params.email}, function(err, user){
    if(err) res.send(err);
    res.json(user);
  });
}

exports.user_update = function(req, res){
  User.findOneAndUpdate({email: req.params.email}, req.body, {new: true}, (err,done)=>{
    if(err) return res.status(500).send(err);
    return res.send(done);
  })
}

exports.user_destroy = function(req, res){
  User.findOne({email: req.params.email}).deleteOne(function(err, respose){
    if(err) res.send(err);
    res.json(reponse);
  })
}
