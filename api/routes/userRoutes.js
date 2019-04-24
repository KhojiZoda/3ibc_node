module.exports = function(app){
  const user = require('../controllers/userController');

  app.post('/register', user.user_register);
  app.post('/login', user.user_login);

  app.get('/user', user.user_index);
  app.get('/user/:email', user.user_show)
  app.patch('/user/:email', user.user_update);
  app.delete('/user/:email', user.user_destroy);
}
