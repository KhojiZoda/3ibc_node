const jwt = require('jsonwebtoken');
const config = require('../config/secrets')

exports.verify_token = function(req,res,next){
  var authHeader = req.headers['authorization'];

  if(typeof authHeader !== 'undefined'){
    jwt.verify(authHeader, config.secrets.jwt_key, (err, authData) => {
      if(err){
        res.sendStatus(403);
      }
      else{
        next();
      }
    })
  }
  else{
    res.sendStatus(403);
  }
}
