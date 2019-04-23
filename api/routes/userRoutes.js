module.exports = function(app){
  const user = require('../controllers/userController');

  app.post('/register', user.user_register);
  app.post('/login', user.user_login);
}
